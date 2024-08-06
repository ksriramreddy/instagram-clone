import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack,Text } from '@chakra-ui/react';
import FeedPost from '../Components/FeedPost'
import useGetFeedPosts from '../Hooks/useGetFeedPosts';
function FeedPosts() {
  const [isLoading,setIsLoading] = useState(true)
  const {isFetching,feedPosts} =useGetFeedPosts();
  // !isFetching && console.log('feedpostd',feedPosts);
  // !isFetching && feedPosts.map(feedPost => {console.log(feedPost.createdAt);})
  if(!feedPosts == 0){
    return noFeeds()
  }

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {
        isFetching && 
        [1,2].map((_,i) =>(
          <VStack key={i} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10}/>
              <VStack gap={2} alignItems={'center'} justifyContent={'center'}>
                <Skeleton height={2} w={100}/>
              </VStack>
              
            </Flex>
            <Skeleton w={'full'}>
              <Box h={500}>
                
              </Box>
            </Skeleton>

          </VStack>
        ))
      }
      {
        !isFetching && <>
        {
          feedPosts.map(post=><FeedPost post={post} key={post.id}/>)
        }
        </>
        
      }
        
    </Container>
  );
}

const noFeeds = ()=>{
  return (
    <>
    <Box>
      <Text align={'center'} color={'red'}>
        NO FEEDS FOUND!
      </Text>
      <Text align={'center'}>
        FOLLOW SOMEONE TO GET FEEDS...
      </Text>
    </Box>
    
    </>
  )
}


export default FeedPosts;
