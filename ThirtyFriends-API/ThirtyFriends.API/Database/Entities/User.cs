using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace ThirtyFriends.API.Database.Entities
{
    public class User: IdEntity
    {
        public User(){
            Following = new List<Detail>();
            Followers = new List<Detail>();
        }
        [BsonElement("email")]
        public string Email { get; set; }
        [BsonElement("picture")]
        public string Picture{get;set;}
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("major")]
        public string Major { get; set; }
        [BsonElement("town")]
        public string Town { get; set; }
        [BsonElement("otherContact")]
        public string OtherContact { get; set; }
        [BsonElement("currentLoungeId")]
        public string CurrentLoungeId { get; set; }
        [BsonElement("isReady")]
        public bool IsReady { get; set; } 
        [BsonElement("followers")]
        public List<Detail> Followers { get; set; } 
        [BsonElement("following")]
        public List<Detail> Following { get; set; } 
    }
    public class Detail
    {
        [BsonElement("id")]
        public string Id { get; set; }
        [BsonElement("dateAdded")]
        public DateTime? DateAdded { get; set; }
        [BsonElement("picture")]
        public string Picture { get; set; }
        [BsonElement("name")]
        public string Name { get; set; } 
    }
}
