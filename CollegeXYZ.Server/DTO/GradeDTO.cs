namespace CollegeXYZ.Server.DTO
{
    public class GradeDTO
    {
        public int? GradeId { get; set; }
        public char LetterGrade { get; set; }

        public int CourseId { get; set; }

        public int StudentId { get; set; }
        public string AcademicPeriod { get; set; }
    }
}
