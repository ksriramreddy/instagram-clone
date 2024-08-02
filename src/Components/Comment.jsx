import { Avatar, Flex,Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useGetProfileById from '../Hooks/useGetProfileById'
import { timeAgo } from '../utils/timeAgo'

function Comment({comment}) {
    const {isLoadind,userProfile} = useGetProfileById(comment.createdBy)
    // console.log('userProfile',userProfile);
  return (
   <Flex gap={4} _loading={isLoadind}> 
    <Link to={`/${userProfile?.username}`}>
        <Avatar  src={userProfile?.profilePicUrl} name={userProfile?.username} size={'sm'}/>
    </Link>
    <Flex direction={'column'}>
        <Flex gap={2} >
            <Text fontWeight={'bold'} fontSize={12}>{userProfile?.username}</Text>
            <Text fontSize={14}>{comment.comment}</Text>
        </Flex>
        <Text fontSize={12} color={'gray'}>
            {timeAgo(comment.createdAt)}
        </Text>
    </Flex>
   </Flex>
  )
}

export default Comment