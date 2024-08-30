import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Obtener las posiciones del backend
export const fetchPositions = createAsyncThunk('positions/fetchPositions', async () => {
  const response = await axios.get('http://localhost:5000/api/positions');
  return response.data.positions;
});

//Agregar un puesto 
export const addPosition = createAsyncThunk('positions/addPosition', async (positionData) => {
  const response = await axios.post('http://localhost:5000/api/positions/create', positionData);
  return response.data.position;
});

//Eliminar un puesto 
export const deletePosition = createAsyncThunk('positions/deletePosition', async (id) => {
  await axios.delete(`http://localhost:5000/api/positions/${id}`);
  return id;
});

const initialState = {
  positions: [],
  selectedPosition: null,
  loading: false,
  error:null,
};

const positionSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    selectPosition: (state, action) => {
      state.selectedPosition = state.positions.find(position => position.id === action.payload);
    },
},
  extraReducers: (builder) => {
    builder
        //handle fetchpositions
        .addCase(fetchPositions.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPositions.fulfilled, (state, action) => {
          state.loading = false;
          state.positions = action.payload;
        })
        .addCase(fetchPositions.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        //handle addposition
        .addCase(addPosition.fulfilled, (state, action) => {
          state.positions.push(action.payload);
        })

        //handle deleteposition
        .addCase(deletePosition.fulfilled, (state, action) => {
          state.positions = state.positions.filter(position => position.id !== action.payload);
        });
  },
});

export const { selectPosition, sortPositions, filterPositions } = positionSlice.actions;
export default positionSlice.reducer;
