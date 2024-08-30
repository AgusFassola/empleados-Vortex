import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById, updateUser } from '../../reducers/usersSlice';


const UserDetail = () => {
    const { id } = useParams();//useParams permite acceder a parametros de la URL (id)
    const dispatch = useDispatch();//useDispatch para enviar acciones y useSelector para acceder al estado de Redux 
    const navigate = useNavigate();
    const user = useSelector(state => state.users.selectedUser );

    const [isEditing, setIsEditing] = useState(false);//creo un estado para controlar si estoy editando o no
    const [editedUser, setEditedUser] = useState({});//estado para almacenar los cambios del usuario
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(!user){
            dispatch(fetchUserById(id));
        }else{
            setEditedUser({
                username:  user.username,
                email: user.email,
                role: user.role
            });
        }
    }, [dispatch, id, user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleInputChange = e => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSaveClick = async () => {
        try{
            //const token = localStorage.getItem('token');

            //const data = { "name":"ingenieroPrueba2",position:"QA"  }

            const updatedUser = {
                username: editedUser.username,
                email: editedUser.email,
                role: editedUser.role
            };
            console.log("si ingrese", updatedUser)
            await dispatch(updateUser({ id, updatedData: updatedUser }));
            console.log("si ingrese", updateUser({ id, updatedData: updatedUser }))
            dispatch(fetchUserById(id));
            /* const response = await axios.patch(`http://localhost:5000/api/users/${id}`,
                 updateduser,
                /* {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                } */
            //);*/
            //console.log("usuario?", response)

            //setuser(updateduser);
            setIsEditing(false);
            setErrorMessage('');
        }catch(error){
            console.log("error actualizando el usuario",error);
            setErrorMessage('Error al actualizar el usuario');
        }
    };

    const handleCancelClick = () => {
        //setEditeduser(user);
        setIsEditing(false);
        setErrorMessage('');
        setEditedUser({
            username:  user.username,
            email: user.email,
            role: user.role
        });
        
    };

    if (!user) {
        return (
            <div className="container mt-4 text-center">
            <h2 className="text-center">Usuario no encontrado</h2>
            <p className="text-center">El ID que estás buscando no existe.</p>
            <button onClick={() => navigate('/users')} className="btn btn-primary mt-3">Volver al inicio</button>
        </div>
        );
    }

    return (
        <div className="container">
            <h2>Detalles del usuario:</h2>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            
            {isEditing ? (
                <div>
                    <div>
                        <label>Nombre de Usuario:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={editedUser.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label>Rol:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="role"
                            value={editedUser.role}
                            onChange={handleInputChange}
                        />
                    </div>
  
                    <button className="btn btn-primary" onClick={handleSaveClick}>Guardar</button>
                    <button className="btn btn-danger" onClick={handleCancelClick}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <div><strong>ID:</strong> {user.id}</div>
                    <div><strong>Nombre de usuario:</strong> {user.username}</div>
                    <div><strong>Email:</strong> {user.email}</div>
                    <div><strong>Rol:</strong> {user.role}</div>
                    <button className="btn btn-primary" onClick={handleEditClick}>Editar</button>
                </div>
            )}
        </div>
    );
};

export default UserDetail;
