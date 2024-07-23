import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import{Navigate, Link } from 'react-router-dom'
import useLogout from '../Hooks/useLogout';
import { useSelector } from 'react-redux';

function SuggestedHeader() {
  const {handleLogout} =  useLogout()
  let user = useSelector((state)=>state.user) 
  user = JSON.parse(user)
  // console.log("user details",user.email);
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} width={'full'}>
      
      
       <Flex alignItems={'center'} gap={2}>
        <Link to={`/${user.username}`}>
        
        <Avatar name='sriram' size={'lg'} src={user.profilePicUrl}/>
        </Link>
        <Link to={`/${user.username}`}>
        <Text fontSize={12} fontWeight={'bold'} >
            {user.fullname}
        </Text> </Link>
        </Flex>
        <Button 
        fontSize={14}
        bg={'transparent'}
        fontWeight={'medium'}
        color={'blue.400'}
        style={{textDecoration:'none'}}
        cursor={'pointer'}
        onClick={handleLogout}>
            Logout
        </Button>
    </Flex>
  );
}

export default SuggestedHeader;
