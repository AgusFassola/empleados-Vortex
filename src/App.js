import React from 'react';
import {  Routes , Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';
import EmployeeCreate from './components/EmployeeCreate';
import Navbar from './components/NavBar'; 

const App = () => {
  return (
    <div className="ui container">
        <Navbar/>
        <Routes>
          <Route exact path='/' Component={EmployeeList}/>
          <Route path='/employees/:id' Component={EmployeeDetail}/>
          <Route path="/create" exact Component={EmployeeCreate} />
        </Routes>
      
    </div>
  );
}

export default App;
