import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import CounterStore from './stores/counter-store';

export default apolloClient =>
  combineReducers({
    CounterStore,
    apollo: apolloClient.reducer(),
    router: routerReducer
  });
