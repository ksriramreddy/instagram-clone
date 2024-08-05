import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/Firebase';
import useShowToast from './useTost';
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/userAccount';

function useLogout() {
    const [signOut, loading, error] = useSignOut(auth);
    const showToast = useShowToast()
    const dispatch = useDispatch()
    const handleLogout = async ()=>{
        try {
            await signOut();
            localStorage.removeItem('userInfo')
            dispatch(clearUser())
        } catch (error) { 
            showToast('Unable to logout',error.message,'error');
            // console.log(error.message);
        }
    }
    return {
        loading,
        handleLogout,
        error
    }
}

export default useLogout;
