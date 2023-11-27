import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import gradeService from '../../../services/gradeService';

function GradeList({ grades, onEdit }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleEdit = (grade) => {
        onEdit(grade);
    };

    const handleDelete = (id) => {
        // Implement the delete logic
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) return <p>Loading grades...</p>;
    if (error) return <p>Error loading grades: {error.message}</p>;

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Course Id</TableCell>
                            <TableCell>Student Id</TableCell>
                            <TableCell>Letter Grade</TableCell>
                            <TableCell>Academic Period</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {grades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grade) => (
                            <TableRow key={grade.id}>
                                <TableCell>{grade.id}</TableCell>
                                <TableCell>{grade.courseId}</TableCell>
                                <TableCell>{grade.studentId}</TableCell>
                                <TableCell>{grade.letterGrade}</TableCell>
                                <TableCell>{grade.academicPeriod}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(grade.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(grade.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={grades.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

export default GradeList;
