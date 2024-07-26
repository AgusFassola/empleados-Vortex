import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
        <div className='container mt-4'>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Usuario: </label>
                    <input
                        placeholder='Usuario'
                        type='text'
                        className='form-control'
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input
                        placeholder='contraseña'
                        type='password'
                        className='form-control'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    className='btn btn-primary' 
                    type='submit'
                    >Ingresar
                </button>
            </form>

        </div>

    );
}

export default Login
