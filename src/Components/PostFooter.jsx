import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {NotificationsLogo,UnlikeLogo,CommentLogo} from '../assets/contants'
import useLikePost from '../Hooks/useLikePost';
import usePostComment from '../Hooks/usePostComment';
import Comment from './CommentSection';
import CommentSection from './CommentSection';
function PostFooter({post}) {
    const {isLiked,likesCount,handleLikePost} = useLikePost(post);
    const handleLike = async ()=>{
      await handleLikePost()
    }
  return (
    <Box mb={7} marginTop={'auto'}>
      <Text fontWeight={700} fontSize={'sm'}>
        <Text fontWeight={400} fontSize={'sm'}>
          {
            post.caption
          }
        </Text>
      </Text>
      <Flex alignItems={'center'} gap={2} pt={0} mb={2} mt={4}>
        <Box onClick={handleLike} cursor={'pointer'} fontSize={18}>
            {
                !isLiked? <NotificationsLogo/> : <UnlikeLogo/>
            }
        </Box>
        <Box cursor={'pointer'} fontSize={18}  >
            <CommentLogo />
        </Box>
      </Flex> 
      <Text fontWeight={800} fontSize={'sm'}>
        {likesCount} likes
      </Text >
<<<<<<< HEAD
      <Flex width={'100%'}>

      <CommentSection comments={post.comments} postId={post.id}/>
      </Flex>
=======
      
>>>>>>> 03b65342cfb1d641f3859ead22abb5bedf726845
    </Box>
  );
}

export default PostFooter;
