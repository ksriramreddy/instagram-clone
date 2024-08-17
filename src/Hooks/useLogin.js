import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../Firebase/Firebase';
import useShowToast from './useTost';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userAccount';


function useLogin() {
    const dispatch = useDispatch()
    const [
        signInWithEmailAndPassword,
        user,
        error,
      ] = useSignInWithEmailAndPassword(auth);
      const [isLoading,setIsLoading] = useState(false)
      const showToast = useShowToast()
    const userLogin = async (inputs)=>{
        // console.log(inputs);
        if(!inputs.email ||!inputs.password){
            showToast("Enter all required fields","Enter all required fields",'error')
            return;
        }
        try {
            setIsLoading(true)
            const user = await signInWithEmailAndPassword(inputs.email,inputs.password);
            if(!user && error){
                showToast("error",error.message,'error')
                return
            }
            if(user){
                showToast("success","Logged in successfully",'success')
                console.log('avav');
                const userRef = doc(firestore,'users',user.user.uid)
                const userDoc = await getDoc(userRef)
                console.log("users data"+userDoc.data());
                dispatch(setUser(JSON.stringify(userDoc.data())))
                console.log('kjbk',JSON.stringify(userDoc.data()));
                localStorage.setItem('userInfo',JSON.stringify(userDoc.data()))
            }
        } catch (error) {
            showToast("Unable to login")
            // console.log(error.message);
        }
        finally{
            setIsLoading(false)
        }
    }
    return {isLoading,userLogin,user}
}

export default useLogin;
