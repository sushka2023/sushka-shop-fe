import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { itemsSlice } from '../Products/slices/items-slice'
import { categoriesSlice } from '../Crm-add-new-product/slices/categories-slice'
import { productSlice } from '../Crm-add-new-product/slices/product-slice'
import { authSlice } from '../Auth/slices/auth-slice'

const AUTH_PERSIST_CONFIG = {
  key: 'auth',
  storage: storage,
  whitelist: ['accessTokenn']
}

const ITEMS_PERSIST_CONFIG = {
  key: 'items',
  storage: storage
}

const PRODUCT_PERSIST_CONFIG = {
  key: 'newProduct',
  storage: storage
  // blacklist: ['items', 'newProduct', 'allCategories']
}

const ALL_CATEGORIES_PERSIST_CONFIG = {
  key: 'allCategories',
  storage: storage
}

const rootReducer = combineReducers({
  items: persistReducer(ITEMS_PERSIST_CONFIG, itemsSlice.reducer),
  auth: persistReducer(AUTH_PERSIST_CONFIG, authSlice.reducer),
  newProduct: persistReducer(PRODUCT_PERSIST_CONFIG, productSlice.reducer),
  allCategories: persistReducer(
    ALL_CATEGORIES_PERSIST_CONFIG,
    categoriesSlice.reducer
  )
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: storage,
    blacklist: ['auth']
  },
  rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
  }
})

export const persistor = persistStore(store)
