using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using ThirtyFriends.API.Configurations;
using ThirtyFriends.API.Database;
using ThirtyFriends.API.Handlers;
using ThirtyFriends.API.Middlewares;
using ThirtyFriends.API.Utilities;

namespace ThirtyFriends.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMvcCore()
            .ConfigureApiBehaviorOptions(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });
            RegisterServices(services);
            var apiVersion = AddApiVersioning(services);
            AddSwaggerDocumentation(services, $"V{apiVersion.Item1}.{apiVersion.Item2}");
            services.AddHealthChecks(); 
            services.AddApplicationInsightsTelemetry();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseHttpsRedirection();
            app.UseOpenApi();
            app.UseSwaggerUi3();
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health");
            });
        }
        private void RegisterServices(IServiceCollection services)
        {
            services.Configure<ChatConfiguration>(Configuration.GetSection(nameof(ChatConfiguration)));
            services.AddSingleton<IChatConfiguration>(sp => sp.GetRequiredService<IOptions<ChatConfiguration>>().Value);
            services.Configure<DatabaseConfiguration>(Configuration.GetSection(nameof(DatabaseConfiguration)));
            services.AddSingleton<IDatabaseConfiguration>(sp => sp.GetRequiredService<IOptions<DatabaseConfiguration>>().Value);
            services.Configure<StorageAccountConfig>(Configuration.GetSection(nameof(StorageAccountConfig)));
            services.AddSingleton<IStorageAccountConfig>(sp => sp.GetRequiredService<IOptions<StorageAccountConfig>>().Value);
            services.Configure<RedisCacheConfiguration>(Configuration.GetSection(nameof(RedisCacheConfiguration)));
            services.AddSingleton<IRedisCacheConfiguration>(sp => sp.GetRequiredService<IOptions<RedisCacheConfiguration>>().Value);
            services.Configure<IntroConfiguration>(Configuration.GetSection(nameof(IntroConfiguration)));
            services.AddSingleton<IIntroConfiguration>(sp => sp.GetRequiredService<IOptions<IntroConfiguration>>().Value);

            //Add dependencies here
            services.AddTransient<IDbContext, DbContext>();
            services.AddSingleton<IChatRandomiser, ChatRandomiser>();
            services.AddSingleton<ICacheConnection, CacheConnection>();
            services.AddTransient<IStorageAccountHandler>(x => new StorageAccountHandler(Configuration["StorageAccountConfig:ConnectionString"]));
        }
        private void AddSwaggerDocumentation(IServiceCollection services, string apiVersion)
        {
            services.AddSwaggerDocument(config =>
            {
                config.PostProcess = document =>
                {
                    document.Info.Version = apiVersion;
                    document.Info.Title = "Thirty Friends Backend API";
                    document.Info.Description = "The thirty friend backend API that provides lobbies and users information";
                    document.Info.TermsOfService = "https://thirtyfriends.com";
                };
            });
        }
        private (int, int) AddApiVersioning(IServiceCollection services)
        {
            var majorApiVersion = 1;
            var minorApiVersion = 0;
            services.AddApiVersioning(config =>
            {
                config.DefaultApiVersion = new ApiVersion(majorApiVersion, minorApiVersion);
                config.AssumeDefaultVersionWhenUnspecified = true;
            });
            return (majorApiVersion, minorApiVersion);
        }
    }
}
