using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ThirtyFriends.API.Database.Entities
{
    public class Introduction : IdEntity
    {
        [BsonElement("intro")]
        public List<string> Intro;
    }
}
