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
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const fetchEmployee = async () => {
            try{
                const response = await axios.get(
                    `http://localhost:5000/api/employees/${id}`
                );
                console.log("empleado: ",response.data)
                setEmployee(response.data.employee);
                //setEditedEmployee(response.data.employee);
            }catch(error){
                console.log("error enviando el empleado",error);
                //navigate('/not-found');
            }
        };
        fetchEmployee();

    }, [id, navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
        const updatedEmployee = {
            name:  employee.name,
            email: employee.email,
            position: employee.position.title,
            salary: employee.salary,
            address: employee.address
        };
        setEditedEmployee(updatedEmployee)
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setEditedEmployee({ ...editedEmployee, [name]: value });
    };

    const handleSaveClick = async () => {
        try{
            const token = localStorage.getItem('token');

            //const data = { "name":"ingenieroPrueba2",position:"QA"  }

            const updatedEmployee = {
                name: editedEmployee.name,
                email: editedEmployee.email,
                position: editedEmployee.position,
                salary: editedEmployee.salary,
                address: editedEmployee.address 
            };

            const response = await axios.patch(`http://localhost:5000/api/employees/${id}`,
                 updatedEmployee,
                /* {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                } */
            );
            console.log("Empleado?", response)

            setEmployee(updatedEmployee);
            setIsEditing(false);
            setErrorMessage('');
        }catch(error){
            console.log("error actualizando el empleado",error);
            setErrorMessage('Error al actualizar el empleado');
        }
    };

    const handleCancelClick = () => {
        setEditedEmployee(employee);
        setIsEditing(false);
        setErrorMessage('');
    };

    //const url = "https://search.brave.com/images?q=advertencia&source=web";
    if (!employee) {
        return (
            <div className="container mt-4 text-center">
            <h2 className="text-center">Empleado no encontrado</h2>
            <p className="text-center">El ID que estás buscando no existe.</p>
            <button onClick={() => navigate('/employees')} className="btn btn-primary mt-3">Volver al inicio</button>
        </div>
        );
    }

    return (
        <div className="container">
            <h2>Detalles del empleado:</h2>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            
            {isEditing ? (
                <div>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={editedEmployee.name}
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
                        <label>Posición:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="position"
                            value={editedEmployee.position}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* <div>
                        <label>Fecha de Contratación:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="hireDate"
                            value={editedEmployee.hireDate}
                            onChange={handleInputChange}
                        />
                    </div> */}
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
                    <div>
                        <label>Dirección:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={editedEmployee.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSaveClick}>Guardar</button>
                    <button className="btn btn-danger" onClick={handleCancelClick}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <div><strong>ID:</strong> {employee.id}</div>
                    <div><strong>Nombre:</strong> {employee.name}</div>
                    <div><strong>Email:</strong> {employee.email}</div>
                    <div><strong>Posición:</strong> {employee.position.title}</div>
                    {/* <div>
                        <strong>Fecha de Contratación:</strong> {employee.hireDate}
                    </div> */}
                    <div><strong>Salario:</strong> ${employee.salary}</div>
                    <div><strong>Dirección:</strong> {employee.address}</div>
                    <button className="btn btn-primary" onClick={handleEditClick}>Editar</button>
                </div>
            )}
        </div>
    );
};

export default EmployeeDetail;
