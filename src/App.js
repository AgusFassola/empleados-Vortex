import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';
import EmployeeForm from './components/EmployeeForm';
import Navbar from './components/NavBar';

const App = () => {
  return (
    <div className="ui container">
      <Navbar/>
      <BrowserRouter>

          <Route path="/" exact Component={EmployeeList}/>
          <Route path="/employees/new" exact Component={EmployeeForm} />
          <Route path="/employees/:id" exact Component={EmployeeDetail} />

      </BrowserRouter>
    </div>
  );
}

export default App;
