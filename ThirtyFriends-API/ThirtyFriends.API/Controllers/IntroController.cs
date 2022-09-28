using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThirtyFriends.API.Database;
using ThirtyFriends.API.Models;
using MongoDB.Driver;
using NSwag.Annotations;
using ThirtyFriends.API.Attributes;
using ThirtyFriends.API.Configurations;
using ThirtyFriends.API.Utilities;
using MongoDB.Bson;
using System.Linq;
using ThirtyFriends.API.Database.Entities;
using System.Collections.Generic;
namespace ThirtyFriends.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public class IntroController : Controller
    {
        private readonly IDbContext _databaseContext;
        private IIntroConfiguration _introConfiguration;
        private ICacheConnection _cacheConnection;
        public IntroController(IDbContext databaseContext, IIntroConfiguration introConfiguration, ICacheConnection cacheConnection)
        {
            _databaseContext = databaseContext ?? throw new ArgumentNullException(nameof(databaseContext));
            _introConfiguration = introConfiguration ?? throw new ArgumentNullException(nameof(introConfiguration));
            _cacheConnection = cacheConnection ??
                               throw new ArgumentNullException(nameof(cacheConnection));
        }
        [HttpPost]
        [OpenApiOperation("CreateIntro", "Create a set of introduction statements")]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status400BadRequest)]
        [ValidateModel]
        public async Task<IActionResult> CreateIntroAsync(IntroModel model)
        {  
            if (model.Intro.Count != _introConfiguration.MaxGroupIntroStatements)
            {
                return BadRequest(new EmptyModel($"Please make sure you input exactly {_introConfiguration.MaxGroupIntroStatements} introduction statements in full."));
            }
            await _databaseContext.Introductions.InsertOneAsync(new Introduction { Intro = model.Intro });
            return Ok(new EmptyModel("true"));
        }
        [HttpDelete]
        [OpenApiOperation("DeleteIntro", "Delete the introduction statement.")]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status400BadRequest)]
        [ValidateModel]
        public async Task<IActionResult> DeleteIntroAsync(string id)
        {  
            await _databaseContext.Introductions.DeleteOneAsync(x => x.Id == ObjectId.Parse(id));
            return Ok(new EmptyModel("true"));
        }
        [HttpGet]
        [OpenApiOperation("GetIntroductions", "Get all introduction groups.")]
        [ProducesResponseType(typeof(List<IntroListModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetIntroductionsAsync()
        {  
            var introductions = (await _databaseContext.Introductions.FindAsync(x => true)).ToList(); 
            if (introductions == null)
            {
                return NotFound(new EmptyModel("Could not find any intro statements"));
            }
            var introductionModelList = new List<IntroListModel>();
            introductions.ForEach(x => {
                introductionModelList.Add(new IntroListModel{
                    Id = x.Id.ToString(),
                    Intros = x.Intro
                });
            });
            return Ok(introductionModelList);
        }
    }
}