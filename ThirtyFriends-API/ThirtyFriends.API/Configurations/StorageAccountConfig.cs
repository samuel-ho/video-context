namespace ThirtyFriends.API.Configurations
{
     public interface IStorageAccountConfig
    {
        string ContainerName { get; set; }
        string BlobContentType { get; set; }
        string ThumbnailImageBaseUrl { get; set; }
        string ImageExtension { get; set; }
    }
    public class StorageAccountConfig : IStorageAccountConfig
    {
        public string ContainerName { get; set; }
        public string BlobContentType { get; set; }
        public string ThumbnailImageBaseUrl {get; set; }
        public string ImageExtension { get; set; }

    }
}