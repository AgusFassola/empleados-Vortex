import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../actions/employeeActions';

const EmployeeCreate = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        hireDate: '',
        salary: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addEmployee({ ...formData, EMPLOYEE_ID: Date.now() }));
        alert("Empleado agregado correctamente");
        navigate('/');
    };

    return (
        
        <form onSubmit={handleSubmit}>
            <h2>Nuevo empleado</h2> 
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Nombre" required
                />
            </div>
            <div>
                <label>Apellido:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Apellido" required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" required
                />
            </div>
            <div>
                <label>Teléfono:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Teléfono" required
                />
            </div>
            <div>
                <label>Fecha de Contratación:</label>
                <input
                    type="date"
                    name="hireDate"
                    value={formData.hireDate}
                    onChange={handleChange}

                />
            </div>
            <div>
                <label>Salario:</label>
                <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Salario" required
                />
            </div>
            <button type="submit">Agregar</button>
        </form>
    );
};

export default EmployeeCreate;
