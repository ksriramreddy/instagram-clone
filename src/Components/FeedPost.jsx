import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
function FeedPost({img,username}) {
  return (
    <>
    <PostHeader avatar={img}/>
    <Box my={3} overflow={'hidden'} borderRadius={4}>
      <Image src={img} alt='user profile'/>
    </Box>
    <PostFooter username={username}/>
    </>
  );
}

export default FeedPost;
