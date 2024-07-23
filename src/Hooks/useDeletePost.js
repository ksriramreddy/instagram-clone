import React, { useState } from 'react';
import useShowToast from './useTost';
import { deleteObject, ref } from 'firebase/storage';
import { firestore, storage } from '../Firebase/Firebase';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import usePostsStore from '../store/postStore';

function useDeletePost() {

    const [isDeleting,setIsDeleting] = useState(false)
    const showToast = useShowToast()
    const demo = useSelector(state=>state.user)
    const authUser = JSON.parse(demo)
    const deletePost = usePostsStore(state=>state.deletePost)
    const deleteUserPost = async (postId) =>{
        // if(isDeleting) return
        setIsDeleting(true)
        try {
            const imageRef = ref(storage,`posts/${postId}`)
            await deleteObject(imageRef)
            const userRef = doc(firestore,'users',authUser.userId)
            await updateDoc(userRef,{posts:arrayRemove(postId)})
            await deleteDoc(doc(firestore,'posts',postId))
            deletePost(postId)
            showToast('Success','Deleted post','success')
            
        } catch (error) {
            showToast('Error',error.message,'error')
            console.log(error.message);
        }
        finally{
            setIsDeleting(false)
        }

    }

  return {
    deleteUserPost,
    isDeleting,
  };
}

export default useDeletePost;
