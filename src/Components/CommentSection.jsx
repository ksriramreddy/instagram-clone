import { Avatar, Box, Button, Flex,Input,InputGroup,InputRightElement,Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useGetProfileById from '../Hooks/useGetProfileById'
import { timeAgo } from '../utils/timeAgo'
import Comment from './Comment'
import usePostComment from '../Hooks/usePostComment'

function CommentSection({comments,postId}) {
    const {isCommenting,handlePostComment} = usePostComment();
    const [newComment,setNewComment] = useState('')
    const [viewComment,setViewComment] = useState(0);

    const handleComment = async ()=>{
      await handlePostComment(postId , newComment);
      setNewComment('')
    }
    
    // console.log('userProfile',userProfile);
  return (

    <Flex width={'100%'}>
        
        {/* ////////////////////////////////////////////////////////////// */}
        <Flex direction={'column'} width={'100%'}>
        {
        comments.length > 0?  <Text fontWeight={200} fontSize={'sm'} cursor={'pointer'} onClick={()=>{setViewComment(p=>!p)}} width={'100%'}>
        {!viewComment? "view" : "close"} {viewComment?"":comments.length} {
          comments.length ==1? "comment" : "comments"
        }
      </Text> : " "
      }
      <Flex display={viewComment? "block" : "none"}>
        {
          comments.map((comment,i)=>(
            <Comment comment={comment}/>
          ))
        }
        </Flex>
      {/* {
        <>
        <Flex direction={'column'} width={'100%'} gap={3} mt={2} display={viewComment? "block" : "none"} onDurationChange={2}>
          {
            comments.map((com=>(
              <Comment comment={com}/>
              
            )))
          }
        </Flex >
        
        </>
      } */}
      
      <Flex alignItems={'center'} justifyContent={'space-between'} gap={2} w={'full'}>
        <InputGroup>
          <Input variant={'flushed'} placeholder='Add comment...' fontSize={14} onChange={(e)=>{setNewComment(e.target.value)}} value={newComment}/>
          <InputRightElement>
            <Button fontSize={14} fontWeight={600} cursor={'pointer'} color={'white'} _hover={{color:'blue.500'}} bg={'transparent'} isLoading={isCommenting} onClick={handleComment}>
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
        </Flex>
    </Flex>
   
  )
}

export default CommentSection