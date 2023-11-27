import axios from 'axios';

const API_URL = 'https://localhost:7020/api/grades';

const getGrades = () => axios.get(API_URL);
const createGrade = (data) => axios.post(API_URL, data);
const updateGrade = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteGrade = (id) => axios.delete(`${API_URL}/${id}`);
const getGradeById = (id) => axios.get(`${API_URL}/${id}`);



export default { getGrades, createGrade, updateGrade, deleteGrade, getGradeById };
