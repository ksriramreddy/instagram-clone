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

            if (querySnapshot.empty) return setUserProfile(null);

				let userDoc;
				querySnapshot.forEach((doc) => {
					userDoc = doc.data();
				});

				setUserProfile(userDoc);
            // console.log('bi',querySnapshot.docs[0].data());
            // setUserProfile(querySnapshot.docs[0].data())
            
            console.log("kajsnx",userDoc);
            
        } catch (error) {
            console.log(error.message);
        }
        finally{
            setIsLoading(false)
            
        }
    }
    useEffect(()=>{
        setIsLoading(true);
        getUserProfile()
    },[username])

    return {isLoading,userProfile}
}
