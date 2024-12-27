import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './Registerpage';
import LoginPage from './LoginPage';
import Home from './home';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element ={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;



// bm