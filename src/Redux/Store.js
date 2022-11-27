import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slice/couterSlice'

const DataReducer = {
  counter: counterReducer,
}

const store = configureStore({reducer: DataReducer, devTools: process.env.APP_TPE !== "PRODUCTION"})
export default store;