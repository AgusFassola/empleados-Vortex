import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeDetail from './components/EmployeeDetail';
import Navbar from './components/NavBar';
import Login from './components/Login';

const App = () => {
  return (
    <div className="ui container">
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employees/new" element={<EmployeeCreate />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
        <Route path="/login" element={<Login />}/>
      </Routes>

    </div>
  );
}

export default App;
