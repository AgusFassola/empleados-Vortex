import React from 'react'


const Login = () => {
    return (
        <div className='container mt-4'>
            <h2>Iniciar Sesión</h2>
            <div>
                <label>Usuario: </label>
                <input
                    placeholder='Usuario'
                    type='text'
                    className='form-control'
                    required 
                />
            </div>
            <div>
                <label>Contraseña: </label>
                <input
                    placeholder='contraseña'
                    type='password'
                    className='form-control'
                    required 
                />
            </div>
            <button
                className='btn btn-primary' type='submit'>Ingresar</button>
        </div>

    );
}

export default Login
