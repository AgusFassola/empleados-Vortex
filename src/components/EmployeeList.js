import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from '../reducers/employeeSlice';
import { Link } from 'react-router-dom';
import { deleteEmployee } from "../reducers/employeeSlice";

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
        return <div>No hay empleados disponibles</div>;
    }

    return (
        <div>
            <h2>Lista de empleados</h2>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td>
                            <Link to={`/employees/${employee.id}`}>
                                {employee.firstName} 
                            </Link>
                        </td>
                        <td>
                            <Link to={`/employees/${employee.id}`}>
                            {employee.lastName}
                            </Link>
                        </td>
                        
                        <td>
                            <button onClick={() => handleDeleteClick(employee.id)}>Eliminar</button>
                        </td>

                    </tr>
                ))}
            </tbody>

        </div>
    );
};

export default EmployeeList;
