import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/themeSlice';

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const psersistedReducer = persistReducer(persistConfig, rootReducer); 

export const store = configureStore({
     reducer: psersistedReducer,
     middeware: (getDefaultMiddleware) => 
         getDefaultMiddleware({ serializableCheck: false }),
     
});

export const persistor = persistStore(store);

