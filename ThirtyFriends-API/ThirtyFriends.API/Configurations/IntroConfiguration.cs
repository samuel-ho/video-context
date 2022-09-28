namespace ThirtyFriends.API.Configurations
{
    public interface IIntroConfiguration
    {
        int MaxGroupIntroStatements { get; set; }
    }
    public class IntroConfiguration : IIntroConfiguration
    {
        public int MaxGroupIntroStatements { get; set; }
    }
}