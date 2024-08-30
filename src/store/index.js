import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../reducers/employeeSlice';
import usersSlice from '../reducers/usersSlice';
import positionSlice from '../reducers/positionSlice';

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    users: usersSlice,
    positions: positionSlice
  }
});

export default store;
