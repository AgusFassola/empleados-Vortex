import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from '../reducers/employeeSlice';
import { Link } from 'react-router-dom';
import { deleteEmployee } from "../reducers/employeeSlice";
import '../index.css';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employeeData.employees);
    //guarda la lista de empleados

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleDeleteClick = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
            dispatch(deleteEmployee(id));
        }
    };

    if (employees.length === 0) {
        return (
            <div className="alert alert-info">
                No hay empleados disponibles
            </div>);
    }

    return (
        
        <table className="table table-striped">
            
            <thead>
            <h2 className="mb-4">Lista de empleados</h2>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td>
                            <Link
                            className="employee-link" 
                            to={`/employees/${employee.id}`}>
                                {employee.firstName}
                            </Link>
                        </td>
                        <td>
                            <Link
                            className="employee-link" 
                            to={`/employees/${employee.id}`}>
                                {employee.lastName}
                            </Link>
                        </td>

                        <td>
                            <button className="btn btn-danger" onClick={() => handleDeleteClick(employee.id)}>Eliminar</button>
                        </td>

                    </tr>
                ))}
            </tbody>

        </table>
    );
};

export default EmployeeList;
