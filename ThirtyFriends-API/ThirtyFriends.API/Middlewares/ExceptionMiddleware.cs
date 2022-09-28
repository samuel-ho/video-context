using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using ThirtyFriends.API.Models;

namespace ThirtyFriends.API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            { 
                await _next(httpContext);
            }
            catch (Exception exception)
            {
                if (httpContext.Response.HasStarted)
                {
                    _logger.LogError("The response has already started, the http status code middleware will not be executed.");
                    throw;
                }
                exception.Data.Add("statusCode", httpContext.Response.StatusCode);

                _logger.LogError($"Something went wrong: {exception}");
                await HandleExceptionAsync(httpContext, StatusCodes.Status500InternalServerError, exception);
            }
        }

        private Task HandleExceptionAsync(HttpContext httpContext, int statusCode, Exception exception)
        {
            httpContext.Response.Clear();
            httpContext.Response.ContentType = "application/json";
            httpContext.Response.StatusCode = statusCode;
            return httpContext.Response.WriteAsync(new ErrorModel(httpContext.Response.StatusCode, exception.Message).ToJson());
        }
    }
}
