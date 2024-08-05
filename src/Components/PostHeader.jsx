import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import useGetProfileById from '../Hooks/useGetProfileById';
import {timeAgo} from '../utils/timeAgo'
import { useSelector } from 'react-redux';
import useFollowUser from '../Hooks/useFollowUser';
import { Link } from 'react-router-dom';
function PostHeader({createdBy,createdAt}) {
    const {isLoading,userProfile} = useGetProfileById(createdBy)
    const [toLoad,setToLoad] = useState(1)
    const demo = useSelector(state=>state.user);
    const authUser = JSON.parse(demo);
    const {isFollowing,isUpdating,handleFollowUser} = useFollowUser(userProfile?.userId)
    // console.log(isFollowing);
    const handleClickFollow = async ()=>{
        await handleFollowUser()
        this.forceUpdate()
    }

  return (
    <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'} mb={2}>
        <Flex alignItems={'center'} gap={2}>
            <Link to={`/${userProfile?.username}`}>
            <Avatar src={userProfile?.profilePicUrl } alt={'pic'} size={'sm'} />
            </Link>
            <Flex fontSize={12} fontWeight={'bold'} gap={2}>
                <Text>
                <Link to={`/${userProfile?.username}`}>
                {userProfile?.fullname }
                </Link>
                </Text>
                <Box color={'gray.500'}>
                    {
                        // new Date(createdAt).toLocaleString('en-US', {
                        //     year: 'numeric',
                        //     month: 'long',
                        //     day: 'numeric',
                        //     hour: 'numeric',
                        //     minute: 'numeric',
                        //     second: 'numeric'
                        // })
                        timeAgo(createdAt)
                    }
                </Box>
            </Flex>
        </Flex>
        <Box cursor={'pointer'} _loading={isUpdating} onClick={handleClickFollow}>
            <Text fontSize={12}
            color={'blue.500'}
            fontWeight={'bold'}
            _hover={{
                color:'white'
            }}
            transition={'0.2s ease-in-out'}
            
            >
                {
                    isFollowing? 'Unfollow' : 'Follow'
                }

            </Text>
        </Box>
    </Flex>
  );
}

export default PostHeader;
