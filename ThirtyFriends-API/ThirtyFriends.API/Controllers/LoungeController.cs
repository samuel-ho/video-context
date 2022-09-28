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
using ThirtyFriends.API.Database.Entities;
using MongoDB.Bson;
using ThirtyFriends.API.Attributes;
using ThirtyFriends.API.Utilities;

namespace ThirtyFriends.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public class LoungeController : Controller
    { 
        private IDbContext _databaseContext; 
        private ICacheConnection _cacheConnection;
        public LoungeController(IDbContext databaseContext, ICacheConnection cacheConnection)
        {
            _databaseContext = databaseContext ?? throw new ArgumentNullException(nameof(databaseContext));
            _cacheConnection = cacheConnection ?? throw new ArgumentNullException(nameof(cacheConnection));
        }
        [HttpPost]
        [OpenApiOperation("CreateLounge", "Create a lounge information")]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status400BadRequest)]
        [ValidateModel]
        public async Task<IActionResult> CreateLoungeAsync(CreateLoungeModel model)
        {
            var lounge = await (await _databaseContext.Lounges.FindAsync(x => x.Name == model.Name))?.FirstOrDefaultAsync();

            if (lounge != null)
            {
                return Ok(new EmptyModel("false"));
            }
            await _databaseContext.Lounges.InsertOneAsync(new Lounge
            {
                Name = model.Name,
                Description = model.Description,
                IsEvent = model.IsEvent,
                StartDate = model.StartDate,
                Banner = model.Banner,
                Alt = model.Alt,
                EndDate = model.IsEvent ? model.EndDate : null
            });
            return Ok(new EmptyModel("true"));
        }
        [HttpGet]
        [OpenApiOperation("GetLounge", "Get a lounge information.")]
        [ProducesResponseType(typeof(LoungeDetailModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetLoungeAsync(string id, string email)
        {
            await SetCurrentLoungeForUserAsync(email, id);
            var loungeModel = await _cacheConnection.GetDataAsync<LoungeDetailModel>($"lounge_{id}");
            if (loungeModel == null)
            {
                var lounge = await (await _databaseContext.Lounges.FindAsync(x => x.Id == ObjectId.Parse(id)))?.FirstOrDefaultAsync();
                loungeModel = new LoungeDetailModel
                {
                    Name = lounge.Name,
                    Description = lounge.Description,
                    StartDate = lounge.StartDate,
                    Alt = lounge.Alt,
                    EndDate = lounge.EndDate,
                    IsEvent = lounge.IsEvent,
                    Banner = lounge.Banner
                };
                await _cacheConnection.SaveDataWithGenericExpiryAsync($"lounge_{id}", loungeModel);
            }
           
            if(loungeModel == null) {
                return NotFound(new EmptyModel("The lounge doesn't exist"));
            }
            return Ok(loungeModel);
        } 

        [HttpGet]
        [OpenApiOperation("GetGuestsByLoungeId", "Gets the list of guests within the lounge.")]
        [ProducesResponseType(typeof(GuestsModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetGuestsByLoungeIdAsync(string id)
        {
            var guests = await GetUsersInLoungeAsync(id);
            return Ok(new GuestsModel
            {
                Guests = guests
            });
        }


        [HttpGet]
        [OpenApiOperation("GetLounges", "Get all lounges information.")]
        [ProducesResponseType(typeof(LoungesModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetLoungesAsync()
        {
            var lounges = (await _databaseContext.Lounges.FindAsync(x => true)).ToList();
            if (!lounges.Any())
            {
                return NotFound(new EmptyModel("Could not found lounges"));
            }
            var openLounges = Task.Run(() => lounges.Where(x => x.IsEvent == false).OrderBy(x => x.Name).Select(x => new LoungeModel
            {
                Name = x.Name,
                Description = x.Description,
                Banner = x.Banner,
                Alt = x.Alt,
                Id = x.Id.ToString(),
                GuestCount = GetGuestCount(x.Id.ToString()).GetAwaiter().GetResult()
            }).ToList());

            var timeLounges = Task.Run(() => lounges.Where(x => x.IsEvent == true).OrderBy(x => x.StartDate).Select(x => new LoungeTimeModel
            {
                Name = x.Name, 
                Description = x.Description,
                Banner = x.Banner,
                Alt = x.Alt,
                Id = x.Id.ToString(),
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                GuestCount = GetGuestCount(x.Id.ToString()).GetAwaiter().GetResult()
            }).ToList());

            return Ok(new LoungesModel
            {
                OpenLounges = await openLounges,
                TimeLounges = await timeLounges

            });
        }
  
        [HttpDelete]
        [OpenApiOperation("Delete lounge", "Remove lounge from database and clear states of users currently inside")]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteLoungeAsync(string loungeId)
        {
            var lounge = await (await _databaseContext.Lounges.FindAsync(x => x.Id == ObjectId.Parse(loungeId)))?.FirstOrDefaultAsync();

            if (lounge == null)
            {
                return NotFound(new EmptyModel("The lounge doesn't exist"));
            }

            var builder = Builders<User>.Update;
            var update = builder.
                Set(u => u.CurrentLoungeId, "").
                Set(u => u.IsReady, false);

            await _databaseContext.Users.UpdateManyAsync(x => x.CurrentLoungeId == loungeId, update);

            await _databaseContext.Lounges.DeleteOneAsync(x => x.Id == ObjectId.Parse(loungeId));
            await _cacheConnection.DeleteKeyAsync($"lounge_{loungeId}");
            return Ok(new EmptyModel($"Lounge `{lounge.Name}` removed successfully! "));
        }


        #region Private Methods
        private async Task<long> GetGuestCount(string id) => await _databaseContext.Users.CountDocumentsAsync(x => x.CurrentLoungeId == id);

        private async Task SetCurrentLoungeForUserAsync(string email, string currentLoungeId)
        {
            var user = await (await _databaseContext.Users.FindAsync(x => x.Email == email))?.FirstOrDefaultAsync();
            if (user != null)
            {
                user.CurrentLoungeId = currentLoungeId;
                user.IsReady = false;
                await _databaseContext.Users.ReplaceOneAsync(x => x.Email == email, user);
            } 
        }

        private async Task<List<DetailModel>> GetUsersInLoungeAsync(string id)
        {
            var usersList = new List<DetailModel>();
            var users = (await _databaseContext.Users.FindAsync(x => x.CurrentLoungeId.ToLower() == id.ToLower())).ToList();
            if (users.Any())
            {
                usersList.AddRange(users.Select(x => new DetailModel
                {
                    Id = x.Id.ToString(),
                    Picture = x.Picture,
                    Name = x.Name
                }));
            }
            return usersList;
        } 
        #endregion
    }
}
