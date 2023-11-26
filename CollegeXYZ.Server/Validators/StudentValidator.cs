using CollegeXYZ.Server.Data;
using CollegeXYZ.Server.DTO;
using FluentValidation;

namespace CollegeXYZ.Server.Validators
{
    public class StudentValidator : AbstractValidator<StudentDTO>
    {
        private readonly CollegeXYZDbContext _context;

        public StudentValidator(CollegeXYZDbContext context)
        {
            _context = context;

            RuleFor(c => c.Name).NotEmpty().WithMessage("Name is required");

        }
    }
}
