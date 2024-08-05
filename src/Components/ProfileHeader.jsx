import { Avatar, AvatarGroup, Button, Flex, SkeletonCircle, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import EditProfile from './EditProfile';
import useFollowUser from '../Hooks/useFollowUser';
import {useParams} from 'react-router-dom'
function ProfileHeader({userProfile,isLoading}) {
    let authUser = useSelector(state=>state.user)
    // console.log(userProfile);
    
    authUser = JSON.parse(authUser)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {isFollowing,isUpdating,handleFollowUser}= useFollowUser(userProfile.userId)
    // console.log('is following',isFollowing);
    const isEditable = authUser && authUser.username == userProfile.username
    const isFollow = authUser && authUser.username != userProfile.username
    if(isLoading){
        return headerLoading()
    }
    const [updateProfile,setUpdateProfile] = useState(false)
  return (
    <Flex gap={{base:4,sm:10}}
    py={10} direction={{base:'column',sm:'row'}}>
        <AvatarGroup 
        size={{base:'xl',md:'2xl'}}
        justifySelf={'center'}
        alignSelf={'flex-start'}
        mx={'auto'}
        >
            <Avatar src={`${userProfile.profilePicUrl}`} alt={'sriram'}/>
        </AvatarGroup>
        <VStack alignItems={'start'}
            gap={2} mx={'auto'} flex={1} >
                <Flex gap={4} direction={{base:'column',sm:'row'}}
                justifyContent={{base:'center' , sm:'flex-start'}} alignItems={'center'} w={'full'}>
                    <Text fontSize={{base:'small',md:'large'}}>
                        {userProfile.username}
                    </Text>
                    {
                        isEditable && <Flex fontSize={{base:'sm',md:'lg'}}
                        justifyContent={'center'}>
                            <Button bg={'white'} color={'black'} _hover={{bg:'whiteAlpha.800'}} size={{base:'xs',md:'sm'}} onClick={onOpen} >
                                Edit Profile
                            </Button>
                        </Flex>
                    }
                    {
                        isFollow && <Flex fontSize={{base:'sm',md:'lg'}}
                        justifyContent={'center'}>
                            <Button bg={'blue.500'} color={'white'} _hover={{bg:'white',color:'blue.500'}} size={{base:'xs',md:'sm'}} onClick={handleFollowUser} isLoading={isUpdating} >
                                {
                                    isFollowing? 'unfollow' : 'follow'
                                }
                            </Button>
                        </Flex>
                    }
                </Flex>
                <Flex alignItems={'center'} gap={{base:2,md:4}}>
                    <Text fontSize={{base:'xs',md:'sm'}}>
                        <Text as={'span'} fontWeight={'bold'} mr={1}>
                        {userProfile.posts.length}
                        </Text>
                        Posts
                        </Text>
                    <Text fontSize={{base:'xs',md:'sm'}} >
                        <Text as={'span'} fontWeight={'bold'} mr={1}>
                        {userProfile.followers.length}
                        </Text>
                        Followers
                    </Text>
                    <Text fontSize={{base:'xs',md:'sm'}}>
                        <Text as={'span'} fontWeight={'bold'} mr={1}>
                            {userProfile.following.length}
                        </Text>Following
                    </Text>
                </Flex>
                <Flex>
                    <Text alignItems={'center'} gap={3} fontSize={'bold'}>
                    {userProfile.fullname}
                    </Text>
                </Flex>
                <Text alignItems={'center'} gap={3} fontSize={'bold'}>
                    {userProfile.bio}
                    </Text>
            </VStack>
            {
                isOpen && <EditProfile onClose={onClose}  authUser={authUser} />
            }
    </Flex>
  );
}

export default ProfileHeader;

function headerLoading() {
  return (
    <Flex gap={{base:4,sm:10}}
    py={10} direction={{base:'column',sm:'row'}}>
      <SkeletonCircle size={20}/>
      <VStack>
        <Skeleton height={2} w={200}/>
        <Skeleton height={2} w={200}/>
      </VStack>
    </Flex>
  );
}
