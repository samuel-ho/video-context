# Thirty Friends Backend
This is Thirty friends backend api that provides lobbies and user information. 

# Database Configuration
To connect to the database, the API requires to add following configuration under 'appsettings.development.json that is under appsettings.json.
`
  "DatabaseConfiguration": {
    "ConnectionString": "[database connection string]",
    "DatabaseName": "[database name]"
  }` 

# Storage Account Configuration
To connect to the Azure storage account, the API requires to add following configuration under 'appsettings.development.json that is under appsettings.json.
  `"StorageAccountConfig": { 
      "ContainerName": "images",
      "BlobContentType": "image/png",
      "ImageExtension": "png",
      "ThumbnailImageBaseUrl": "[Thumbnail image base url]",
      "ConnectionString": "[storage account connection string]"
    }`

# Redis Cache Configuration
To connect to the Redis cache, the API requires to add following configuration under 'appsettings.development.json that is under appsettings.json.
`"RedisCacheConfiguration": {
    "ConnectionString": "[Redis cache connection string]",
    "MaxInGroup": 6,
    "CacheExpiryInMinutes": 1
  }`

# Chat Configuration
The Randomiser group should have minimum x people to create an chat group and following configuration should be under 'appsettings.development.json that is under appsettings.json.
`"ChatConfiguration": {
      "MinimumGroupSize": 3
    }`

# Introduction Configuration
The new introduction document must have three introduction statement and following configuration should be under 'appsettings.development.json that is under appsettings.json.
`"IntroConfiguration": {
      "MaxGroupIntroStatements":  3
    }`
# Application Insight Configuration
To send logs to the Azure Application Insight, the application must have following configuration and it should be under 'appsettings.development.json that is under appsettings.json.
`"ApplicationInsights": {
        "InstrumentationKey": "[InstrumentationKey]"
      }`
      
  # Start up Project
  Open the `ThirtyFriends-API` folder in visual studio code.

  # .NetCore SDK Version
  The API is configured with .netCore 3.1 SDK version

  # Swagger Document Link
  The swagger document link can be found by following below-mention link. The `BaseURL` is the server link where API is host.
  https://[BaseURL]/swagger/index.html

  # Untrack appsetting.development.json file
  git rm --cached ThirtyFriends.API/appsettings.Development.json

  # Build the code
  `dotnet build`

  # Run the code
  `dotnet run`

