import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPosition } from '../../reducers/positionSlice';
//import axios from 'axios';

const PositionCreate = () => {
    const [formData, setFormData] = useState({
        title: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
       try{
        console.log("nuevo puesto:",formData)
        await dispatch(addPosition({ ...formData, id: Date.now() }));
        alert("puesto agregado correctamente");
        navigate('/positions');
        console.log("nuevo puesto:",formData)
       }catch(error){
        alert("error agregando el puesto: "+ error.message);
       }
    };
    return (
        <form className='primer-div' onSubmit={handleSubmit}>
            <h2>Nuevo puesto</h2>
            <div className='form-group'>
                <label>Titulo del Puesto:</label>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Puesto" required
                />
            </div>
            <button className='btn btn-primary' type="submit">Agregar</button>
        </form>
    );
};

export default PositionCreate;
