namespace CollegeXYZ.Server.Entities
{
    public class Grade
    {
        public int Id { get; set; }
        public char LetterGrade { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }

        public int StudentId { get; set; }
        public Student Student { get; set; }
        public string AcademicPeriod { get; set; }
    }
}
