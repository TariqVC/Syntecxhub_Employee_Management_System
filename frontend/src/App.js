import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ManageEmployees from './pages/ManageEmployees';
import AddEmployee from './pages/AddEmployee';
import Departments from './pages/Departments';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<ManageEmployees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/edit/:id" element={<AddEmployee />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </Router>
  );
}

export default App;