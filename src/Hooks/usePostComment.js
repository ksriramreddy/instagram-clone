import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function usePostComment() {
    const demo = useSelector(state=>state.user)
    const authUser = JSON.parse(demo)
    const [isCommenting,setIsCommenting] = useState(false)
    if(!authUser){
        window.alert("Please Login to Comment")
        return
    }
    try {
        setIsCommenting(true)
        
        
    } catch (error) {
        
    }
    const postComment = (postId,comment)=>{
        const comment ={
            comment : comment,
            createdAt : Date.now(),
            createdBy : authUser.userId,    
            postId : postId
        }
    }
  return (
1
)
}

export default usePostComment