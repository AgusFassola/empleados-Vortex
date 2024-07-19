import React, { useEffect } from "react";
import {connect } from 'react-redux';
import { fetchEmployees, deteleEmployee } from '../actions/employeeActions';
import { Link } from "react-router-dom";

const EmployeeList = ({ employees, fetchEmployees, deleteEmployee }) => {
    useEffect(() => {
        fetchEmployees();
    },[ fetchEmployees ]);
}

export default EmployeeList;