import axios from 'axios';

const API_URL = 'https://localhost:7020/api/students';

const getStudents = () => axios.get(API_URL);
const createStudent = (data) => axios.post(API_URL, data);
const updateStudent = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteStudent = (id) => axios.delete(`${API_URL}/${id}`);
const getStudentById = (id) => axios.get(`${API_URL}/${id}`);



export default { getStudents, createStudent, updateStudent, deleteStudent, getStudentById };
