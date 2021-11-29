import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { applyMiddleware, createStore, compose } from 'redux'
import rootReducer  from './redux'

const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    let store = createStore(persistedReducer, composeEnhancers())
    let persistor = persistStore(store)
    return { store, persistor }
}