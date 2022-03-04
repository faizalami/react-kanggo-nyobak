import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import productsReducer from './products/products.reducer';

const rootReducer = combineReducers({
  products: productsReducer,
});

export default function configureStore (preloadedState) {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./store', () => store.replaceReducer(rootReducer));
  }

  return store;
}
