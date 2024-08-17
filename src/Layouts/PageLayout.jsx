import { Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import {useLocation} from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/Firebase';
import Navbar from '../Components/Navbar';


function PageLayout({children}) {
    const {pathname} = useLocation()
    const [user,loading,error] = useAuthState(auth)
    const sidebarRender = pathname !== '/login' && user
    const userLoading = !user && loading
    const navbarRender = !user && !loading && pathname !== '/login'
    if(userLoading) {
      return (
        <Flex flexDir={'column'} h={'100vh'} justifyContent={'center'} alignItems={'center'}>
          <Spinner size={'xl'}/>
        </Flex>
      )
    }
  return (
    <Flex flexDirection={{base:"column-reverse",sm:navbarRender? 'column' : 'row'}} backgroundColor={'black'}>
        {
           sidebarRender ? (
                <Box w={{base:'70px',md:'240px'}}>
                   <Sidebar/>
                </Box>
            ): null
        }
        {
          navbarRender ? <Navbar/> : null
        }
        <Box w={{base:'100%',md:'calc(100% - 240px)'}} mx={'auto'} backgroundColor={'black'}>
            {children}
        </Box>  
    </Flex>
  );
}

export default PageLayout;
