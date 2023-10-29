import { useState } from "react";
import { useAppSelector } from "./app/hooks/hooks";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from "./components/profile/Profile";
import Home from "./components/home/Home";

const App: React.FC = () => {
  
  return (
    <>
    <Router>
      <Routes>
         <Route path="/profile" element={<Profile  />} />
         <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
