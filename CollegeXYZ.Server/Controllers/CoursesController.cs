using CollegeXYZ.Server.Data;
using CollegeXYZ.Server.DTO;
using CollegeXYZ.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CollegeXYZ.Server.Controllers
{
    /// <summary>
    /// Controller for managing courses.
    /// </summary>

    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly CollegeXYZDbContext _context;
        /// <summary>
        /// Initializes a new instance of the <see cref="CoursesController"/> class.
        /// </summary>
        /// <param name="context">Database context used for course operations.</param>
        public CoursesController(CollegeXYZDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Retrieves all courses.
        /// </summary>
        /// <returns>A list of courses.</returns>
        // GET: api/<CoursesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> Get()
        {
            return await _context.Courses.ToListAsync();
        }
        /// <summary>
        /// Retrieves a specific course by its identifier.
        /// </summary>
        /// <param name="id">The ID of the course to retrieve.</param>
        /// <returns>The requested course if found; otherwise, NotFound.</returns>

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
        /// <summary>
        /// Creates a new course.
        /// </summary>
        /// <param name="model">The course data transfer object (DTO).</param>
        /// <returns>The created course with status code 201 (Created).</returns>

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
        /// <summary>
        /// Updates an existing course.
        /// </summary>
        /// <param name="id">The ID of the course to update.</param>
        /// <param name="model">The updated course data.</param>
        /// <returns>NoContent if update is successful; otherwise, BadRequest or NotFound.</returns>

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
        ///<summary>
        /// Deletes a specific course.
        /// </summary>
        /// <param name="id">The ID of the course to delete.</param>
        /// <returns>NoContent if deletion is successful; otherwise, NotFound.</returns>
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
