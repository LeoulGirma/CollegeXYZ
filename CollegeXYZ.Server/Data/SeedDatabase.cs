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
                Context.Add(defaultCourse);
                Context.SaveChanges();
            }
            if (!Context.Students.AsNoTracking().Any(s => s.Name.Equals("DefaultStudent")))
            {
                var defaultStudent = new Student
                {
                    Name = "DefaultStudent",
                    ContactDetails = "0900320032"
                };
                Context.Add(defaultStudent);
                Context.SaveChanges();
            }

            if (!Context.Grades.AsNoTracking().Any(g => g.AcademicPeriod.Equals("DemoGrade")))
            {
                var defaultGrade = new Grade
                {
                    CourseId = 1,
                    LetterGrade = 'A',
                    StudentId = 1,
                    AcademicPeriod = "DemoGrade",

                };
                Context.Add(defaultGrade);
                Context.SaveChanges();
            }

        }
    }
}

