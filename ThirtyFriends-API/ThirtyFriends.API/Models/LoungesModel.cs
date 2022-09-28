using System.Collections.Generic;

namespace ThirtyFriends.API.Models
{
    public class LoungesModel
    {
        public List<LoungeModel> OpenLounges { get; set; }
        public List<LoungeTimeModel> TimeLounges { get; set; }

    }
}
