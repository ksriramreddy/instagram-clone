import React from 'react';
import {Box, Container, Flex } from '@chakra-ui/react'
import FeedPosts from '../Components/FeedPosts';
import SuggestedUsers from '../Components/SuggestedUsers';
function HomePage() {
  return (
    <Container maxW={'container.lg'} bg={'black'} color={'white'}>
      <Flex gap={20}>
        <Box flex={2} py={10} >
          <FeedPosts/>
        </Box>
        <Box flex={3} mr={20}
        display={{base:'none',lg:'block'} }
        maxW={300}
        // position={'fixed'}
        // top={0}
        // left={'65%'}
        >
          <SuggestedUsers/>
        </Box>
      </Flex>
    </Container>
  );
}

export default HomePage;