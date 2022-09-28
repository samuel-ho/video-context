using System.Collections.Generic; 

namespace ThirtyFriends.API.Models
{
    public class IntroListModel
    { 
        public IntroListModel(){
            Intros = new List<string>();
        }

        public string Id {get;set;}
        public List<string> Intros { get; set; }

    }
}
