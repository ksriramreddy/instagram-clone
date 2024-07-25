import React, { useEffect, useState } from 'react';
import useShowToast from './useTost';
import {getDoc,doc, Firestore} from 'firebase/firestore';
import {firestore} from '../Firebase/Firebase'

function useGetProfileById(userId) {
    const [isLoading,setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const showToast = useShowToast();
    useEffect(()=>{
        const getProfile = async ()=>{
            setIsLoading(true)
            setUserProfile(null)
            try {
                const userRef = doc(firestore, 'users', userId);
                const userDoc = await getDoc(userRef);
                if (!userDoc.exists()) {
                    showToast('Error','UserNotFound','error');
                    return;
                }
                setUserProfile(userDoc.data());
            } catch (error) {
                showToast('Error',error.message,'error');
            }finally{
                setIsLoading(false);
            }
        }
        getProfile()
    },[userId,setUserProfile,showToast])
    return { isLoading, userProfile };
}

export default useGetProfileById;
