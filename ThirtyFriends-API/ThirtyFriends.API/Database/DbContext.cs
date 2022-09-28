using System;
using MongoDB.Driver;
using ThirtyFriends.API.Configurations;
using ThirtyFriends.API.Database.Entities;

namespace ThirtyFriends.API.Database
{
    public interface IDbContext
    {
        IMongoCollection<User> Users { get; }
        IMongoCollection<Lounge> Lounges { get; } 
        IMongoCollection<Introduction> Introductions { get; }
    }
    public class DbContext : IDbContext
    {
        private readonly IMongoDatabase _mongoDatabase; 
        public DbContext(IDatabaseConfiguration databaseConfiguration)
        { 
            var mongoClient = new MongoClient(databaseConfiguration.ConnectionString);
            _mongoDatabase = mongoClient.GetDatabase(databaseConfiguration.DatabaseName);
        }
        public IMongoCollection<User> Users => _mongoDatabase.GetCollection<User>("users");
        public IMongoCollection<Lounge> Lounges => _mongoDatabase.GetCollection<Lounge>("lounges"); 
        public IMongoCollection<Introduction> Introductions => _mongoDatabase.GetCollection<Introduction>("introductions");
    }
}
