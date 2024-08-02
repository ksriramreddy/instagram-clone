import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useShowToast from './useTost';
import { auth, firestore } from '../Firebase/Firebase';
import {getDocs,collection,where,query} from 'firebase/firestore'
import useGetProfileById from './useGetProfileById';

function useGetFeedPosts() {
    const [isFetching,setIsLoding] = useState(true);
    const [feedPosts, setFeedPosts] = useState(null);
    const demo = useSelector(state=>state.user);
    const authUser = JSON.parse(demo);
    const showToast = useShowToast()
   
    useEffect(()=>{
        console.log("following ",authUser.following);
        const getFeedPosts = async ()=>{
            setIsLoding(true);
            if(!authUser) return showToast('Error',"Login before seeing feeds",'error');
            if(authUser.following == 0) {
                setFeedPosts([]);
                setIsLoding(false);
                return;
            }
            const colloc = collection(firestore,"posts");
            const wher = where('createdBy','in',authUser.following)
            const q =  query(colloc,wher);
            try {
                
            const querySnapshot = await getDocs(q)
            // console.log(querySnapshot.size);
            const posts = [];
            querySnapshot.forEach(doc=>{
                posts.push({id:doc.id,...doc.data()})
            })
            // console.log(posts);
            // posts.map(post=>{console.log(post);})
            setFeedPosts(posts.sort((a,b)=>b.createdAt - a.createdAt))

            } catch (error) {
                showToast('Error',error.message,'error')
                console.log(error.message);
            }
            finally{
                setIsLoding(false)
            }
        }
        getFeedPosts();
        // console.log(feedPosts);
    },[])
  return{
    isFetching,
    feedPosts
  }
  ;
}

export default useGetFeedPosts;
