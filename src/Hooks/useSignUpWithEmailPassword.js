import React from 'react';
import { auth, firestore } from '../Firebase/Firebase';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { Firestore, doc, setDoc } from 'firebase/firestore';
import useShowToast from './useTost';
import {useSelector,useDispatch} from 'react-redux'
import {setUser} from '../store/userAccount'
import { collection, query, where, getDocs } from "firebase/firestore";
function useSignUpWithEmailPassword() {
    const dispatch = useDispatch()
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
      const showToast = useShowToast()
    const signUp = async (inputs)=>{
        if(!inputs.username || !inputs.password || !inputs.email || !inputs.fullname){
            showToast("Enter all required fields","Enter all required fields",'error')
            return;
        }
        const q = query(collection(firestore, "users"), where('username', "==", inputs.username));
        const querySnapshot = await getDocs(q);
        console.log("querySnapshot", querySnapshot);
        if(!querySnapshot.empty){
            showToast("Username already exists","Username already exists",'error')
            // console.log('user already exists');
            return;
        }
        try {
            
            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password)
            if(!newUser && error){
                showToast("Unable to create accoount",error.message,'error')
                showToast("please try again",error.message,'error')
                return
            }
            if(newUser){
                const userDoc = {
                    userId : newUser.user.uid,
                    email:newUser.user.email,
                    username: inputs.username,
                    fullname: inputs.fullname,
                    profilePicUrl:'',
                    bio:'',
                    followers:[],
                    following:[],
                    createdAt : Date.now(),
                    posts : []
                }
                await setDoc(doc(firestore,"users",newUser.user.uid),userDoc)
                localStorage.setItem("userInfo",JSON.stringify(userDoc))
                dispatch(setUser(userDoc))
            }
            showToast("Account created successfully",error,'success')
        } catch (error) {
            showToast("Unable to create Account",error,'error')
        }
    }
    return {loading,error,signUp}
}

export default useSignUpWithEmailPassword;
