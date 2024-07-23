import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../reducers/employeeSlice';

const store = configureStore({
  reducer: {
    employeeData: employeeReducer
  }
});

export default store;
