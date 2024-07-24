import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {CommentLogo, NotificationsLogo,UnlikeLogo} from '../assets/contants'
import usePostComment from '../Hooks/usePostComment'

function CommenrFooter({post}) {
    const [likes,setLikes] = useState(100)
    const [isLiked,setIsLiked] = useState(false)
    const {isCommenting,handlePostComment} = usePostComment()
    const [comment,setComment] = useState('')
    const handleLikes = ()=>{
        if(isLiked){
            setIsLiked(false)
            setLikes(s=>s-1)
        }
        else{
            setIsLiked(true)
            setLikes(s=>s+1)
        }
    }
  return (
    <Box mb={10} marginTop={'auto'} gap={2}>
        <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={4} >
            <Box onClick={handleLikes} cursor={'pointer'}>
                {
                    !isLiked? <NotificationsLogo/> : <UnlikeLogo/>
                }
            </Box>
            <Box cursor={'pointer'} fontSize={18}>
                <CommentLogo/>
            </Box>
        </Flex>
        <Text>
            {likes} likes
        </Text>
         <Flex gap={1}>
            <Input type='text' border={'1px solid white'} borderBottom={'2px solid white'} value={comment} onChange={(e)=>setComment(e.target.value)}/>
            <Button isLoading={isCommenting} onClick={()=>handlePostComment(post.id,comment)}>
                Post
            </Button>
         </Flex>
    </Box>
  )
}

export default CommenrFooter