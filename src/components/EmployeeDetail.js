import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectEmployee, updateEmployee } from '../reducers/employeeSlice';

const EmployeeDetail = () => {
    const { id } = useParams();//useParams permite acceder a parametros de la URL (id)
    const dispatch = useDispatch();//useDispatch para enviar acciones y useSelector para acceder al estado de Redux 
    const employee = useSelector(state => state.employeeData.employees.find(emp => emp.id === parseInt(id)));

    const [isEditing, setIsEditing] = useState(false);//creo un estado para controlar si estoy editando o no
    const [editedEmployee, setEditedEmployee] = useState(employee || {});//estado para almacenar los cambios del empleado

    useEffect(() => {
        if (employee) {
            setEditedEmployee(employee);
        }
    }, [employee]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setEditedEmployee({ ...editedEmployee, [name]: value });
    };

    const handleSaveClick = () => {
        dispatch(updateEmployee(editedEmployee));
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedEmployee(employee);
        setIsEditing(false);
    };

    if (!employee) {
        return (
            <div>
                No se encontró el empleado
            </div>
        );
    }

    return (
        <div>
            <h2>Detalles del empleado:</h2>
            {isEditing ? (
                <div>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={editedEmployee.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={editedEmployee.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={editedEmployee.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={editedEmployee.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Fecha de Contratación:</label>
                        <input
                            type="date"
                            name="hireDate"
                            value={editedEmployee.hireDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Salario:</label>
                        <input
                            type="number"
                            name="salary"
                            value={editedEmployee.salary}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={handleSaveClick}>Guardar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <div>
                        <strong>ID:</strong> {employee.id}
                    </div>
                    <div>
                        <strong>Nombre:</strong> {employee.firstName}
                    </div>
                    <div>
                        <strong>Apellido:</strong> {employee.lastName}
                    </div>
                    <div>
                        <strong>Email:</strong> {employee.email}
                    </div>
                    <div>
                        <strong>Telefono:</strong> {employee.phoneNumber}
                    </div>
                    <div>
                        <strong>Fecha de Contratación:</strong> {employee.hireDate}
                    </div>
                    <div>
                        <strong>Salario:</strong> ${employee.salary}
                    </div>
                    <button onClick={handleEditClick}>Editar</button>
                </div>
            )}
        </div>
    );
};

export default EmployeeDetail;
