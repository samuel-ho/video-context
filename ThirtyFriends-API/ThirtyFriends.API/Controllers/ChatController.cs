using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThirtyFriends.API.Database;
using ThirtyFriends.API.Models;
using MongoDB.Driver;
using NSwag.Annotations;
using System.Linq;
using System.Collections.Generic;
using ThirtyFriends.API.Utilities;
using ThirtyFriends.API.Configurations;
using MongoDB.Driver.Linq; 

namespace ThirtyFriends.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ChatController : Controller
    {
        private IDbContext _databaseContext;
        private IChatRandomiser _chatRandomiser;
        private IRedisCacheConfiguration _redisCacheConfiguration;
        private ICacheConnection _cacheConnection;
        private IChatConfiguration _chatConfiguration;
        private readonly Random _random;

        public ChatController(IDbContext databaseContext, IChatRandomiser chatRandomiser, IRedisCacheConfiguration redisCacheConfiguration, ICacheConnection cacheConnection, IChatConfiguration chatConfiguration)
        {
            _databaseContext = databaseContext ?? throw new ArgumentNullException(nameof(databaseContext)); 
            _chatRandomiser = chatRandomiser ?? throw new ArgumentNullException(nameof(chatRandomiser));
            _redisCacheConfiguration = redisCacheConfiguration ??
                                            throw new ArgumentNullException(nameof(redisCacheConfiguration));
            _cacheConnection = cacheConnection ??
                                           throw new ArgumentNullException(nameof(cacheConnection));
            _chatConfiguration = chatConfiguration ??
                               throw new ArgumentNullException(nameof(chatConfiguration));
            _random = new Random();
        }

        [HttpGet]
        [OpenApiOperation("GetRandomGroupByUserId", "Get the group which the user is in, by their ID.")]
        [ProducesResponseType(typeof(GroupChatModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetRandomGroupByUserId(string loungeId, string userId)
        { 
            var randomisedGroups = await _cacheConnection.GetDataAsync<List<GroupChatModel>>(loungeId);
            if (randomisedGroups == null)
            {
                var usersInLounge = await GetReadyUsersInLoungeAsync(loungeId);  
                if (!usersInLounge.Any() || usersInLounge.Count < _chatConfiguration.MinimumGroupSize)
                {
                    return NotFound(new EmptyModel("Not enough people in lounge who are ready"));
                }
                var introList = await GetIntroStatements();
                randomisedGroups = _chatRandomiser.GetRandomGroups(usersInLounge, introList, _redisCacheConfiguration.MaxInGroup);
                await _cacheConnection.SaveDataWithGenericExpiryAsync(loungeId, randomisedGroups);
            }
            var group = randomisedGroups.FirstOrDefault(randomisedGroup => randomisedGroup.Participants.Any(x => x.Id == userId));
            return Ok(group);
        }
        private async Task<List<DetailModel>> GetReadyUsersInLoungeAsync(string id)
        {
            var usersList = new List<DetailModel>();
            var users =
                (await _databaseContext.Users.FindAsync(x => x.CurrentLoungeId.ToLower() == id.ToLower() && x.IsReady == true)).ToList();
            if (users.Any())
            {
                usersList = users.Select(x => new DetailModel
                {
                    Id = x.Id.ToString(),
                    Name = x.Name,
                    Picture = x.Picture,
                }).ToList();
            }
            return usersList;
        }
        private async Task<List<string>> GetIntroStatements()
        {
           var count = await _databaseContext.Introductions.CountDocumentsAsync(x=> true); 
            var randomSkip = (new Random()).Next(0,(int)count - 1);

            var dbIntros =  await _databaseContext.Introductions.AsQueryable().Skip(randomSkip).FirstOrDefaultAsync();
            return dbIntros.Intro; 
        }
    }
}