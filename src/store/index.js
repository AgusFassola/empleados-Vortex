import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from '../reducers';


const initialState= {};
const middleware = [thunk];

// Creamos el store de Redux y aplicamos middleware thunk para manejar acciones asíncronas
const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware));

export default store;
