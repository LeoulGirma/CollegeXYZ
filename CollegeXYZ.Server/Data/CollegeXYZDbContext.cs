using CollegeXYZ.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace CollegeXYZ.Server.Data
{
    public class CollegeXYZDbContext : DbContext
    {
        public DbSet<Course> Courses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Grade> Grades { get; set; }

        public CollegeXYZDbContext(DbContextOptions<CollegeXYZDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}