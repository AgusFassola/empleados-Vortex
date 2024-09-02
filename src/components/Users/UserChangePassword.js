import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../reducers/usersSlice";

const UserChangePassword = () =>{
    const [ email, setEmail ] = useState('');
    const dispatch = useDispatch();
    const { loading, error, passwordChangeMessage } = useSelector( state => state.users )

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword(email));
    };
    return(
        <div className="primer-div">
            <h2>Recupera tu contraseña</h2>
            <form onSubmit={handleSubmit}>
                <label>Ingrese su correo:</label>
                <input 
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    Enviar
                </button>
                {error && <p>{error}</p>}
                {passwordChangeMessage && <p>{passwordChangeMessage}</p>}
            </form>
        </div>
    );
};
export default UserChangePassword;