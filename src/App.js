import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeDetail from './components/EmployeeDetail';
import Navbar from './components/NavBar'; 
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div className="ui container">
        <Navbar/>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path="/employees" element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }/>
            <Route path="/employees/new" element={
              <PrivateRoute>
                <EmployeeCreate />
              </PrivateRoute>
              } />
            <Route path="/employees/:id" element={
              <PrivateRoute>
                <EmployeeDetail />
              </PrivateRoute>
              } />
        </Routes>
    </div>
  );
}

export default App;
