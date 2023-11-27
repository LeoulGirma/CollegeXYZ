import React, { useState, useEffect, useRef } from "react";
import { Typography, Button, Box, Grid, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GradeList from "./components/gradeList";
import Header from "./../../components/Header";
import GradeForm from "./components/gradeForm";
import gradeService from "../../services/gradeService";

function GradeView() {
    const [grades, setGrades] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error",
    });
    const formikRef = useRef();

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        try {
            const response = await gradeService.getGrades();
            setGrades(response.data);
        } catch (error) {
            console.error("Error fetching grades", error);
            setSnackbar({ open: true, message: "Failed to fetch grades" });
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
        setSelectedGrade(null);
    };

    const handleOpenModalForEdit = async (gradeId) => {
        try {
            const response = await gradeService.getGradeById(gradeId);
            setSelectedGrade(response.data);
            // console.log(response.data);

            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching grade details", error);
            setSnackbar({
                open: true,
                message: "Failed to fetch grade details",
                severity: "error",
            });
        }
    };
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const handleFormSubmit = async (gradeData) => {
        try {
            if (selectedGrade) {
                const updatedGradeData = { ...gradeData, gradeId: selectedGrade.id };
                await gradeService.updateGrade(selectedGrade.id, updatedGradeData);
            } else {
                await gradeService.createGrade(gradeData);
            }
            setIsModalOpen(false);
            fetchGrades();

        } catch (error) {
            const errorData = error.response?.data;
            let errorMessage = 'Failed to fetch grade details';

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
                            Grades
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
                                Add Grade
                            </Button>
                            <GradeForm
                                open={isModalOpen}
                                handleClose={handleCloseModal}
                                grade={selectedGrade}
                                handleSubmit={handleFormSubmit}
                                formikRef={formikRef}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <GradeList
                            grades={grades}
                            onEdit={(gradeId) => handleOpenModalForEdit(gradeId)}
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

export default GradeView;
