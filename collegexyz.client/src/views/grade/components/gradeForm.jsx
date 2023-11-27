import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const validationSchema = yup.object({
    courseId: yup.string('Enter the Course').required('Course is required'),
    studentId: yup.string('Enter the Student').required('Student is required'),
    letterGrade: yup.string('Enter the Letter Grade').required('Letter Grade is required'),
    academicPeriod: yup.string('Enter the Academic Period').required('Academic Period is required'),
});

const GradeForm = ({ open, handleClose, grade, handleSubmit, formikRef }) => {
    console.log(grade)
    const formik = useFormik({
        initialValues: {
            courseId: grade?.courseId || '',
            studentId: grade?.studentId || '',
            letterGrade: grade?.letterGrade || '',
            academicPeriod: grade?.academicPeriod || '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values);
            handleClose();
            resetForm();
        },
        enableReinitialize: true,
        innerRef: formikRef,
    });

    return (
        <Modal
            open={open}
            onClose={() => {
                handleClose();
                formik.resetForm();
            }}
            aria-labelledby="grade-modal-title"
            aria-describedby="grade-modal-description"
        >
            <Box sx={style}>
                <Typography id="grade-modal-title" variant="h6" component="h2">
                    {grade ? 'Edit Grade' : 'Add Grade'}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="courseId"
                        name="courseId"
                        label="Course"
                        value={formik.values.courseId}
                        onChange={formik.handleChange}
                        error={formik.touched.courseId && Boolean(formik.errors.courseId)}
                        helperText={formik.touched.courseId && formik.errors.courseId}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="studentId"
                        name="studentId"
                        label="Student"
                        value={formik.values.studentId}
                        onChange={formik.handleChange}
                        error={formik.touched.studentId && Boolean(formik.errors.studentId)}
                        helperText={formik.touched.studentId && formik.errors.studentId}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="letterGrade"
                        name="letterGrade"
                        label="LetterGrade"
                        multiline
                        rows={4}
                        value={formik.values.letterGrade}
                        onChange={formik.handleChange}
                        error={formik.touched.letterGrade && Boolean(formik.errors.letterGrade)}
                        helperText={formik.touched.letterGrade && formik.errors.letterGrade}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="academicPeriod"
                        name="academicPeriod"
                        label="Academic Period"
                        value={formik.values.academicPeriod}
                        onChange={formik.handleChange}
                        error={formik.touched.academicPeriod && Boolean(formik.errors.academicPeriod)}
                        helperText={formik.touched.academicPeriod && formik.errors.academicPeriod}
                        margin="normal"
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        {grade ? 'Update' : 'Submit'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default GradeForm;
