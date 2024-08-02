import { Avatar, Box, Button, Flex ,VStack} from '@chakra-ui/react';
import React, { useState } from 'react';
import useFollowUser from '../Hooks/useFollowUser'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const SuggestedUser = ({user,onClose,setUser}) => {
  const demo = useSelector(state=>state.user)
  const authUser = JSON.parse(demo)
  const [isFollowed,setIsFollowed] = useState(false)
  const {isFollowing,isUpdating,handleFollowUser} = useFollowUser(user.userId)

  const dispatch = useDispatch()
  const onFollowUser = async ()=>{
    await handleFollowUser()
    // setUser({
    //   ...user,
    //   followers : isFollowing? user.followers.filter((follower)=>follower!==authUser.userId) : [authUser.userId,...user.followers]
    // })

  }
  return (
    <Flex key={user.userId} justifyContent={'space-between'} alignItems={'center'} w={'full'}
    >
      {/* <Link to={`/${user.username}`}> */}
      <Flex alignItems={  'center'} gap={2}>
        
        <Avatar src={user.profilePicUrl}/>
        <VStack alignItems={'flex-start'}>
          <Box fontSize={12} fontWeight={'bold'}>
            {user.fullname}
          </Box>
          <Box fontSize={11} fontWeight={'bold'} color={'gray.500'}>
            {user.followers.length} follower
          </Box>
        </VStack>
      </Flex>
      {/* </Link> */}

      {
        authUser.userId !== user.userId &&
        <Button
      fontSize={13}
      bg={'transparent'}
      p={0}
      h={'max-content'}
      cursor={'pointer'}
      color={'blue.500'}
      _hover={{color:'white'}}
      isLoading={isUpdating}
      onClick={onFollowUser}
      >
          {
            isFollowing? "Following" : "Follow"   
          }   
        </Button>
      }
    </Flex>
  );
}

export default SuggestedUser;
