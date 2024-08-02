import { Avatar, Flex,Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useGetProfileById from '../Hooks/useGetProfileById'
import { timeAgo } from '../utils/timeAgo'
import { useSelector } from 'react-redux'

function Caption({post}) {
    const demo = useSelector(state=>state.user)
    const authUser = JSON.parse(demo)
  return (
   <Flex gap={4}> 
    <Link to={`/${authUser?.username}`}>
        <Avatar  src={authUser?.profilePicUrl} name={authUser?.username} size={'sm'}/>
    </Link>
    <Flex direction={'column'}>
        <Flex gap={2} >
            <Text fontWeight={'bold'} fontSize={12}>{authUser?.username}</Text>
            <Text fontSize={14}>{post.caption}</Text>
        </Flex>
        <Text fontSize={12} color={'gray'}>
            {timeAgo(post.createdAt)}
        </Text>
    </Flex>
   </Flex>
  )
}

export default Caption