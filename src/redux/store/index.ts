import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { itemsSlice } from '../products/slice'
import { authSlice } from '../authentication/slice'
import { productSlice } from '../crm-product/createSlice/product'
import { categoriesSlice } from '../crm-product/createSlice/categories'
import { reviewsReducer } from '../feedbacks/slice'
import { basketItemCountSlice } from '../basket-item-count/slice'
import { pricesSlice } from '../crm-product/editSlice/editPrice'

const AUTH_PERSIST_CONFIG = {
  key: 'auth',
  storage: storage,
  whitelist: ['accessToken']
}

const ALL_CATEGORIES_PERSIST_CONFIG = {
  key: 'allCategories',
  storage: storage
}

const rootReducer = combineReducers({
  items: itemsSlice.reducer,
  auth: persistReducer(AUTH_PERSIST_CONFIG, authSlice.reducer),
  newProduct: productSlice.reducer,
  allCategories: persistReducer(
    ALL_CATEGORIES_PERSIST_CONFIG,
    categoriesSlice.reducer
  ),
  reviews: reviewsReducer,
  basketCount: basketItemCountSlice.reducer,
  editProduct: pricesSlice.reducer
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: storage,
    blacklist: ['auth', 'newProduct', 'items']
  },
  rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
  }
})

export const persister = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
