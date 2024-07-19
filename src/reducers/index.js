import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer';
import selectedEmployeeReducer from './selectedEmployeeReducer';

//combino los reducers en uno solo

export default combineReducers({
    employees: employeeReducer,
    selectedEmployee: selectedEmployeeReducer
});
