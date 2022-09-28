namespace ThirtyFriends.API.Configurations
{
    public interface IChatConfiguration
    {
        int MinimumGroupSize { get; set; }
    }
    public class ChatConfiguration: IChatConfiguration
    {
        public int MinimumGroupSize { get; set; }
    }
}