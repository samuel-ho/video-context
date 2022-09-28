namespace ThirtyFriends.API.Models
{
    public class UserDetailModel
    { 
        public UserDetailModel(string name, string picture, string major, string town) {
            Name = name;
            Picture = picture;
            Major = major;
            Town = town;
        }
        public string Picture { get; set; } 
        public string Name { get; set; }
        public string Major { get; set; } 
        public string Town { get; set; } 
        public string Email { get; set; }
        public bool IsFollowing { get; set; } 
        public string OtherContact { get; set; }
    }
}