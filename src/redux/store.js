import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers'; // Ensure this path is correct
import rootSaga from './sagas'; // Ensure this path is correct
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth', 'cases', 'client', 'contact', 'premises', 'stage', 'task', 'utils'], 
  // stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

// persistor.purge().then(() => {
//   console.log('Persisted Redux state has been purged');
//   alert('State cleared successfully!');
// })

export { store, persistor };
