using System;
using System.ComponentModel.DataAnnotations;

namespace ThirtyFriends.API.Models
{
    public class CreateLoungeModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public bool IsEvent { get; set; }
        [Required]
        public string Alt { get; set; }
        [Required]
        public string Banner { get; set; }
        [Required]
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
