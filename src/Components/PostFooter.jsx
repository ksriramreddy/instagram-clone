import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {NotificationsLogo,UnlikeLogo,CommentLogo} from '../assets/contants'
function PostFooter({username}) {
    const [liked,setLiked] = useState(0)
    const [likes,setLikes] = useState(10)
    const handleLike = ()=>{
       if(liked) {setLiked(0)
        setLikes(likes-1)}
    else{setLiked(1)
        setLikes(likes+1)}
    }
  return (
    <Box mb={10}>
      <Flex alignItems={'center'} gap={4} pt={0} mb={2} mt={4}>
        <Box onClick={handleLike} cursor={'pointer'} fontSize={18}>
            {
                !liked? <NotificationsLogo/> : <UnlikeLogo/>
            }
        </Box>
        <Box cursor={'pointer'} fontSize={18}  >
            <CommentLogo />
        </Box>
      </Flex> 
      <Text fontWeight={800} fontSize={'sm'}>
        {likes} likes
      </Text>
      <Text fontWeight={700} fontSize={'sm'}>
        {username} {' '}
        <Text fontWeight={400} fontSize={'sm'}>
          feelings 
        </Text>
      </Text>
      <Text fontWeight={700} fontSize={'sm'}>
        View all posts
      </Text>
      <Flex alignItems={'center'} justifyContent={'space-between'} gap={2} w={'full'}>
        <InputGroup>
        <Input variant={'flushed'} placeholder='Add comment...' fontSize={14}/>
        <InputRightElement>
        <Button fontSize={14} fontWeight={600} cursor={'pointer'} _hover={{color:'white'}} bg={'transparent'}>
          Post
        </Button>
        </InputRightElement>
        </InputGroup>
      </Flex>

      
    </Box>
  );
}

export default PostFooter;
