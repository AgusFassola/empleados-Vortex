import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
//import { useSelector, useDispatch } from "react-redux";
//import { updateEmployee } from '../reducers/employeeSlice';
import axios from 'axios';

const EmployeeDetail = () => {
    const { id } = useParams();//useParams permite acceder a parametros de la URL (id)
    //const dispatch = useDispatch();//useDispatch para enviar acciones y useSelector para acceder al estado de Redux 
    //const employee = useSelector(state => state.employeeData.employees.find(emp => emp.id === parseInt(id)));
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [isEditing, setIsEditing] = useState(false);//creo un estado para controlar si estoy editando o no
    const [editedEmployee, setEditedEmployee] = useState({});//estado para almacenar los cambios del empleado

    useEffect(() => {
        const fetchEmployee = async () => {
            try{
                const response = await axios.get(
                    `http://localhost:5000/api/employee/${id}`
                );
                setEmployee(response.data);
                setEditedEmployee(response.data);
            }catch(error){
                console.error("error enviando el empleado",error);
                navigate('/not-found');
            }
        };
        fetchEmployee();

    }, [id, navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setEditedEmployee({ ...editedEmployee, [name]: value });
    };

    const handleSaveClick = async () => {
        try{
            const response = await axios.put(`http://localhost:5000/api/employees/${id}`);
            setEmployee(response.data);
            setIsEditing(false);
        }catch(error){
            console.error("error actualizando el empleado",error);
        }
    };

    const handleCancelClick = () => {
        setEditedEmployee(employee);
        setIsEditing(false);
    };

    //const url = "https://search.brave.com/images?q=advertencia&source=web";
    if (!employee) {
        return (
            <div className="container mt-4 text-center">
            <h2 className="text-center">Empleado no encontrado</h2>
            <p className="text-center">El ID que estás buscando no existe.</p>
            <button onClick={() => navigate('/')} className="btn btn-primary mt-3">Volver al inicio</button>
        </div>
        );
    }

    return (
        <div className="container">
            <h2>Detalles del empleado:</h2>

            {isEditing ? (
                <div>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={editedEmployee.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={editedEmployee.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={editedEmployee.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={editedEmployee.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Fecha de Contratación:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="hireDate"
                            value={editedEmployee.hireDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Salario:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="salary"
                            value={editedEmployee.salary}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSaveClick}>Guardar</button>
                    <button className="btn btn-danger" onClick={handleCancelClick}>Cancelar</button>
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
                    <button className="btn btn-primary" onClick={handleEditClick}>Editar</button>
                </div>
            )}
        </div>
    );
};

export default EmployeeDetail;
