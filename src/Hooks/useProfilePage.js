import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../Firebase/Firebase';

export default function useProfilePage(username) {
    const [isLoading,setIsLoading] = useState(true)
    const [userProfile,setUserProfile] = useState(null);
    const getUserProfile =  async()=>{
        try {
            // console.log('username',username);
            const q = query(collection(firestore,'users'),where('username','==',username))
            const querySnapshot = await getDocs(q)
            // console.log('bi',querySnapshot.docs[0].data());
            setUserProfile(querySnapshot.docs[0].data())
            setIsLoading(false)
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        setIsLoading(true);
        getUserProfile()
    },[])

    return {isLoading,userProfile}
}
