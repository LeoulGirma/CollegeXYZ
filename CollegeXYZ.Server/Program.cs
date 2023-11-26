using CollegeXYZ.Server.Data;
using CollegeXYZ.Server.Data.SeedDatabaseService;
using CollegeXYZ.Server.Middlewares;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<ISeedDataBase, SeedDataBase>();
builder.Services.AddTransient<GlobalExceptionHandlerMiddleware>();
builder.Services.AddControllers();
builder.Services.AddDbContext<CollegeXYZDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Program>());
//builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
var app = builder.Build();
await using (var scope = app.Services.CreateAsyncScope())
{
    var context = scope.ServiceProvider.GetService<CollegeXYZDbContext>();

    if (context is null)
        throw new Exception("Database Context Not Found");

    await context.Database.MigrateAsync();


    var seedService = scope.ServiceProvider.GetRequiredService<ISeedDataBase>();
    await seedService.Seed();
}



app.UseCors("CorsPolicy");
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
//app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
