using CollegeXYZ.Server.Entities;
using Microsoft.EntityFrameworkCore;
namespace CollegeXYZ.Server.Data.SeedDatabaseService
{

    public interface ISeedDataBase
    {
        Task Seed();
    }

    public class SeedDataBase : ISeedDataBase
    {
        public SeedDataBase(CollegeXYZDbContext context)
        {
            Context = context;
        }

        public CollegeXYZDbContext Context { get; }

        public async Task Seed()
        {
            if (!Context.Courses.AsNoTracking().Any(c => c.Title.Equals("DefaultCourse")))
            {
                var defaultCourse = new Course
                {
                    Title = "DefaultCourse",
                    CourseCode = "000000",
                    CreditHours = 1,
                    Description = "This is a demo course",

                };
                await Context.AddAsync(defaultCourse);
                await Context.SaveChangesAsync();
            }
            if (!Context.Students.AsNoTracking().Any(s => s.Name.Equals("DefaultStudent")))
            {
                var defaultStudent = new Student
                {
                    Name = "DefaultStudent",
                    ContactDetails = "0900320032"
                };
                await Context.AddAsync(defaultStudent);
                await Context.SaveChangesAsync();
            }

            if (!Context.Grades.AsNoTracking().Any(g => g.AcademicPeriod.Equals("DemoGrade")))
            {
                var defaultGrade = new Grade
                {
                    CourseId = 1,
                    LetterGrade = 'A',
                    StudentId = 2,
                    AcademicPeriod = "DemoGrade",

                };
                await Context.AddAsync(defaultGrade);
                await Context.SaveChangesAsync();
            }

        }
    }
}

