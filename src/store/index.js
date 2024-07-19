import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from '../reducers';

// Creamos el store de Redux y aplicamos middleware thunk para manejar acciones asíncronas
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
