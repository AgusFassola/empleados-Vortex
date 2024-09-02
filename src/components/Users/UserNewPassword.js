import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../reducers/usersSlice';

const UserNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const { loading, error, passwordChangeMessage } = useSelector( state => state.users );


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    dispatch(updatePassword({ token, password: newPassword }));
        if (!error){
            navigate('/login');
        } 
      
  };


  return (
    <div>
      <h2>Establecer Nueva Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Cambiar Contraseña</button>
        {error && <p>{error}</p>}
        {passwordChangeMessage && <p>{passwordChangeMessage}</p>}
      </form>
    </div>
  );
};

export default UserNewPassword;
