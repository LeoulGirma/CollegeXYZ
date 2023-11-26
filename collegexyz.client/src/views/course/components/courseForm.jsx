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
  title: yup.string('Enter the course title').required('Course title is required'),
  courseCode: yup.string('Enter the course code').required('Course code is required'),
  description: yup.string('Enter the description').required('Description is required'),
  creditHours: yup.number('Enter credit hours').required('Credit hours are required').positive().integer(),
});

const CourseForm = ({ open, handleClose, course, handleSubmit, formikRef }) => {
  console.log(course)
  const formik = useFormik({
    initialValues: {
      title: course?.title || '',
      courseCode: course?.courseCode || '',
      description: course?.description || '',
      creditHours: course?.creditHours || 0,
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
      aria-labelledby="course-modal-title"
      aria-describedby="course-modal-description"
    >
      <Box sx={style}>
        <Typography id="course-modal-title" variant="h6" component="h2">
          {course ? 'Edit Course' : 'Add Course'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            margin="normal"
          />
          <TextField
            fullWidth
            id="courseCode"
            name="courseCode"
            label="Course Code"
            value={formik.values.courseCode}
            onChange={formik.handleChange}
            error={formik.touched.courseCode && Boolean(formik.errors.courseCode)}
            helperText={formik.touched.courseCode && formik.errors.courseCode}
            margin="normal"
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4} 
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
          />
          <TextField
            fullWidth
            id="creditHours"
            name="creditHours"
            label="Credit Hours"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            value={formik.values.creditHours}
            onChange={formik.handleChange}
            error={formik.touched.creditHours && Boolean(formik.errors.creditHours)}
            helperText={formik.touched.creditHours && formik.errors.creditHours}
            margin="normal"
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            {course ? 'Update' : 'Submit'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CourseForm;
