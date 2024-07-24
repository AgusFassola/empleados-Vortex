import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../reducers/employeeSlice';

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

        // Validación para el email
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValid.test(formData.email)) {
            alert("Ingrese un correo electrónico válido.");
            return;
        }

        // Validación para el teléfono (que tenga mínimo 10 caracteres)
        if (formData.phoneNumber.length < 10) {
            alert("El teléfono debe tener 10 digitos o más.");
            return;
        }

        dispatch(addEmployee({ ...formData, id: Date.now() }));
        alert("Empleado agregado correctamente");
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Nuevo empleado</h2>
            <div className='form-group'>
                <label>Nombre:</label>
                <input
                    type="text"
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                    name="hireDate"
                    value={formData.hireDate}
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
            <button className='btn btn-primary' type="submit">Agregar</button>
        </form>
    );
};

export default EmployeeCreate;
