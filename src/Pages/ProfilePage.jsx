import React from 'react';
import {Avatar, Container, Flex} from '@chakra-ui/react'
import ProfileHeader from '../Components/ProfileHeader';
import ProfileTabs from '../Components/ProfileTabs';
import ProfilePosts from '../Components/ProfilePosts';
import useProfilePage from '../Hooks/useProfilePage';
import {useParams} from 'react-router-dom';
function ProfilePage() {
  const {username} = useParams()
  const {isLoading,userProfile} = useProfilePage(username)
  // console.log(username);
  if(isLoading){
    return (
      <Flex width={'full'} >
        
      </Flex>
    )
  }
  if(!userProfile){
    return userNotFound()
  }
  
  return (
    <Container maxW={'container.lg'} py={5}>
        <Flex py={10}
        px={4}
        pl={{base:4,md:10}}
        mx={'auto'}
        flexDirection={'column'}
        >
            <ProfileHeader userProfile={userProfile} isLoading={isLoading}/>
        </Flex>
        <Flex
        px={{base:2,sm:4}}
        maxW={'full'}
        mx={'auto'}
        borderTop={'1px solid'}
        borderColor={'whiteAlpha.400'}
        direction={'column'}>

            <ProfileTabs/>
            <ProfilePosts/>
            
        </Flex>
    </Container>
  );
}

export default ProfilePage;

function userNotFound(){
  return (
    <Container maxW={'container.lg'} py={5}>
        <Flex py={10}
        px={4}
        pl={{base:4,md:10}}
        mx={'auto'}
        flexDirection={'column'}
        gap={6}
        >
            <Avatar bg={'white'}/>
            <h1>User Not Found</h1>
        </Flex>
        <Flex
        px={{base:2,sm:4}}
        maxW={'full'}
        mx={'auto'}
        borderTop={'1px solid'}
        borderColor={'whiteAlpha.400'}
        direction={'column'}>

            
        </Flex>
    </Container>
  )
}
