using CollegeXYZ.Server.Data;
using CollegeXYZ.Server.DTO;
using FluentValidation;

namespace CollegeXYZ.Server.Validators
{
    public class CourseValidator : AbstractValidator<CourseDTO>
    {
        private readonly CollegeXYZDbContext _context;

        public CourseValidator(CollegeXYZDbContext context)
        {
            _context = context;

            RuleFor(c => c.Title).NotEmpty().WithMessage("Title is required");
            RuleFor(c => c.CourseCode).NotEmpty()
                .WithMessage("Course code is required");
            RuleFor(c => c.Description).NotEmpty();
            RuleFor(c => c.CreditHours).InclusiveBetween(1, 6)
                .WithMessage("Credit hours must be between 1 and 6");


            RuleFor(c => c.CourseCode)
                .NotEmpty()
                .Must(BeUniqueCourseCode).WithMessage("Course code must be unique");
        }

        private bool BeUniqueCourseCode(CourseDTO model, string courseCode)
        {
            var existingCourse = _context.Courses.FirstOrDefault(c => c.CourseCode == courseCode);
            if (existingCourse == null) return true;

            return model.CourseId.HasValue && existingCourse.Id == model.CourseId.Value;
        }
    }
}
