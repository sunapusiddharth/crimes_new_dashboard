import thunk from 'redux-thunk';
import {createStore,applyMiddleware,compose} from 'redux';
import rootReducer from './../reducers/rootReducer';
// import {loadState,saveState} from './localStorage';


// const persistedState = loadState();
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
    // persistedState,
);


// store.subscribe(()=>{
//   saveState(store.getState());
// })
export default  store;