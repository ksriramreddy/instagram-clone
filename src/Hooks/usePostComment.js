import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import useShowToast from '../Hooks/useTost'
import firebase from 'firebase/compat/app'
import usePostsStore from '../store/postStore'
import {updateDoc,doc,arrayUnion, DocumentReference} from 'firebase/firestore'
import { firestore } from '../Firebase/Firebase'

function usePostComment() {
    const demo = useSelector(state=>state.user)
    const authUser = JSON.parse(demo)
    const showToast = useShowToast()
    const addComment = usePostsStore(state=>state.addComment)
    const posts = usePostsStore(state=>state.posts)
    const [isCommenting,setIsCommenting] = useState(false)
    const handlePostComment = async (postId,comment)=>{
        if(isCommenting) return
        if(!authUser) return showToast('Error','Please Login before commenting','error')
        setIsCommenting(true)
        const newComment ={
            comment : comment,
            createdAt : Date.now(),
            createdBy : authUser.userId,    
            postId : postId
        } 
        try {
            await updateDoc(doc(firestore,'posts',postId),{
                comments : arrayUnion(newComment)
            })
            addComment(postId,newComment)

        } catch (error) {
            showToast('Error',error.message,'error')
            console.log(error.message);
        }   
        finally{
            setIsCommenting(false)
        }
    }
    
  return {
    isCommenting,handlePostComment
  }
}

export default usePostComment