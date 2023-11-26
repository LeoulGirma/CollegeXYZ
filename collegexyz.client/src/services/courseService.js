import axios from 'axios';

const API_URL = 'https://localhost:7020/api/courses'; 

const getCourses = () => axios.get(API_URL);
const createCourse = (data) => axios.post(API_URL, data);
const updateCourse = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteCourse = (id) => axios.delete(`${API_URL}/${id}`);
const getCourseById = (id) => axios.get(`${API_URL}/${id}`);



export default { getCourses, createCourse, updateCourse, deleteCourse,getCourseById };
