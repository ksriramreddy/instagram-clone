import { Box, VStack , Image, Input, Button, Flex , Text} from '@chakra-ui/react';
import React, { useState } from 'react';
import Login from './Auth/Login';
import Signin from './Auth/Signin';
import GoogleAuth from './Auth/GoogleAuth';

function AuthForm() {
  const [isLogin,setIsLogin] = useState(true)
  const [inputs,setInputs] = useState(
    {
      email:'',
      password:'',
      confirmPassword:''
    }
  )
  return (<>
    <Box >
      <VStack spacing={4}>
        <Image src='/logo.png' h={24} cursor={'pointer'} alt='LOGO'/>
        
        {
          isLogin? <Login/> : <Signin/>
        }
        
        
        <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
          <Box flex={2} h={'1px'} bg={'gray.400'}></Box>
          <Text mx={1} color={'gray'}>
            OR
          </Text>
          <Box flex={2} h={'1px'} bg={'gray.400'}></Box>
        </Flex>
        <GoogleAuth prefix={isLogin? "Login" : "Sign Up"}/>
      </VStack>
    </Box>
    <Box>
      <Flex>
        <Box mx={2} fontSize={14}>
          {
            isLogin? "Don't have an account?" : "Already have an account?"
          }
        </Box>
        <Box mx={1} fontSize={14} onClick={()=>{setIsLogin(p=>!p)}} cursor={'pointer'} color={'blue.500'}>
          {
            isLogin? "Sign Up" : "Log In"
          }
        </Box>
      </Flex>
    </Box>
    </>
  );
}

export default AuthForm;
