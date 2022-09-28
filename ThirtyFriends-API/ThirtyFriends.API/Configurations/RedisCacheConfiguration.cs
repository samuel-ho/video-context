namespace ThirtyFriends.API.Configurations
{
    public interface IRedisCacheConfiguration
        {
            string ConnectionString { get; set; }
            int MaxInGroup { get; set; }
            int CacheExpiryInMinutes { get; set; }
        }
        public class RedisCacheConfiguration : IRedisCacheConfiguration
        {
            public string ConnectionString { get; set; }
            public int MaxInGroup { get; set; }
            public int CacheExpiryInMinutes { get; set; }
        }
}