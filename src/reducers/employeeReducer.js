import { 
  FETCH_EMPLOYEES, 
  DELETE_EMPLOYEE, 
  UPDATE_EMPLOYEE,
  SELECT_EMPLOYEE, 
  ADD_EMPLOYEE 
} from '../actions/types';

const initialState = {
  employees:[],
  selectedEmployee: null
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
    case DELETE_EMPLOYEE:
        return {
          ...state,
          employees: state.employees.filter(
            employee => employee.id !== action.payload
          )// Elimina el empleado con el ID dado
        }; 
    case SELECT_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: state.employees.find(
          employee => employee.id === action.payload
        )
      };
    case UPDATE_EMPLOYEE:
        return {
          ...state,
          employees: state.employees.map(
            employee => employee.id === action.payload.id ? action.payload : employee
          ),
          //selectedEmployee: null 
          // Actualiza el empleado existente
        };
    case ADD_EMPLOYEE:
        return {
          ...state,
          employees:[...state.employees, action.payload]
        }; // Agrega un nuevo empleado a la lista
    default:
        return state; // Devuelve el estado actual si la acción no coincide
  }
};

export default employeeReducer;
