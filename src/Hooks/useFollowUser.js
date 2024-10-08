import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useId,useState } from 'react';
import { useSelector } from 'react-redux';
import { firestore } from '../Firebase/Firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userAccount';
import useProfilePage from './useProfilePage';
import useShowToast from './useTost';
function useFollowUser(userId) {
    const [isUpdating,setIsUpdating] = useState(false);
    const [isFollowing,setIsFollowing] = useState(false);
    const demoUser = useSelector(state=>state.user)
    const user = JSON.parse(demoUser)
    const showToast = useShowToast()
    // console.log(user)
    const {userProfile} = useProfilePage(user.username)
    const dispatch = useDispatch()

    useEffect(()=>{
        // if(!userId) return;
        if(userProfile){
            const  isFollowing = userProfile.following.includes(userId)
            // console.log('authusre',userProfile);
            setIsFollowing(isFollowing)
        }
        // console.log(isFollowing);
    },[userProfile,useId])
    
    const handleFollowUser = async ()=>{
        setIsUpdating(true)
        try {  
            const currentUserRef = doc(firestore,'users',userProfile.userId)
            const userToFollowOrUnfollow = doc(firestore,'users',userId)
            // console.log(userToFollowOrUnfollow);
            await updateDoc(currentUserRef,{
                following : isFollowing? arrayRemove(userId) : arrayUnion(userId)
            })
            
            await updateDoc(userToFollowOrUnfollow,{
                followers : isFollowing? arrayRemove(userProfile.userId) : arrayUnion(userProfile.userId)
            })
            if(isFollowing){
                dispatch(setUser(
                    JSON.stringify({
                        ...userProfile,
                        following : userProfile.following.filter(uid => uid!=userId)
                    })
                ))
                localStorage.setItem('userInfo',JSON.stringify({
                    ...userProfile,
                    following : userProfile.following.filter(uid => uid!=userId)
                }))
                setIsFollowing(false)
            }
            else{
                dispatch(setUser(
                    JSON.stringify({
                        ...userProfile,
                        following : [...userProfile.following,userId]
                    })
                ))
                localStorage.setItem('userInfo',JSON.stringify({
                    ...userProfile,
                    following : [...userProfile.following,userId]
                }))
                setIsFollowing(true)
            }
        } catch (error) {
            // console.log("follow",error.message);
            showToast("Unable to follow/unfollow",error.message,'error')
        }
        finally{
            setIsUpdating(false)
        }
    }

    
    return{
        isFollowing,
        isUpdating,
        handleFollowUser
    }
}

export default useFollowUser;