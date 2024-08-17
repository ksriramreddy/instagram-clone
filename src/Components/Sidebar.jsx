import React from 'react';
import{Box, Flex, Link,Avatar, Tooltip, Button } from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BiLogOut} from 'react-icons/bi'
import{InstagramLogo,InstagramMobileLogo,SearchLogo,NotificationsLogo,CommentLogo,CreatePostLogo} from '../assets/contants'
import useLogout from '../Hooks/useLogout';
import {useSelector} from 'react-redux'
import SidebarItems from './sidebar/SidebarItems';
import { auth } from '../Firebase/Firebase';
function Sidebar() {
  let authUesr = useSelector(state=>state.user)
  // console.log('ukh',authUesr);
  authUesr = JSON.parse(authUesr)
  const {loading,handleLogout}= useLogout()
  // console.log('sriram',JSON.parse(authUesr));
  
  
  return (
    <Flex
    backgroundColor={'black'}
    zIndex={1}
    height={'80px'}
    borderRight={'1px solid black'} 
    py={8}
    position={{base:'fixed',sm:"sticky"}}
    top={{base:"92%",sm:0}}
    left={0}
    px={{base:2,md:4}}
    color={'black'}
    flexDirection={'row'}
    alignItems={'center'}
    justifyContent={'flex-start'}
    >
      <Flex direction={{base:'row',sm:'column'}}gap={10} w={'full'} height={{base:"max-content",sm:'full'}} >
        <Link as={RouterLink} to={'/'} pl={2} display={{base:'none',md:'block'}} cursor={'pointer'}>
          <InstagramLogo/>
        </Link>
        <Link as={RouterLink} to={'/'} p={2} display={{base:'none',
        md:'none'}} cursor={'pointer'}
        borderRadius={6} _hover={{
          bg:'whiteAlpha.200',      
        }}
        w={10}>
          <InstagramMobileLogo/>
        </Link>
        <Flex direction={{base:'row',sm:'column'}} gap={5} cursor={'pointer'} color={'white'} backgroundColor={'black'} width={"100"}>
          <SidebarItems/>
        </Flex>
        <Tooltip hasArrow label={'Logout'} placement='right' ml={1} openDelay={500} display={{base:'block',md:'none'}} color={'white'} justifyContent={'center'} alignItems={'center'}>
                <Flex display={'flex'}
                onClick={handleLogout}
                alignItems={'center'}
                gap={4}
                _hover={{bg:'whiteAlpha.400'}}
                borderRadius={6}
                p={2}
                w={{base:'10', md:'full'}}
                mt={'auto'}
                >
                  <BiLogOut/>
                  <Button variant={'ghost'} _hover={{bg:'transparent'}} color={'white'} isLoading={loading} display={{base:'none',md:'block'}}>
                    Logout
                  </Button>
                </Flex>
              </Tooltip>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
