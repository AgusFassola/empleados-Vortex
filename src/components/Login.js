import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Login = () => {

    const navigate = useNavigate();
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if( userName === 'admin' && password === 'admin' ||
            userName === 'agus' && password === 'agus'
        ){
            alert(`Inicio Exitoso, Bienvenido/a ${userName} `)
            navigate('/');
        }else{
            alert(`Usuario o contraseña incorrectos`)
        }
    }

    return (
        <div className='login-container vh-100'>
            <h2 className='mb-4 text-center'>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className='p-4 border rounded shadow'>
                <div className='mb-4'>
                    <label className='form-label'>Usuario: </label>
                    <input
                        placeholder='Usuario'
                        type='text'
                        className='form-control'
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='form-label'>Contraseña: </label>
                    <input
                        placeholder='contraseña'
                        type='password'
                        className='form-control'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    className='btn btn-primary w-100' 
                    type='submit'
                    >Ingresar
                </button>
            </form>

        </div>

    );
}

export default Login
