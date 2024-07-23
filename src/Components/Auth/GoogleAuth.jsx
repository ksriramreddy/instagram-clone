import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { auth, firestore } from '../../Firebase/Firebase';
import useShowToast from '../../Hooks/useTost';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {useDispatch} from 'react-redux'
import { setUser } from '../../store/userAccount';
function GoogleAuth({prefix}) {
  const dispatch = useDispatch()
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showTost = useShowToast()
  const handleSignInWithGoogle = async () => {
    try {
      const newUser = await signInWithGoogle()
      if(!newUser && error){
        showTost('Error', error,'error');
        console.log(error);
        return;
      }
      const newUserRef = doc(firestore,'users',newUser.user.uid)
      const newUserSnap = await getDoc(newUserRef)
      if(newUserSnap.exists()){
        const userDoc = newUserSnap.data()
        localStorage.setItem('userInfo',JSON.stringify(userDoc))
      }else{
        const userDoc = {
            userId : newUser.user.uid,
            email:newUser.user.email,
            username: newUser.user.email.split('@')[0],
            fullname: newUser.user.displayName,
            profilePicUrl:newUser.user.photoURL,
            bio:'',
            followers:[],
            following:[],
            createdAt : Date.now(),
            posts : []
        }
        await setDoc(doc(firestore,"users",newUser.user.uid),userDoc)
        localStorage.setItem("userInfo",JSON.stringify(userDoc))
        dispatch(setUser(JSON.stringify(userDoc)))
    }
    } catch (error) {
      showTost('Error', error.message,'error');
      console.log(error);
    }
  }
  return (
    <>
      <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'} onClick={handleSignInWithGoogle}>
          <Image src='/google.png' width={5} alt='google'/>
          <Text mx={2} color={'blue.500'}>
            {prefix} with Google
          </Text>
        </Flex>
    </>
  );
}

export default GoogleAuth;
