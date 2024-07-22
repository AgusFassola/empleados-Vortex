import React from 'react';
import { Routes , Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
/* import EmployeeDetail from './components/EmployeeDetail';
import EmployeeForm from './components/EmployeeForm';
import Navbar from './components/NavBar'; */

const App = () => {
  return (
    <div className="ui container">

        <Routes>
          <Route exact path='/' Component={EmployeeList}/>
        </Routes>

      {/* <Navbar/>
      <BrowserRouter>

          <Route path="/" exact Component={EmployeeList}/>
          <Route path="/employees/new" exact Component={EmployeeForm} />
          <Route path="/employees/:id" exact Component={EmployeeDetail} />

      </BrowserRouter> */}
    </div>
  );
}

export default App;
