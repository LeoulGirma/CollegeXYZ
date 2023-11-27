import React, { useState, useEffect, useRef } from "react";
import { Typography, Button, Box, Grid, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StudentList from "./components/studentList";
import Header from "./../../components/Header";
import StudentForm from "./components/studentForm";
import studentService from "../../services/studentService";

function StudentView() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error",
    });
    const formikRef = useRef();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await studentService.getStudents();
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students", error);
            setSnackbar({ open: true, message: "Failed to fetch students" });
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
        setSelectedStudent(null);
    };

    const handleOpenModalForEdit = async (studentId) => {
        try {
            const response = await studentService.getStudentById(studentId);
            setSelectedStudent(response.data);
            // console.log(response.data);

            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching student details", error);
            setSnackbar({
                open: true,
                message: "Failed to fetch student details",
                severity: "error",
            });
        }
    };
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const handleFormSubmit = async (studentData) => {
        try {
            if (selectedStudent) {
                const updatedStudentData = { ...studentData, studentId: selectedStudent.id };
                await studentService.updateStudent(selectedStudent.id, updatedStudentData);
            } else {
                await studentService.createStudent(studentData);
            }
            setIsModalOpen(false);
            fetchStudents();

        } catch (error) {
            const errorData = error.response?.data;
            let errorMessage = 'Failed to fetch student details';

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
                            Students
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
                                Add Student
                            </Button>
                            <StudentForm
                                open={isModalOpen}
                                handleClose={handleCloseModal}
                                student={selectedStudent}
                                handleSubmit={handleFormSubmit}
                                formikRef={formikRef}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <StudentList
                            students={students}
                            onEdit={(studentId) => handleOpenModalForEdit(studentId)}
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

export default StudentView;
