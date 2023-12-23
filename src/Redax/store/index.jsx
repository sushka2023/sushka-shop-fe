import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { itemsSlice } from "../Products/slices/items-slice";
import { categoriesSlice } from "../Crm-add-new-product/slices/categories-slice";
import { productSlice } from "../Crm-add-new-product/slices/product-slice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["items", "newProduct", "allCategories"],
};

const rootReducer = combineReducers({
  items: itemsSlice.reducer,
  allCategories: categoriesSlice.reducer,
  newProduct: productSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
