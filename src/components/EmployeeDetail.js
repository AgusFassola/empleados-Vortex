import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from 'react-router-dom';
//useNavigate es para navegar entre rutas y 
//useParams permite acceder a parametros de la URL (id)
import { useSelector, useDispatch } from "react-redux";
//useSelector para acceder al estado de Redux y
//useDispatch para enviar acciones
import { selectEmployee, deleteEmployee } from '../actions/employeeActions';

const EmployeeDetail = () => {
    const { id } = useParams();//obtengo el id del empleado desde URL
    const navigate = useNavigate(); //se para navegar o volver al inicio
    const dispatch = useDispatch();
    const employee = useSelector( state => 
        state.employeeData.employees.find( emp => emp.id === parseInt(id))
    );//guarda el empleado que coincide con el id del url

    useEffect(() => {
        if (id){
            dispatch(selectEmployee(id));
            //envia el usuario seleccionado con su id
        }
    }, [id, dispatch]);//se ejecuta al cargar o al cambiar el id o el dispatch

       //eliminar un empleado
       const handleDelete = () => {
        if(window.confirm('Seguro que quieres eliminar el empleado?')){
            dispatch(deleteEmployee(id));
            navigate('/');
            //despues de eliminar vuelve a la pantalla principal
        }
    };

    if(!employee) {
        return (
            <div>
                El empleado no funciona.
            </div>
        );
    }

    return (
        <div>
            <h2>Detalles del empleado</h2>
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
                <strong>Inicio:</strong> {employee.hireDate}
            </div>
            <div>
                <strong>Salario:</strong> ${employee.salary}
            </div>
            <button onClick={() =>
                navigate(`/edit/${employee.id}`)
            }>
                Editar
            </button>
            {/* {isEditing && (
                <div>{formulario para editar empleado}</div>
            )} */}
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
};

export default EmployeeDetail;