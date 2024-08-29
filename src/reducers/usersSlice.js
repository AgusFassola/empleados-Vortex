import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Obtener los usuarios del backend
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/api/users');
  return response.data.users;
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
  sortUsers: (state, action) => {
    const { field, direction } = action.payload;
    state.users.sort((a, b) => {
      if (direction === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
  },
  filterUsers: (state, action) => {
    const searchTerm = action.payload.toLowerCase();
    state.users = state.users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm)
    );
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
        });
  },
});

//export const { fetchusers, deleteuser, selectuser, updateuser, adduser } = userSlice.actions;
export const { selectUser, sortUsers, filterUsers } = userSlice.actions;
export default userSlice.reducer;
