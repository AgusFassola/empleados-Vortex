import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deteleEmployee } from '../actions/employeeActions';
import EmployeeTable from './EmployeeTable';
import { Link } from "react-router-dom";

const EmployeeList = () =>{
    const dispatch = useDispatch();
    const employees = useSelector( state => state.employeeData.employees);

    useEffect(() => {
        dispatch( fetchEmployees());
    }, [dispatch]);

    return (
        <div>
          { employees.length === 0 ? 
            ( <p>No hay empleados disponibles.</p> ) 
          : 
            ( <EmployeeTable employees={employees} /> )
          }
        </div>
    );
}
export default EmployeeList;
/* import {connect } from 'react-redux';

const EmployeeList = ({ employees, fetchEmployees, deleteEmployee }) => {
    useEffect(() => {
        fetchEmployees();
    },[ fetchEmployees ]);
}

 */