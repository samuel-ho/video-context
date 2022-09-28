using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThirtyFriends.API.Database;
using ThirtyFriends.API.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using NSwag.Annotations;
using System;
using ThirtyFriends.API.Attributes;
using ThirtyFriends.API.Database.Entities;
using ThirtyFriends.API.Configurations;
using ThirtyFriends.API.Handlers;
using System.Collections.Generic;
using System.Linq;
using ThirtyFriends.API.Utilities;


namespace ThirtyFriends.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public class UserController : ControllerBase
    {  
        private IDbContext _databaseContext;
        private readonly IStorageAccountConfig _storageAccountConfig;
        public readonly IStorageAccountHandler _storageAccountHandler; 
        
        public UserController(IDbContext databaseContext, IStorageAccountConfig storageAccountConfig, IStorageAccountHandler storageAccountHandler)
        {
            _databaseContext = databaseContext ?? throw new ArgumentNullException(nameof(databaseContext));
            _storageAccountConfig = storageAccountConfig ?? throw new ArgumentNullException(nameof(storageAccountConfig));
            _storageAccountHandler = storageAccountHandler ?? throw new ArgumentNullException(nameof(storageAccountHandler));
        }

        [HttpGet]
        [OpenApiOperation("ValidateUser", "Validate the user")]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ValidateUserAsync(string email)
        { 
            var user = await (await _databaseContext.Users.FindAsync(x => x.Email.ToLower() == email.ToLower()))?.FirstOrDefaultAsync();
            if (user == null) 
                return NotFound(new EmptyModel($"User {email} not found")); 

            return Ok(new EmptyModel(user.Id.ToString()));
        }
        [HttpGet]
        [OpenApiOperation("GetUser", "Get an user.")]
        [ProducesResponseType(typeof(UserModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUser(string email)
        { 
            var user = await (await _databaseContext.Users.FindAsync(x => x.Email.ToLower() == email.ToLower()))?.FirstOrDefaultAsync();

            if (user == null) 
                return NotFound(new EmptyModel($"User {email} not found")); 

            return Ok(new UserModel
            {
                Id = user.Id.ToString(),
                Email = user.Email, 
                Name = user.Name,
                Picture = user.Picture,
                Major = user.Major,
                Town = user.Town,
                OtherContact= user.OtherContact
            });
        }

        [HttpGet]
        [OpenApiOperation("GetUserFollowings", "Get a user's followers and following users.")]
        [ProducesResponseType(typeof(UserFollowingModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserFollowings(string id)
        {
            var user = await (await _databaseContext.Users.FindAsync(x => x.Id == ObjectId.Parse(id)))?.FirstOrDefaultAsync();


            if (user == null)
                return NotFound(new EmptyModel($"User {id} not found"));

            return Ok(new UserFollowingModel
            {
                Followers = user.Followers,
                Following = user.Following
            });
        }

        [HttpGet]
        [OpenApiOperation("GetProfile", "Gets the user profile")]
        [ProducesResponseType(typeof(UserDetailModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProfileAsync(string id, string userId)
        {
            var user = await (await _databaseContext.Users.FindAsync(x => x.Id == ObjectId.Parse(id)))?.FirstOrDefaultAsync();
            if (user == null)
                return NotFound(new EmptyModel($"User {id} not found"));
            var shareDetailUser = new UserDetailModel(user.Name, user.Picture, user.Major, user.Town);

            var isFollowing = user.Following.Any(x => x.Id == userId);
            if (isFollowing)
            {
                shareDetailUser.Email = user.Email;
                shareDetailUser.OtherContact = user.OtherContact;
            }
            shareDetailUser.IsFollowing = isFollowing;
            return Ok(shareDetailUser);
        }

        [HttpGet]
        [OpenApiOperation("GetUsersConnections", "Return list of users and their total connection count.")]
        [ProducesResponseType(typeof(UserConnections), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUsersConnectionsAsync()
        {
            List<UserConnections> connections = new List<UserConnections>();
            var totalCount = 0; 
            using (IAsyncCursor<User> cursor = await _databaseContext.Users.FindAsync(x=> true))
            {
                while (await cursor.MoveNextAsync())
                {
                    IEnumerable<User> users = cursor.Current;
                    foreach (User user in users)
                    {
                        totalCount = CheckUserFollowers(user);
                        connections.Add(new UserConnections
                        {
                            Name = user.Name,
                            Connections = totalCount
                        });
                    }
                }
            }
            return Ok(connections);
        }

        [HttpPost]
        [OpenApiOperation("CreateUser", "Creates an user.")]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status409Conflict)]
        [ValidateModel]
        public async Task<IActionResult> CreateUser(UserModel userModel)
        { 
            var user = await (await _databaseContext.Users.FindAsync(x => x.Email.ToLower() == userModel.Email.ToLower()))?.FirstOrDefaultAsync();

            if (user != null) 
                return Conflict(new EmptyModel($"User {userModel.Email} already exists.")); 
            
            var imageName = $"{Guid.NewGuid().ToString()}.{_storageAccountConfig.ImageExtension}";
            await UploadImageAsync(imageName, userModel.Picture);
            user = new User
            {
                Email = userModel.Email, 
                Name = userModel.Name,
                Picture = $"{_storageAccountConfig.ThumbnailImageBaseUrl}/{imageName}",
                Major = userModel.Major,
                Town = userModel.Town,
                OtherContact = userModel.OtherContact
            };
            await _databaseContext.Users.InsertOneAsync(user);
            return Created(nameof(user.Id), new EmptyModel(user.Id.ToString()));
        }
        
        [HttpPost] 
        [OpenApiOperation("SetUserChatReadyness", "Change user chat readyness status")]
        [ProducesResponseType(typeof(UserReadyModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> SetUserChatReadynessAsync(string id, bool isReady)
        {
            var user = await (await _databaseContext.Users.FindAsync(x => x.Id == ObjectId.Parse(id)))?.FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound(new EmptyModel($"User {id} not found"));
            }
            user.IsReady = isReady;
            await _databaseContext.Users.ReplaceOneAsync(x => x.Id == ObjectId.Parse(id), user);

            return Ok(new UserReadyModel
            {
                IsReady = isReady  
            });
        }

        [HttpPost]
        [OpenApiOperation("LeaveLounge", "Clear user readiness and lounge status")]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> LeaveLoungeAsync(string id)
        {
            var user = await (await _databaseContext.Users.FindAsync(x => x.Id == ObjectId.Parse(id)))?.FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound(new EmptyModel($"User {id} not found"));
            } 
            user.IsReady = false;
            user.CurrentLoungeId = "";

            await _databaseContext.Users.ReplaceOneAsync(x => x.Id == ObjectId.Parse(id), user); 
            
            return Ok(new EmptyModel($"User {id} has left the lounge"));
        }
        [HttpPost]
        [OpenApiOperation("LeaveLoungeByEmail", "Clear user readiness and lounge status")]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> LeaveLoungeByEmailAsync(string email)
        {
            var user = await (await _databaseContext.Users.FindAsync(x => x.Email.ToLower() == email.ToLower()))?.FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound(new EmptyModel($"User {email} not found"));
            }

            user.IsReady = false;
            user.CurrentLoungeId = "";

            await _databaseContext.Users.ReplaceOneAsync(x => x.Email.ToLower() == email.ToLower(), user); 

            return Ok(new EmptyModel($"User {email} has left the lounge"));
        }


        [HttpPost]
        [OpenApiOperation("ShareUserDetails", "Share user details with another user")]
        [ProducesResponseType(typeof(DetailModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(EmptyModel), StatusCodes.Status409Conflict)]
        public async Task<IActionResult> ShareUserDetailsAsync(string id, DetailModel sharingUser)
        {
            var userReceiving = await (await _databaseContext.Users.FindAsync(x => x.Id == ObjectId.Parse(id)))?.FirstOrDefaultAsync();
            var userSharing = await (await _databaseContext.Users.FindAsync(x => x.Id == ObjectId.Parse(sharingUser.Id)))?.FirstOrDefaultAsync();


            if (userReceiving == null)
            {
                return NotFound(new EmptyModel($"User {id} not found"));
            }


            if (CheckIfAlreadyFollowing(userReceiving.Followers, sharingUser.Id) != null || CheckIfAlreadyFollowing(userSharing.Following, userReceiving.Id.ToString()) != null)
            {
                return Conflict(new EmptyModel($"User {sharingUser.Id} has already shared details with user {id} in the past"));
            }


            userReceiving.Followers.Add(new Detail
            {
                Id = sharingUser.Id,
                DateAdded = sharingUser.DateAdded,
                Name = sharingUser.Name,
                Picture = sharingUser.Picture
            });


            await _databaseContext.Users.ReplaceOneAsync(x => x.Id == ObjectId.Parse(id), userReceiving);

            userSharing.Following.Add(new Detail
            {
                Id = userReceiving.Id.ToString(),
                DateAdded = sharingUser.DateAdded,
                Name = userReceiving.Name,
                Picture = userReceiving.Picture
            });

            await _databaseContext.Users.ReplaceOneAsync(x => x.Id == ObjectId.Parse(sharingUser.Id), userSharing);

            return Ok(new EmptyModel($"Sharing details updated for users {userReceiving.Id} and {sharingUser.Id}"));
        }

        #region Private Methods
        private Detail CheckIfAlreadyFollowing(List<Detail> user1, string user2Id){
            return user1.Find(x => x.Id == user2Id);
        }


        private async Task UploadImageAsync(string imageName, string image){
            await _storageAccountHandler.CreateBlobAsync(_storageAccountConfig.ContainerName, imageName, image, _storageAccountConfig.BlobContentType);
        }
        #endregion

        private int CheckUserFollowers(User user)
        {
            var count = 0;

            if (user.Following.Any())
            {
                foreach (var followedUser in user.Following)
                {
                    var found = CheckIfAlreadyFollowing(user.Followers, followedUser.Id);
                    if (found != null)
                    {
                        count += 1;
                    }
                }
            }
            return count;
        } 
    }

}
