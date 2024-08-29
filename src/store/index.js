import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../reducers/employeeSlice';
import usersSlice from '../reducers/usersSlice';

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    users: usersSlice
  }
});

export default store;
