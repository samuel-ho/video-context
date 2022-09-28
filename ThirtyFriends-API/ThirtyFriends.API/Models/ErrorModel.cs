using Newtonsoft.Json;

namespace ThirtyFriends.API.Models
{
    public class ErrorModel
    {
        public ErrorModel(int status, string message){
            Status = status;
            Message = message;
        }
        
        public int Status { get; internal set; }
        public string Message { get; internal set; }
        public string ToJson(){
            return JsonConvert.SerializeObject(this);
        }
    }
}