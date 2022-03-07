import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import productsReducer from './products/products.reducer';


const middlewares = [thunk];

const rootReducer = combineReducers({
  products: productsReducer,
});

export default function configureStore (preloadedState, reducers = rootReducer) {
  const store = createStore(reducers, preloadedState, applyMiddleware(...middlewares));

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./store', () => store.replaceReducer(reducers));
  }

  return store;
}
