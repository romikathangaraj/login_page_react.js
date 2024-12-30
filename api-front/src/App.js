import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './Registerpage';
import LoginPage from './LoginPage';
import Home from './home';
import UpdatePage from './UpdatePage';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element ={<Home/>} />
        <Route path = "/update/:userId" element ={<UpdatePage/>}/>
      </Routes>
    </Router>
  );
};

export default App;