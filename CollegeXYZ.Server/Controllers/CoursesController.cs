using CollegeXYZ.Server.Data;
using CollegeXYZ.Server.DTO;
using CollegeXYZ.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CollegeXYZ.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly CollegeXYZDbContext _context;

        public CoursesController(CollegeXYZDbContext context)
        {
            _context = context;
        }
        // GET: api/<CoursesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> Get()
        {
            return await _context.Courses.ToListAsync();
        }

        // GET api/<CoursesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> Get(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }

        // POST api/<CoursesController>
        [HttpPost]
        public async Task<IActionResult> Post(CourseDTO model)
        {
            var course = new Course
            {
                Title = model.Title,
                CourseCode = model.CourseCode,
                Description = model.Description,
                CreditHours = model.CreditHours
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = course.Id }, course);
        }

        // PUT api/<CoursesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, CourseDTO model)
        {
            if (id != model.CourseId)
            {
                return BadRequest();
            }
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            
            course.Title = model.Title;
            course.CourseCode = model.CourseCode;
            course.Description = model.Description;
            course.CreditHours = model.CreditHours;

            _context.Entry(course).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/<CoursesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
