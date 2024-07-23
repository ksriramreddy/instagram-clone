import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';
import FeedPost from '../Components/FeedPost'
function FeedPosts() {
  const [isLoading,setIsLoading] = useState(true)
  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  },[])
  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {
        isLoading && 
        [1,2,3,4].map((_,i) =>(
          <VStack key={i} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10}/>
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton height={2} w={200}/>
                <Skeleton height={2} w={200}/>
              </VStack>
            </Flex>
            <Skeleton w={'full'}>
              <Box h={500}>
                kjkjk
              </Box>
            </Skeleton>

          </VStack>
        ))
      }
      {
        !isLoading && <>
        <FeedPost img={'/img1.png'} username={'sriram'}/>
        <FeedPost  img={'/img2.png'} username={'reddy'}/>
        <FeedPost  img={'/img3.png'} username={'ganesh'}/>
        <FeedPost  img={'/img4.png'} username={'ssatya'}/>
        </>
        
      }
        
    </Container>
  );
}


export default FeedPosts;