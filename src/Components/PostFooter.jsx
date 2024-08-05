import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {NotificationsLogo,UnlikeLogo,CommentLogo} from '../assets/contants'
import useLikePost from '../Hooks/useLikePost';
import usePostComment from '../Hooks/usePostComment';
import Comment from './Comment';
function PostFooter({post}) {
    // const [liked,setLiked] = useState(0)
    // const [likes,setLikes] = useState(10)
    const [comment,setComment] = useState('');
    const [viewComment,setViewComment] = useState(0);
    console.log(post);
    
    const {isLiked,likesCount,handleLikePost} = useLikePost(post);
    const {isCommenting,handlePostComment} = usePostComment()
    const handleLike = async ()=>{
      await handleLikePost()
    }
    const handleComment = async ()=>{
      await handlePostComment(post.id , comment);
      setComment('')
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
      
    </Box>
  );
}

export default PostFooter;
