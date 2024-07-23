import { Box, Container, Flex, VStack,Image } from '@chakra-ui/react';
import React from 'react';
import AuthForm from '../Components/AuthForm';

function LoginPage() {
  return (
    <Flex minH={'100vh'} justifyContent={'center'}>
        <Container maxW={'max-content'}>
            <Flex justifyContent={'center'} alignItems={'center'} gap={10}>
                <Box display={{base:'none',md:'block'}}>
                    <Image src='/auth.png' h={650} alt={'Phone Img'}/>
                </Box>
                <VStack>
                    <AuthForm/>
                    <Box textAlign={'center'}>Get the app</Box>
                    <Image src='/playstore.png' h={'10'}/>
                    <Image src='/microsoft.png' h={'10'}/>
                </VStack>
            </Flex>
        </Container>
    </Flex>
  );
}

export default LoginPage;
