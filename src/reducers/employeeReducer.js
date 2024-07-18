import{
    CREATE_EMPLOYEE,
    FETCH_EMPLOYEES,
    FETCH_EMPLOYEE,
    DELETE_EMPLOYEE, 
    EDIT_EMPLOYEE
} from '../actions/types';

//se define el estado inicial del reducer de empleados
const initialState = {
    employees:[]//el arreglo de empleados empieza vacío
};

//Desarrollo del reducer de empleados

export default (state = initialState, action) => {
    switch (action.type){
        case FETCH_EMPLOYEES:
            //al obtener todos los empleados, actualiza el estado con la lista recibida
            return{...state, employees: action.payload};
        case FETCH_EMPLOYEE:
            //obtiene un solo empleado y lo agrega
            return{...state, employee: action.payload};
        case CREATE_EMPLOYEE:
            //Crea un nuevo empleado y lo agrega a la lista
            return{...state, employees: [...state.employees, action.payload]};
        case EDIT_EMPLOYEE:
                //edita un empleado y actualiza la lista de empleados
            return {
                  ...state,
                  employees: state.employees.map(emp =>
                    emp.EMPLOYEE_ID === action.payload.EMPLOYEE_ID ? action.payload : emp
                  )
                };
        case DELETE_EMPLOYEE:
                //elimina un empleado de la lista
            return {
                  ...state,
                  employees: state.employees.filter(emp => emp.EMPLOYEE_ID !== action.payload)
                };
        default:
                //sino retorna el estado actual
            return state;
    }
}