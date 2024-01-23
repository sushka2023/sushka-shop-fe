import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { itemsSlice } from "../Products/slices/items-slice";
import { authSlice } from "../Auth/slices/auth-slice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["accessTokenn"],
};

const itemsPersistConfig = {
  key: "items",
  storage: storage,
};

const rootReducer = combineReducers({
  items: persistReducer(itemsPersistConfig, itemsSlice.reducer),
  auth: persistReducer(authPersistConfig, authSlice.reducer),
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: storage,
    blacklist: ["auth"],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
  }
})

export const persistor = persistStore(store)
