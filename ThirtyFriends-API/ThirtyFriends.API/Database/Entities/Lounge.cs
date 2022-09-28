using System;
using MongoDB.Bson.Serialization.Attributes;

namespace ThirtyFriends.API.Database.Entities
{
    public class Lounge : IdEntity
    {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("isEvent")]
        public bool IsEvent { get; set; }
        [BsonElement("alt")]
        public string Alt { get; set; }

        [BsonElement("banner")]
        public string Banner { get; set; }

        [BsonElement("startDate")]
        public DateTime? StartDate { get; set; }

        [BsonElement("endDate")]
        public DateTime? EndDate { get; set; }
    }
}
