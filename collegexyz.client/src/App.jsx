import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; 
import './index.css';
import './app.css';
import HomePage from './views/homePage/homePage';
import Courses from './views/course/Courses'; 
import Students from './views/student/Students'; 
import Grades from './views/grade/Grades'; 
import Analytics from './views/analytics/analytics'; 
import Header from './components/Header';




const App = () => (
  <ThemeProvider theme={theme}> 
  <CssBaseline /> 
  <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/students" element={<Students />} />
      <Route path="/grades" element={<Grades />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  </Router>
  
</ThemeProvider>
);

export default App;
