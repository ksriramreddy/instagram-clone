import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../Firebase/Firebase';

export default function useProfilePage(username) {
    // console.log("abcd",username);
    
    const [isLoading,setIsLoading] = useState(true)
    const [userProfile,setUserProfile] = useState(null);
    const getUserProfile =  async()=>{
        try {
            // console.log('username',username);
            const q = query(collection(firestore,'users'),where('username','==',username))
            const querySnapshot = await getDocs(q)
            // console.log('bi',querySnapshot.docs[0].data());
            setUserProfile(querySnapshot.docs[0].data())
            
            
        } catch (error) {
            console.log(error.message);
        }
        finally{
            setIsLoading(false)
            // console.log("kajsnx",userProfile);
            
        }
    }
    useEffect(()=>{
        setIsLoading(true);
        getUserProfile()
    },[])

    return {isLoading,userProfile}
}
