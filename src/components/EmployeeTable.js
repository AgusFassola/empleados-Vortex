// src/components/EmployeeTable.js
import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeTable = ({ employees }) => {
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Inicio</th>
          <th>Salario</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id}>
            {/* le agrego la funcionalidad para que sea clickeable
            en este caso unicamente en el id */}
            <td>
                <Link 
                    to={`/employees/${employee.id}`}
                    /* agrego el id a la direccion url
                     para poder obtener por ahí el id */
                >
                    {employee.id}
                </Link>
            </td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
            <td>{employee.phoneNumber}</td>
            <td>{employee.hireDate}</td>
            <td>{employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
