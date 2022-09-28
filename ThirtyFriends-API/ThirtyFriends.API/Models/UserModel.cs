using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ThirtyFriends.API.Database.Entities;

namespace ThirtyFriends.API.Models
{
    public class UserModel
    { 
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Picture { get; set; }
        [Required]
        public string Major { get; set; }
        [Required]
        public string Town { get; set; } 
        public string OtherContact { get; set; }
    }
    public class UserReadyModel
    {
        public bool IsReady { get; set; }
    }

    public class UserConnections
    {
        public string Name { get; set; }
        public int Connections { get; set; }
    }
    public class UserFollowingModel
    {
        public List<Detail> Followers { get; set; }
        public List<Detail> Following { get; set; }
    }
}

