import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Container,
    VStack,
    Icon,
    Text,
  } from '@chakra-ui/react';
  import { CloseIcon, SmallCloseIcon } from '@chakra-ui/icons';
  import React, { useRef, useState } from 'react'
import useEditProfile from '../Hooks/useEditProfile';
import useGetImage from '../Hooks/useGetImage';
  
 function EditProfile({onClose,authUser}) {


  const [profileDetails,setProfileDetails] = useState({
    fullname:authUser.fullname,
    username:authUser.username,
    bio:authUser.bio,
    profilePic:authUser.profilePicUrl
  })

  const {handleLoadImage,selectedImage} = useGetImage()
  console.log('selected img',selectedImage);

  const {isUpdating,setUserDetails} = useEditProfile()


  const handleProfileDetails = (e)=>{
    setProfileDetails({...profileDetails,[e.target.name]:e.target.value})
  }


    const fileRef = useRef(null)
    return (
      <Container
      width={'40%'}
      h={'fit-content'}
      position={'fixed'}
      mx={'auto'}
      border={'1px solid white'}
      borderRadius={'10px'}
      zIndex={1}
      p={10}
      >
        <Flex flexDirection={'column'} gap={2}>
          <Button bg={'transparent'} _hover={{bg:'transparent'}} alignSelf={'flex-end'} onClick={onClose}>
              <Icon as={CloseIcon} bg={'transparent'} />
          </Button>
          <Text fontSize={25} fontFamily={'serif'}>
            Edit Profile
          </Text>
          <Flex justifyContent={'flex-start'} alignItems={'center'} gap={5} flexDirection={{xs:'column',sm:'column',base:'row'}}>
            <Avatar src={selectedImage || profileDetails.profilePic} size={'xl'} border={'1px solid black'}/>
            <Button  bg={'gray.800'} color={'white'} _hover={{bg:'gray.500'}} textOverflow={'clip'} onClick={()=>fileRef.current.click()}>
              Edit Profie Picture
            </Button>
            <Input type='file' hidden ref={fileRef} onChange={handleLoadImage}/>
          </Flex>
          <Text fontSize={16} fontFamily={'serif'} >
            full name
          </Text>
          <input type="text" placeholder='full name' name='fullname' value={profileDetails.fullname} onChange={handleProfileDetails} style={{padding:'5px',border:'1px solid gray',borderRadius:'4px'}} />
          <Text fontSize={16} fontFamily={'serif'} >
            User name
          </Text>
          <input type="text" placeholder='User name' name='username' value={profileDetails.username} onChange={handleProfileDetails}  style={{padding:'5px',border:'1px solid gray',borderRadius:'4px'}}/>
          <Text fontSize={16} fontFamily={'serif'} >
            Bio
          </Text>
          <input type="text" placeholder='Bio' name='bio' value={profileDetails.bio} onChange={handleProfileDetails} style={{padding:'5px',border:'1px solid gray',borderRadius:'4px'}} />
          <Flex justifyContent={'flex-start'} alignItems={'center'} gap={5}>
            <Button bg={'blue.600'} color={'white'} _hover={{bg:'gray.500'}} isLoading={isUpdating} onClick={()=>{ setUserDetails(authUser,profileDetails,selectedImage,onClose) }}>
              Save
            </Button>
            <Button bg={'red.600'} color={'white'} _hover={{bg:'gray.500'}}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Container>
    );
  }
  export default EditProfile