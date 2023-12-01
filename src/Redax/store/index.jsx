import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { itemsSlice } from "../Products/slices/items-slice";
import regReducer from "../Auth/slices/reg-slice";
import authReducer from "../Auth/slices/auth-slice";
import userReducer from "../User/slices/user-slice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["items"],
};

const rootReducer = combineReducers({
  items: itemsSlice.reducer,
  reg: regReducer,
  auth: authReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

