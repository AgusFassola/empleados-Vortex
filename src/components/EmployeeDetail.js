import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
//useParams permite acceder a parametros de la URL (id)
import { useSelector, useDispatch } from "react-redux";
//useSelector para acceder al estado de Redux y
//useDispatch para enviar acciones
import { selectEmployee, updateEmployee } from '../actions/employeeActions';

const EmployeeDetail = () => {
    const { id } = useParams();//obtengo el id del empleado desde URL
    //const navigate = useNavigate(); //se para navegar o volver al inicio
    const dispatch = useDispatch();
    const employee = useSelector( state => 
        state.employeeData.employees.find( emp => emp.id === parseInt(id))
    );//guarda el empleado que coincide con el id del url

    const [ isEditing, setIsEditing ] = useState( false ) //creo un estado para controlar si estoy editando o no
    const [ editedEmployee, setEditedEmployee ] = useState(employee || {});//estado para almacenar los cambios del empleado

    useEffect(() => {
        if (id){
            dispatch(selectEmployee(id));
            //envia el usuario seleccionado con su id
        }
    }, [id, dispatch]);//se ejecuta al cargar o al cambiar el id o el dispatch


    useEffect(() => {
        if(employee){
            setEditedEmployee(employee || {});
            //estado con datos del empleado
        }
    },[employee]);

    // Habilitar el modo edición
    const handleEditClick = () => {
        setIsEditing(true); 
      };

    //Datos ingresados
    const handleInputChange = e => {
        const { name, value } = e.target;
        setEditedEmployee({ ...editedEmployee, [name]: value });
        // Actualizo el estado de edición con los cambios
      };
    
      //Botón guardar
    const handleSaveClick = () => {
        dispatch(updateEmployee(editedEmployee)); 
        // Envío la acción para actualizar el empleado
        setIsEditing(false); 
      };
    
      //Boton cancelar
      const handleCancelClick = () => {
        setEditedEmployee(employee || []); 
        // Devuelvo el empleado sin cambios
        setIsEditing(false); 
      };
    
    if(!employee) {
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