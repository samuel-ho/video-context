using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ThirtyFriends.API.Models
{
    public class IntroModel
    {
        [Required]
        public List<string> Intro { get; set; }
 
    }
}
