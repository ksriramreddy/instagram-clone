import { Flex, VStack,Text } from '@chakra-ui/react';
import React from 'react';
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';
import useSuggestedUser from '../Hooks/useSuggestedUser';

function SuggestedUsers() {
  const {isLoading,suggestedUsers} = useSuggestedUser()
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader/>
      <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
        <Text fontSize={12} color={'gray.400'} fontWeight={'bold'}>
            suggested for you
        </Text>
        <Text fontSize={12} fontWeight={'bold'} _hover={{color:'gray.400'}} cursor={'pointer'}>
            see all
        </Text>
      </Flex>
      {
        suggestedUsers.map((user)=>(<>
          <SuggestedUser key={user.userId} user={user}/>
          </>
        ))

      }
      <Flex fontSize={12} color={'gray.500'}>
        @ 2024 Bult by 
        Sriram
      </Flex>
    </VStack>
  ); 
}

export default SuggestedUsers;
