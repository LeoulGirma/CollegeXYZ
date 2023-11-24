namespace CollegeXYZ.Server.Entities
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ContactDetails { get; set; }

        public ICollection<Course> Courses { get; set; }

        public ICollection<Grade> Grades { get; set; }

        
    }
}
