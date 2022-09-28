using System;
using StackExchange.Redis;
using ThirtyFriends.API.Configurations;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace ThirtyFriends.API.Utilities
{
    public interface ICacheConnection
    { 
        Task<T> GetDataAsync<T>(string key);
        Task<bool> SaveDataWithGenericExpiryAsync<T>(string key, T data);
        Task<bool> SaveDataWithExpiryAsync<T>(string key, T data, TimeSpan expiryTimeSpan);
        Task<bool> SaveDataAsync<T>(string key, T data);
        Task<bool> DeleteKeyAsync(string key);
    }
    public class CacheConnection : ICacheConnection
    {
        private static Lazy <ConnectionMultiplexer> _redisConnection;
        private IRedisCacheConfiguration _redisCacheConfiguration;  
        public CacheConnection(IRedisCacheConfiguration redisCacheConfiguration)
        {
            _redisCacheConfiguration = redisCacheConfiguration ??
                                throw new ArgumentNullException(nameof(redisCacheConfiguration));

            _redisConnection = new Lazy<ConnectionMultiplexer>(() =>
            {
                return ConnectionMultiplexer.Connect(_redisCacheConfiguration.ConnectionString);
            }); 

        } 
        private static ConnectionMultiplexer RedisConnection
        {
            get
            {
                return _redisConnection.Value;
            }
        }
        public async Task<T> GetDataAsync<T>(string key)
        {
            var data = await RedisConnection.GetDatabase().StringGetAsync(key); 
            return data.HasValue ? JsonConvert.DeserializeObject<T>(data): default;
        }
        public async Task<bool> SaveDataWithGenericExpiryAsync<T>(string key, T data)
        { 
            var expiryTimeSpan = DateTime.UtcNow.AddMinutes(_redisCacheConfiguration.CacheExpiryInMinutes).Subtract(DateTime.UtcNow);
            return await RedisConnection.GetDatabase().StringSetAsync(key, JsonConvert.SerializeObject(data), expiryTimeSpan);
        }
        public async Task<bool> SaveDataWithExpiryAsync<T>(string key, T data, TimeSpan expiryTimeSpan)
        { 
            return await RedisConnection.GetDatabase().StringSetAsync(key, JsonConvert.SerializeObject(data), expiryTimeSpan);
        }
        public async Task<bool> SaveDataAsync<T>(string key, T data)
        {
            return await RedisConnection.GetDatabase().StringSetAsync(key, JsonConvert.SerializeObject(data));
        }
        public async Task<bool> DeleteKeyAsync(string key)
        {
            return await RedisConnection.GetDatabase().KeyDeleteAsync(key);
        }
    } 
}
