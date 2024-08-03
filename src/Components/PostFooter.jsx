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
      {
        post.comments.length > 0?  <Text fontWeight={200} fontSize={'sm'} cursor={'pointer'} onClick={()=>{setViewComment(p=>!p)}}>
        view {post.comments.length} {
          post.comments.length ==1? "comment" : "comments"
        }
      </Text> : " "
      }
      {
        
        <>
        <Flex direction={'column'} width={'100%'} gap={3} mt={2} display={viewComment? "block" : "none"} onDurationChange={2}>
          {
            post.comments.map((com=>(
              <Comment comment={com}/>
            )))
          }
        </Flex >
        </>
      }
      
      <Flex alignItems={'center'} justifyContent={'space-between'} gap={2} w={'full'}>
        <InputGroup>
          <Input variant={'flushed'} placeholder='Add comment...' fontSize={14} onChange={(e)=>{setComment(e.target.value)}} value={comment}/>
          <InputRightElement>
            <Button fontSize={14} fontWeight={600} cursor={'pointer'} color={'white'} _hover={{color:'blue.500'}} bg={'transparent'} isLoading={isCommenting} onClick={handleComment}>
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>

      
    </Box>
  );
}

export default PostFooter;
