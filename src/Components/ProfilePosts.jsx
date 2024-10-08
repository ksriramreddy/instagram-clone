import React, { useEffect, useState } from 'react';
import {Box, Button, Flex, Grid, Image, Skeleton, Text, VStack} from '@chakra-ui/react'
import ProfilePost from './ProfilePost';
import useGetUserPosts from '../Hooks/useGetUserPosts';
import { useSelector } from 'react-redux';
import usePostsStore from '../store/postStore';
function ProfilePosts({userProfile}) {
  const[loading,setLoading] = useState(false)
  const {isLoading} = useGetUserPosts(userProfile.userId)
  const posts = usePostsStore(state=>state.posts)
  const noPostsFound = !isLoading && posts.length ==0 
  if(noPostsFound) return <NoPostsFound/>
  
  return (
    <Grid templateColumns={{
      sm:'repeat(1,1fr)',
      md: 'repeat(3,1fr)'
    }} gap ={2} columnGap={1}>
      {
        isLoading && [1,2,3,4,5].map((_,i)=>(
          <VStack key={i}  alignItems={'flex-start'} gap={4}>
            <Skeleton w={'full'}>
              <Box h={300}>
                Content wrapped  
              </Box>
            </Skeleton>
          </VStack>
        ))
      }
      {
        !isLoading &&  (posts.map((post,i)=>
          <ProfilePost post={post} key={i}/>
        ))
      }
    </Grid>
  );
}

export default ProfilePosts;

function NoPostsFound(){
  return (
    <Box textAlign={'center'}>
      <Image src="public/nopostsyet.png"/>
    </Box>
  )
 
}
   
