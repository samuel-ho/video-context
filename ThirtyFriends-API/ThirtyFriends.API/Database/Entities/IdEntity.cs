using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ThirtyFriends.API.Database.Entities
{
    public class IdEntity
    {
        [BsonId] 
        public ObjectId Id { get; set; }
    }
}
