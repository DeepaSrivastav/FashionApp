import { configureStore } from '@reduxjs/toolkit'
import productReducer from './products/productSlice'
import cartReducer from './cart/cartSlice'
// import { persistStore,persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
// import { combineReducers} from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
import ordersApi from './orders/ordersApi';

// const persistConfig = {
//   key:"root",
//   version: 1,
//   storage
// };

// const reducer = combineReducers({
//   cart: cartReducer,
//   product:productReducer,

// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer:{
//     [ordersApi.reducerPath]:ordersApi.reducer,
//     persistedReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck:false
//     // {
//     //   ignoredActions:[FLUSH,REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     // }
//   })
  
// })

// export const persistor = persistStore(store)

export const store = configureStore({
  reducer:{
    cart: cartReducer,
    product: productReducer,
    [ordersApi.reducerPath]:ordersApi.reducer
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}).concat(ordersApi.middleware)
})