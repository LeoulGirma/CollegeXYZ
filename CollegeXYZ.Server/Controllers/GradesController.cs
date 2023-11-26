using CollegeXYZ.Server.Data;
using CollegeXYZ.Server.DTO;
using CollegeXYZ.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CollegeXYZ.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradesController : ControllerBase
    {
        private readonly CollegeXYZDbContext _context;

        public GradesController(CollegeXYZDbContext context)
        {
            _context = context;
        }
        // GET: api/<GradesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grade>>> Get()
        {
            return await _context.Grades.ToListAsync();
        }

        // GET api/<GradesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Grade>> Get(int id)
        {
            var grade = await _context.Grades.FindAsync(id);

            if (grade == null)
            {
                return NotFound();
            }

            return grade;
        }

        // POST api/<GradesController>
        [HttpPost]
        public async Task<IActionResult> Post(GradeDTO model)
        {
            var grade = new Grade
            {
                CourseId = model.CourseId,
                StudentId = model.StudentId,
                AcademicPeriod = model.AcademicPeriod,
                LetterGrade = model.LetterGrade,
            };

            _context.Grades.Add(grade);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = grade.Id }, grade);
        }

        // PUT api/<GradesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, GradeDTO model)
        {
            if (id != model.GradeId)
            {
                return BadRequest();
            }
            var grade = await _context.Grades.FindAsync(id);
            if (grade == null)
            {
                return NotFound();
            }


            grade.CourseId = model.CourseId;
            grade.StudentId = model.StudentId;
            grade.LetterGrade = model.LetterGrade;
            grade.AcademicPeriod = model.AcademicPeriod;

            _context.Entry(grade).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/<GradesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var grade = await _context.Grades.FindAsync(id);
            if (grade == null)
            {
                return NotFound();
            }

            _context.Grades.Remove(grade);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
