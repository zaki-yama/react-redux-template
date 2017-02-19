import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
// eslint-disable-next-line no-underscore-dangle
const __PRODUCTION__ = process.env.NODE_ENV === 'production';

export default function configureStore(initialState) {
  const middlewares = [loggerMiddleware];
  if (!__PRODUCTION__) {
    middlewares.push(loggerMiddleware);
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];
  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancer,
  );

  if (!__PRODUCTION__ && module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      const newRootReducer = require('../reducers').default;
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
}
