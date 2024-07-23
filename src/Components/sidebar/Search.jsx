import React from 'react';
import {SearchLogo} from '../../../src/assets/contants'
import { Box, Button, Container, Flex, Icon, Tooltip, useDisclosure ,Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import SuggestedUser from '../SuggestedUser'
import UseSearch from '../../Hooks/UseSearch';
function Search() {
  const { isOpen,onClose,onOpen} = useDisclosure()
  const {isLoading,getUserProfile,user,setUser} = UseSearch()
  // console.log(user);
  const searchRef = React.useRef(null)
  const handleSearchUser = (e)=>{
    e.preventDefault()
    getUserProfile(searchRef.current.value)
  }
  return (
    <>
      <Tooltip
      hasArrow
      label='Search'
      placement='right'
      ml={'1'}
      openDelay={500}
      display={{base:'whiteAlpha.400'}}
      borderRadius={'6'}>
        <Flex
        alignItems={'center'}
        gap={'4'}
        _hover={{bg:"WhiteAlpha.400"}}
        borderRadius={'6'}
        p={'2'}
        w={{base:10,md:'full'}}
        justifyContent={{base:'none',md:'flex-start'}}
        onClick={onOpen}>
            <SearchLogo/>
            <Box display={{base:'none',md:'block'}}>
                Search
            </Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
        <ModalOverlay />
        <ModalContent maxW={'400px'} border={'1px solid white'} borderRadius={'10px'}>
          <ModalHeader>Search User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder='Search User' ref={searchRef}/>
            { user && <SuggestedUser user={user} onClose={onClose} setUser={setUser}/>}
          </ModalBody>
          <ModalFooter>
            <Button type='submit' colorScheme='blue' mr={3} onClick={handleSearchUser}>
              Search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Search;
