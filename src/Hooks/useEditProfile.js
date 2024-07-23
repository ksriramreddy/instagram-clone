import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { firestore, storage } from '../Firebase/Firebase';
import {useDispatch} from 'react-redux'
import useShowToast from './useTost';
import { setUser } from '../store/userAccount';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

function useEditProfile()  {
    const dispatch = useDispatch()
    const showToast = useShowToast()
    const [isUpdating,setIsUpdating] = useState(false)
    const setUserDetails = async (authUser,profileDetails,selectedImage,onClose)=>{
        if(isUpdating) return;
        const storageRef = ref(storage,`profilePics/${authUser.userId}`)
        const userRef = doc(firestore,'users',authUser.userId)
        // console.log('authUser',authUser);
        // console.log('user info',(await getDoc(userRef)).data());
        
        setIsUpdating(true)
        try {
            let URL = ""
            if(selectedImage){
                await uploadString(storageRef,selectedImage,'data_url');
                URL = await getDownloadURL(storageRef)
            }

            const updatedUser = {
                ...authUser,
                fullname:profileDetails.fullname,
                username:profileDetails.username,
                bio:profileDetails.bio,
                profilePicUrl: URL || authUser.profilePicUrl
            }
            await updateDoc(userRef,updatedUser)
            localStorage.setItem("userInfo",JSON.stringify(updatedUser))
            dispatch(setUser(JSON.stringify(updatedUser)))
            showToast('success' , 'Updated Successfully','success')
            onClose()
            setIsUpdating(false)

        } catch (error) {
            console.log(error.message);
            showToast("error",error.message,'error')
        }
    }
    return {setUserDetails,isUpdating}
}

export default useEditProfile;
