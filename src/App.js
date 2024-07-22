import React from 'react';
import {  Routes , Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';
import EmployeeForm from './components/EmployeeForm';
import Navbar from './components/NavBar'; 

const App = () => {
  return (
    <div className="ui container">

       

      
      
        <Navbar/>
        <Routes>
          <Route exact path='/' Component={EmployeeList}/>
          <Route path='/employees/:id' Component={EmployeeDetail}/>
          <Route path="/add" exact Component={EmployeeForm} />
          <Route path="/edit/:id" exact Component={EmployeeForm} />
        </Routes>
      
    </div>
  );
}

export default App;
