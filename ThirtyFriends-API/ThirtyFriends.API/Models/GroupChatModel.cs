using System.Collections.Generic;

namespace ThirtyFriends.API.Models
{
    public class GroupChatModel
    {
        public string GroupName { get; set; }
        public List<string> Intros { get; set; }
        public List<DetailModel> Participants { get; set; }
    }
}
