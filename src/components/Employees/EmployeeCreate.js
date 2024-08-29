import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../../reducers/employeeSlice';
//import axios from 'axios';

const EmployeeCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        salary: '',
        address: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Validación para el email
        /* const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValid.test(formData.email)) {
            alert("Ingrese un correo electrónico válido.");
            return;
        } */
       try{
        console.log("nuevo empleado:",formData)
        await dispatch(addEmployee({ ...formData, id: Date.now() }));
        alert("Empleado agregado correctamente");
        navigate('/employees');
        console.log("nuevo empleado:",formData)
       }catch(error){
        alert("error agregando el empleado: "+ error.message);
       }
    };
        /* try{
            const response = await fetch('/api/employees/create',{
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(formData)
            });
            if(!response.ok){
                throw new Error('Error al crear el empleado');
            }

            alert('Empleado agregado correctamente');
            navigate('/');

        }catch(error){
            alert('Error al agregar el empleado: '+ error.message);
        } */

        /* try{
            const response = await axios.post(
                'http://localhost:5000/api/employees/create', 
                formData ,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json', 
                    }
                } 
            );
            console.log("response:",response)
            alert('Empleado agregado correctamente');
            navigate('/employees');
        }catch(error){
            console.log("error al agregar el empleado")
            alert('Error al agregar el empleado: '+ error.message);
        } */


    return (
        <form onSubmit={handleSubmit}>
            <h2>Nuevo empleado</h2>
            <div className='form-group'>
                <label>Nombre de Usuario:</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Usuario" required
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" required
                />
            </div>

            <div>
                <label>Puesto de Trabajo:</label>
                <input
                    type="text"
                    className="form-control"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Salario:</label>
                <input
                    type="number"
                    className="form-control"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Salario" 
                />
            </div>
            <div>
                <label>Dirección:</label>
                <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Dirección" 
                />
            </div>
            <button className='btn btn-primary' type="submit">Agregar</button>
        </form>
    );
};

export default EmployeeCreate;
