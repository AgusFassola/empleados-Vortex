import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Obtener los usuarios del backend
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/api/users');
  return response.data.users;
});
//obtener un empleado por id
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id) => {
  const response = await axios.get(`http://localhost:5000/api/users/${id}`);
  return response.data.user;
});


//Agregar un usuario 
export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const response = await axios.post('http://localhost:5000/api/users/create', userData);
  return response.data.user;
});

//Actualizar un usuario 
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, updatedData }) => {
  const response = await axios.patch(`http://localhost:5000/api/users/${id}`, updatedData);
  return response.data.user;
});


//Eliminar un usuario 
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`http://localhost:5000/api/users/${id}`);
  return id;
});

//Enviar correo para cambio de contraseña
export const changePassword = createAsyncThunk('users/changePassword', async (email) => {
  const response = await axios.post('http://localhost:5000/api/users/change-password', { email });
  return response.data.message;
});

// Establecer nueva contraseña
export const updatePassword = createAsyncThunk('users/updatePassword', async ({ token, password }) => {
  const response = await axios.post(`http://localhost:5000/api/users/new-password/${token}`, { password });
  return response.data.message; // Mensaje de éxito o error
});

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error:null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = state.users.find(user => user.id === action.payload);
    },
},
  extraReducers: (builder) => {
    builder
        //handle fetchusers
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        //handle fetchUserById
        .addCase(fetchUserById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedUser = action.payload;//usuario encontrado
        })
        .addCase(fetchUserById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
        //handle adduser
        .addCase(addUser.fulfilled, (state, action) => {
          state.users.push(action.payload);
        })

        //handle updateuser
        .addCase(updateUser.fulfilled, (state, action) => {
          const index = state.users.findIndex(user => user.id === action.payload.id);
          if (index !== -1) {
            state.users[index] = action.payload;
          }        
        })

        //handle deleteuser
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.users = state.users.filter(user => user.id !== action.payload);
        })

        //enviar correo
        .addCase(changePassword.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.passwordChangeMessage = null;
        })
        .addCase(changePassword.fulfilled, (state, action) => {
          state.loading = false;
          state.passwordChangeMessage = action.payload; // Mensaje de éxito
        })
        .addCase(changePassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
        // Resetear contraseña
        .addCase(updatePassword.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
          state.loading = false;
          state.passwordChangeMessage = action.payload; // Mensaje de éxito
        })
        .addCase(updatePassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
  },
});

//export const { fetchusers, deleteuser, selectuser, updateuser, adduser } = userSlice.actions;
export const { selectUser } = userSlice.actions;
export default userSlice.reducer;
