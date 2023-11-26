import React, { useState, useEffect,useRef } from "react";
import { Typography, Button, Box, Grid, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CourseList from "./components/courseList";
import Header from "./../../components/Header";
import CourseForm from "./components/courseForm";
import courseService from "../../services/courseService";

function CourseView() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const formikRef = useRef(); 

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
      setSnackbar({ open: true, message: "Failed to fetch courses" });
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setIsModalOpen(false);
    setSelectedCourse(null); 
  };

  const handleOpenModalForEdit = async (courseId) => {
    try {
      const response = await courseService.getCourseById(courseId);
      setSelectedCourse(response.data);
      // console.log(response.data);

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching course details", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch course details",
        severity: "error",
      });
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleFormSubmit = async (courseData) => {
    try {
      if (selectedCourse) {
        const updatedCourseData = { ...courseData, courseId: selectedCourse.id };
        await courseService.updateCourse(selectedCourse.id, updatedCourseData);
      } else {
        await courseService.createCourse(courseData);
      }
      setIsModalOpen(false);
      fetchCourses(); 

    } catch (error) {
      const errorData = error.response?.data;
      let errorMessage = 'Failed to fetch course details';
  
      if (errorData && errorData.errors) {
        const errorMessages = Object.entries(errorData.errors).map(([key, value]) => `${key}: ${value.join(', ')}`);
        errorMessage = errorMessages.join('; ');
      }
  
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      
    }
  };

  return (
    <Box>
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          marginX: "auto",
          maxWidth: "lg",
          paddingX: 2,
          marginY: 2,
        }}
      >
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" align="left">
              Courses
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              {/* Space reserved for future use or left empty for alignment */}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={handleOpenModal}
              >
                Add Course
              </Button>
              <CourseForm
                open={isModalOpen}
                handleClose={handleCloseModal} 
                course={selectedCourse}
                handleSubmit={handleFormSubmit}
                formikRef={formikRef} 
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CourseList
              courses={courses}
              onEdit={(courseId) => handleOpenModalForEdit(courseId)}
            />
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "right" }} 
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity={snackbar.severity}
                sx={{ width: "100%" }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CourseView;
