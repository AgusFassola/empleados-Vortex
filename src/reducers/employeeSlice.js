import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    fetchEmployees: (state) => {
      return state;
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
    },
    selectEmployee: (state, action) => {
      state.selectedEmployee = state.employees.find(employee => employee.id === action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(employee => employee.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    }
  }
});

export const { fetchEmployees, deleteEmployee, selectEmployee, updateEmployee, addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
