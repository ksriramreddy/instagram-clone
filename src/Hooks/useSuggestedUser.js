import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth, firestore } from '../Firebase/Firebase';
import useShowToast from './useTost';

function useSuggestedUser() {
    const [isLoading,setIsLoading] = useState(true)
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const demo = useSelector(state => state.user)
    const authUser = JSON.parse(demo)
    const showTost = useShowToast()

    useEffect(() => {
        const getSuggestedUsers = async()=>{
            const follwingUsers = authUser.following
            // console.log(follwingUsers);
            setIsLoading(true)
            try {
                const userRef =  collection(firestore,'users')
                const q = query(userRef,where('userId','not-in',[authUser.userId , ...authUser.following]),limit(5))
                const querySnapshot = await getDocs(q)
                let users = [];
                querySnapshot.forEach((doc)=>{
                    users.push({...doc.data(), userId: doc.id })
                })
                
                // console.log(users);
                setSuggestedUsers(users)
            } catch (error) {
                showTost('Unable to load suggested users',error.message,'error')
                // console.log(error.message);
            }
            finally{
                setIsLoading(false)
            }
        }
        getSuggestedUsers()
    }, [])



    return{
        suggestedUsers,
        isLoading,
    }

}

export default useSuggestedUser;
