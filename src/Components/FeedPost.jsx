import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import useGetProfileById from '../Hooks/useGetProfileById';
function FeedPost({post}) {
  return (
    <>
    <PostHeader createdBy={post.createdBy} createdAt={post.createdAt}/>
    <Box my={3} overflow={'hidden'} borderRadius={4}>
      <Image src={post.imageUrl} alt='user profile'/>
    </Box>
    <PostFooter username={'username'}/>
    </>
  );
}

export default FeedPost;
