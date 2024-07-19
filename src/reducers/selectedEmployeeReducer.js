import { SELECT_EMPLOYEE } from '../actions/types';

// Reducer para manejar el empleado seleccionado
const selectedEmployeeReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_EMPLOYEE:
      return action.payload; // Actualiza el estado con el empleado seleccionado
    default:
      return state; // Devuelve el estado actual si la acción no coincide
  }
};

export default selectedEmployeeReducer;
