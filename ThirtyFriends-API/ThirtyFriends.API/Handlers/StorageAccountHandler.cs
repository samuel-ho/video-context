using System;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace ThirtyFriends.API.Handlers
{

    public interface IStorageAccountHandler
    {
        /// <summary>
        /// Create a blob into the  storage account. 
        /// </summary>
        /// <param name="containerName">The name of the blob container.</param>
        /// <param name="blobName">The name of the blob.</param>
        /// <param name="data">A data that needs to blob.</param>
        /// <param name="contentType">The content type of the blob.</param>
        /// <returns></returns>
        Task CreateBlobAsync(string containerName, string blobName, string data, string contentType);
    }
    public class StorageAccountHandler : IStorageAccountHandler
    {
        private readonly CloudBlobClient _cloudBlobClient; 
        public StorageAccountHandler(string connectionString)
        { 
            var storageAccount = CloudStorageAccount.Parse(connectionString);
            _cloudBlobClient = storageAccount.CreateCloudBlobClient(); 
        }
        
        public async Task CreateBlobAsync(string containerName, string blobName, string data, string contentType)
        {
            var container = _cloudBlobClient.GetContainerReference(containerName);

            await container.CreateIfNotExistsAsync();
            var blob = container.GetBlockBlobReference(blobName);
            blob.Properties.ContentType = contentType;
            var bytes = Convert.FromBase64String(data);
            await blob.UploadFromByteArrayAsync(bytes, 0, bytes.Length); 
        } 
    }
}