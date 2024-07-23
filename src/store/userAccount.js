import {createSlice,} from '@reduxjs/toolkit'

const initialState ={
    user: localStorage.getItem('userInfo')
}

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        setUser : (state,action)=>{
            state.user = action.payload
        },
        clearUser : (state)=>{
            state.user = null
        }
        // addPost : (state,action)=>{
        //     state.user.posts.unshift(action.payload)
        // }
    }
})

export const {setUser,clearUser} = userSlice.actions
export const userReducer = userSlice.reducer