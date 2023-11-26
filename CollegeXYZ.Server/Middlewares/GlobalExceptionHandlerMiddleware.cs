using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CollegeXYZ.Server.Middlewares
{
    public class GlobalExceptionHandlerMiddleware : IMiddleware
    {
        private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

        public GlobalExceptionHandlerMiddleware(ILogger<GlobalExceptionHandlerMiddleware> logger)
        {
            _logger = logger;
        }


        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, exception.Message);
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                ProblemDetails problemDetails = new()
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Type = "Server Error",
                    Title = "Server eroor",
                    Detail = "An Internal server error has occured"
                };

                string json = JsonSerializer.Serialize(problemDetails);

                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(json);

            }
        }
    }

}
