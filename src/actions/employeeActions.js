import { 
    FETCH_EMPLOYEES, 
    DELETE_EMPLOYEE, 
    SELECT_EMPLOYEE, 
    UPDATE_EMPLOYEE, 
    ADD_EMPLOYEE 
} from './types';

// Obtengo la lista de empleados (en vez de llamar a API)
export const fetchEmployees = () => async dispatch => {
  const employees = [
    { id: 1, firstName: 'Agus', lastName: 'Fassola', email: 'agus@gmail.com', phoneNumber: '3884701452', hireDate: '10-01-2024', salary: 50000 },
    { id: 2, firstName: 'Lara', lastName: 'Valdez', email: 'lara@gmail.com', phoneNumber: '3884085509', hireDate: '22-01-2024', salary: 60000 },
    { id: 3, firstName: 'Nico', lastName: 'Varela', email: 'nico@gmail.com', phoneNumber: '388818378', hireDate: '09-12-2018', salary: 70000 },
  ];

  dispatch({
    type: FETCH_EMPLOYEES,
    payload: employees
  });
};

// Para eliminar un empleado
export const deleteEmployee = id => {
  return {
    type: DELETE_EMPLOYEE,
    payload: id
  };
};

// Para seleccionar un empleado 
export const selectEmployee = employee => {
  return {
    type: SELECT_EMPLOYEE,
    payload: employee
  };
};

// Para actualizar un empleado
export const updateEmployee = employee => {
  return {
    type: UPDATE_EMPLOYEE,
    payload: employee
  };
};

// Para agregar un nuevo empleado
export const addEmployee = employee => {
  return {
    type: ADD_EMPLOYEE,
    payload: employee
  };
}; 