using CollegeXYZ.Server.Data;
using CollegeXYZ.Server.DTO;
using CollegeXYZ.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CollegeXYZ.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly CollegeXYZDbContext _context;

        public StudentsController(CollegeXYZDbContext context)
        {
            _context = context;
        }
        // GET: api/<StudentsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> Get()
        {
            return await _context.Students.ToListAsync();
        }

        // GET api/<StudentsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> Get(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // POST api/<StudentsController>
        [HttpPost]
        public async Task<IActionResult> Post(StudentDTO model)
        {
            var student = new Student
            {
                Name = model.Name,
                ContactDetails = model.ContactDetails
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = student.Id }, student);
        }

        // PUT api/<StudentsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, StudentDTO model)
        {
            if (id != model.StudentId)
            {
                return BadRequest();
            }
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }


            student.Name = model.Name;
            student.ContactDetails = model.ContactDetails;

            _context.Entry(student).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/<StudentsController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
