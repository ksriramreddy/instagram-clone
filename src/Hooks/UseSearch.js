import React, { useState } from 'react';
import useShowToast from './useTost';
import { collection, Firestore, getDocs, query, where } from 'firebase/firestore'
import {firestore} from '../Firebase/Firebase'
// import {} from '../Hooks/useTost'
function UseSearch() {
    const [isLoading,setIsLoading] = useState(false)
    const [user , setUser] = useState(null)
    const ShowToast = useShowToast()

    const getUserProfile = async (username)=>{
        try {
            const q = query(collection(firestore,'users'),where('username','==',username))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc)=>{
                setUser(doc.data())
            })
        } catch (error) {
            ShowToast("Error",error.message,'error')
            console.log(error.message);
        }
        finally{
            setIsLoading(false)
        }
    }
    return{isLoading,user,getUserProfile,setUser}
}

export default UseSearch;
