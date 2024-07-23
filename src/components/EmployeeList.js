import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from '../actions/employeeActions';
import EmployeeTable from './EmployeeTable';


const EmployeeList = () =>{
    const dispatch = useDispatch();
    const employees = useSelector( state => state.employeeData.employees);
    //guarda la lista de empleados

    useEffect(() => {
        dispatch( fetchEmployees());
    }, [dispatch]);

    return (
        <div>
          <h2>Empleados:</h2> 
          <EmployeeTable employees={employees} />
        </div>
    );
}
export default EmployeeList;
