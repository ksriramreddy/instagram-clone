import {configureStore   } from '@reduxjs/toolkit'
import{userReducer} from '../store/userAccount'
export const store = configureStore({
    reducer:userReducer
})