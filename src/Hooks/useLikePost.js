import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { firestore } from '../Firebase/Firebase';
import useShowToast from './useTost';
import {arrayRemove,arrayUnion,doc,updateDoc} from 'firebase/firestore'

function useLikePost(post) {
    const demo = useSelector(state=>state.user)
    const authUser = JSON.parse(demo)
    const showToast = useShowToast()
    const [isLiked, setIsLiked] = useState(post.likes.includes(authUser.userId))
    const [likesCount, setLikesCount] = useState(post.likes.length)
    const [isUpdating, setIsUpdating] = useState(false);
    const handleLikePost = async () => {
        try {
            setIsUpdating(true)
        //     if(isLiked){
        //         setIsLiked(p=>!p);
        //         setLikesCount(p=>p-1);
        //         await updateDoc(doc(firestore,'posts',post.Id),{
        //             likes: arrayRemove(authUser.userId)
        //         })  
        //         console.log('postId',post.id);
        // }
        // else{
        //     setIsLiked(p=>!p);
        //     setLikesCount(p=>p+1);
        //     await updateDoc(doc(firestore,'posts',post.Id),{
        //         likes: arrayUnion(authUser.userId)
        //     })
        // }
        const ref = doc(firestore,'posts',post.id);
        await updateDoc(ref, {
            likes: isLiked? arrayRemove(authUser.userId) : arrayUnion(authUser.userId)
        });
        setIsLiked(isLiked? false : true);
        setLikesCount(isLiked? likesCount - 1 : likesCount + 1);
       } catch (error) {
        showToast('unable to like/unlike',error.message,'error')
        // console.log(error.message);
       }
       finally{
        setIsUpdating(false)
       }
    }
  return {
    isLiked,
    likesCount,
    handleLikePost
  }
}

export default useLikePost;
