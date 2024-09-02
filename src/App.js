import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/Employees/EmployeeList";
import EmployeeCreate from "./components/Employees/EmployeeCreate";
import EmployeeDetail from "./components/Employees/EmployeeDetail";
import Navbar from "./components/NavBar";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import UserList from "./components/Users/UserList";
import UserCreate from "./components/Users/UserCreate";
import UserDetail from "./components/Users/UserDetail";
import UserChangePassword from "./components/Users/UserChangePassword";
import UserNewPassword from "./components/Users/UserNewPassword";
import PositionList from "./components/Positions/PositionList";
import PositionCreate from "./components/Positions/PositionCreate";

const App = () => {
  return (
    <div className="ui container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/employees"
          element={
            <PrivateRoute><EmployeeList /></PrivateRoute>
          }
        />
        <Route path="/employees/new"
          element={
            <PrivateRoute><EmployeeCreate /></PrivateRoute>
          }
        />
        <Route path="/employees/:id" 
          element={
            <PrivateRoute><EmployeeDetail /></PrivateRoute>
          }
        />
        <Route path="/users"
          element={
            <PrivateRoute><UserList /></PrivateRoute>
          }
        />
        <Route path="/users/new"
          element={
            <PrivateRoute><UserCreate /></PrivateRoute>
          }
        />
        <Route path="/users/:id" 
          element={
            <PrivateRoute><UserDetail /></PrivateRoute>
          }
        />
        <Route path="/users/change-password"
          element={ <UserChangePassword /> }
        />
        <Route path="/users/new-password/:token"
          element={ <UserNewPassword /> }
        />
        <Route path="/positions" 
          element={
            <PrivateRoute><PositionList /></PrivateRoute>
          }
        />
        <Route path="/positions/new" 
          element={
            <PrivateRoute><PositionCreate /></PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
