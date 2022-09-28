using System;
namespace ThirtyFriends.API.Configurations
{
    public interface IDatabaseConfiguration
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
    public class DatabaseConfiguration : IDatabaseConfiguration
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
    
}
