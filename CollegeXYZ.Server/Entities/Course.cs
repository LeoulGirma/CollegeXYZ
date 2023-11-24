namespace CollegeXYZ.Server.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CourseCode { get; set; }
        public string Description { get; set; }
        public int CreditHours { get; set; }

        public ICollection<Student> Students { get; set; }

        public ICollection<Grade> Grades { get; set; }

    }
}
