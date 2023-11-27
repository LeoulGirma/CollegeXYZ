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
    name: yup.string('Enter the student name').required('Student name is required'),
    contactDetails: yup.string('Enter the student contact details').required('Student contact details is required'),

});

const StudentForm = ({ open, handleClose, student, handleSubmit, formikRef }) => {
    console.log(student)
    const formik = useFormik({
        initialValues: {
            name: student?.name || '',
            contactDetails: student?.contactDetails || ''
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
            aria-labelledby="student-modal-title"
            aria-describedby="student-modal-description"
        >
            <Box sx={style}>
                <Typography id="student-modal-title" variant="h6" component="h2">
                    {student ? 'Edit Student' : 'Add Student'}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="contactDetails"
                        name="contactDetails"
                        label="ContactDetails"
                        value={formik.values.contactDetails}
                        onChange={formik.handleChange}
                        error={formik.touched.contactDetails && Boolean(formik.errors.contactDetails)}
                        helperText={formik.touched.contactDetails && formik.errors.contactDetails}
                        margin="normal"
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        {student ? 'Update' : 'Submit'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default StudentForm;
