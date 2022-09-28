using System;
using System.Collections.Generic;

namespace ThirtyFriends.API.Models
{
    public class LoungeDetailModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsEvent { get; set; }
        public string Banner { get; set; }
        public string Alt { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; } 
    }
}
