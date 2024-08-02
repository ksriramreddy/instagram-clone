import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import {CommentLogo, NotificationsLogo,UnlikeLogo} from '../assets/contants'
import usePostComment from '../Hooks/usePostComment'
import useLikePost from '../Hooks/useLikePost'

function CommenrFooter({post}) {
    const {isCommenting,handlePostComment} = usePostComment()
    const [comment,setComment] = useState('')
    const commentRef = useRef(null)
    const {isLiked,likesCount,handleLikePost} = useLikePost(post)
    
  return (
    <Box mb={10} marginTop={'auto'} gap={2}>
        <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={4} >
            <Box onClick={handleLikePost} cursor={'pointer'}>
                {
                    !isLiked? <NotificationsLogo/> : <UnlikeLogo/>
                }
            </Box>
            <Box onClick={()=>{commentRef.current.focus()}} cursor={'pointer'} fontSize={18}>
                <CommentLogo/>
            </Box>
        </Flex>
        <Text>
            {likesCount} likes
        </Text>
         <Flex gap={1}>
            <Input ref={commentRef} type='text' border={'1px solid white'} borderBottom={'2px solid white'} value={comment} onChange={(e)=>setComment(e.target.value)}/>
            <Button isLoading={isCommenting} onClick={()=>{
                handlePostComment(post.id,comment)
                 setComment('')
                 }}>
                Post
            </Button>
         </Flex>
    </Box>
  )
}

export default CommenrFooter