import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
/* const initialState = {
  employees: [
    { id: 1, firstName: 'Agus', lastName: 'Fassola', email: 'agus@gmail.com', phoneNumber: '3514701452', hireDate: '10-01-2024', salary: 50000 },
    { id: 2, firstName: 'Lara', lastName: 'Valdez', email: 'lara@gmail.com', phoneNumber: '3874044575', hireDate: '22-01-2024', salary: 60000 },
    { id: 3, firstName: 'Nico', lastName: 'Varela', email: 'nico@gmail.com', phoneNumber: '388818378', hireDate: '09-12-2018', salary: 70000 },
    { id: 4, firstName: 'Mateo', lastName: 'Fassola', email: 'mateo@gmail.com', phoneNumber: '3514701452', hireDate: '10-01-2024', salary: 50000 },
    { id: 5, firstName: 'Emilio', lastName: 'Martinez', email: 'emi@gmail.com', phoneNumber: '3884044575', hireDate: '22-01-2024', salary: 60000 },
    { id: 6, firstName: 'Lucas', lastName: 'Varela', email: 'lucas@gmail.com', phoneNumber: '387818378', hireDate: '09-12-2018', salary: 70000 },
    { id: 7, firstName: 'Juan', lastName: 'Ovejero', email: 'juan@gmail.com', phoneNumber: '3514701452', hireDate: '10-01-2024', salary: 50000 },
    { id: 8, firstName: 'Pedro', lastName: 'Sanchez', email: 'pedro@gmail.com', phoneNumber: '3884044575', hireDate: '22-01-2024', salary: 60000 },
    { id: 9, firstName: 'Eduardo', lastName: 'Barbero', email: 'edu@gmail.com', phoneNumber: '351818378', hireDate: '09-12-2018', salary: 70000 },
    { id: 10, firstName: 'Marta', lastName: 'Berta', email: 'marta@gmail.com', phoneNumber: '3874701452', hireDate: '10-01-2024', salary: 50000 },
    { id: 11, firstName: 'Hortensia', lastName: 'Lara', email: 'horten@gmail.com', phoneNumber: '3884044575', hireDate: '22-01-2024', salary: 60000 },
    { id: 12, firstName: 'Ornella', lastName: 'Collante', email: 'orne@gmail.com', phoneNumber: '388818378', hireDate: '09-12-2018', salary: 70000 },
  ],
  selectedEmployee: null
}; */
//Obtener los empleados del backend
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('http://localhost:5000/api/employees');
  return response.data.employees;
});

//obtener un empleado por id
export const fetchEmployeeById = createAsyncThunk('employees/fetchEmployeeById', async (id) => {
  const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
  return response.data.employee;
});

//Agregar un empleado 
export const addEmployee = createAsyncThunk('employees/addEmployee', async (employeeData) => {
  const response = await axios.post('http://localhost:5000/api/employees', employeeData);
  return response.data.employee;
});

//Actualizar un empleado 
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, updatedData }) => {
  const response = await axios.patch(`http://localhost:5000/api/employees/${id}`, updatedData);
  return response.data.employee;
});
console.log("actualizar_usuario",updateEmployee )


//Eliminar un empleado 
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
  await axios.delete(`http://localhost:5000/api/employees/${id}`);
  return id;
});

const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error:null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    selectEmployee: (state, action) => {
      state.selectedEmployee = state.employees.find(employee => employee.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
        //handle fetchEmployees
        .addCase(fetchEmployees.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchEmployees.fulfilled, (state, action) => {
          state.loading = false;
          state.employees = action.payload;
        })
        .addCase(fetchEmployees.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        //handle fetchEmployeeById
        .addCase(fetchEmployeeById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchEmployeeById.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedEmployee = action.payload;//empleado encontrado
        })
        .addCase(fetchEmployeeById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        //handle addEmployee
        .addCase(addEmployee.fulfilled, (state, action) => {
          state.employees.push(action.payload);
        })

        //handle updateEmployee
        .addCase(updateEmployee.fulfilled, (state, action) => {
          const index = state.employees.findIndex(employee => employee.id === action.payload.id);
          if (index !== -1) {
            state.employees[index] = action.payload;
          }        
        })

        //handle deleteEmployee
        .addCase(deleteEmployee.fulfilled, (state, action) => {
          state.employees = state.employees.filter(employee => employee.id !== action.payload);
        });
  },
});

//export const { fetchEmployees, deleteEmployee, selectEmployee, updateEmployee, addEmployee } = employeeSlice.actions;
export const { selectEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
