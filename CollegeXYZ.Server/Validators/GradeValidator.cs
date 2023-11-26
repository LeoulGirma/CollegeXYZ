using CollegeXYZ.Server.Data;
using CollegeXYZ.Server.DTO;
using FluentValidation;

namespace CollegeXYZ.Server.Validators
{
    public class GradeValidator : AbstractValidator<GradeDTO>
    {
        private readonly CollegeXYZDbContext _context;

        public GradeValidator(CollegeXYZDbContext context)
        {
            _context = context;

            RuleFor(c => c.LetterGrade).NotEmpty().WithMessage("Letter Grade is required");

            RuleFor(c => c.CourseId).NotEmpty()
                .WithMessage("Course is required")
                .Must(ExistInCourses)
                .WithMessage("Course ID does not exist");

            RuleFor(c => c.StudentId).NotEmpty()
                .WithMessage("Student is required")
                .Must(ExistInStudents)
                .WithMessage("Student ID does not exist");

            RuleFor(c => c.AcademicPeriod).NotEmpty()
                                          .WithMessage("Academic Period is required");

        }
        private bool ExistInStudents(int studentId)
        {
            return _context.Students.Any(s => s.Id == studentId);
        }

        private bool ExistInCourses(int courseId)
        {
            return _context.Courses.Any(c => c.Id == courseId);
        }
    }
}
