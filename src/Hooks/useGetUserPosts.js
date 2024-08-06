import { useShortcut } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useShowToast from './useTost';
import { useDispatch, useSelector } from 'react-redux';
import usePostsStore from '../store/postStore'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Firebase/Firebase';
import { useParams } from 'react-router-dom';


function useGetUserPosts(userId) {
    const [isLoading, setIsLoading] = useState(false)
    const showToast = useShowToast()
    const demo = useSelector(state=>state.user)
    const authUser = JSON.parse(demo)
    const dispatch = useDispatch()
    // const posts = useSelector(state => state.posts)
    const setPosts = usePostsStore(state=>state.setPosts)
    //////////
    // const {username} = useParams()
    // console.log("username",username);
    
    
    //////////
    const posts = usePostsStore()
    useEffect(()=>{
        const getPosts = async()=>{
            if(!authUser) return
            setIsLoading(true)
            setPosts([])
            try {
             const q = query(collection(firestore,'posts'),where('createdBy','==',authUser.userId==userId? authUser.userId : userId))
             const querySnapshot = await getDocs(q)   
             const posts = []
             querySnapshot.forEach((doc)=>{
                 posts.push({...doc.data(), id: doc.id })
             })
             posts.sort((a,b)=>{a.createdAt - b.createdAt})
            //  dispatch(setPosts(posts))
            setPosts(posts)
            //  console.log('kj',posts);
            } catch (error) {
                showToast('Unable to get posts: ',error.message,'error')
                setPosts([])
            }
            finally{
                setIsLoading(false)
            }
        }
        getPosts()
    },[setPosts])
  return {isLoading};
}
export default useGetUserPosts;
