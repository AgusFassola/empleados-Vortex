import { FETCH_EMPLOYEES, DELETE_EMPLOYEE, UPDATE_EMPLOYEE, ADD_EMPLOYEE } from '../actions/types';

// Reducer para manejar la lista de empleados
const employeesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return action.payload; // Actualiza el estado con la lista de empleados obtenida
    case DELETE_EMPLOYEE:
      return state.filter(employee => employee.id !== action.payload); // Elimina el empleado con el ID dado
    case UPDATE_EMPLOYEE:
      return state.map(employee => employee.id === action.payload.id ? action.payload : employee); // Actualiza el empleado existente
    case ADD_EMPLOYEE:
      return [...state, action.payload]; // Agrega un nuevo empleado a la lista
    default:
      return state; // Devuelve el estado actual si la acción no coincide
  }
};

export default employeesReducer;
