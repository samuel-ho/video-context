using System;

namespace ThirtyFriends.API.Models
{
    public class LoungeModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Alt { get; set; }
        public string Description { get; set; } 
        public string Banner { get; set; } 
        public long GuestCount { get; set; }
    }
    public class LoungeTimeModel: LoungeModel
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; } 
    }
}
