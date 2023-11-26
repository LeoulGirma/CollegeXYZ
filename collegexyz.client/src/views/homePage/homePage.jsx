import React from 'react';
import Header from '../../components/Header';
import HomePageContent from './HomePageContent'; 

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HomePageContent /> 
    </div>
  );
};

export default HomePage;
