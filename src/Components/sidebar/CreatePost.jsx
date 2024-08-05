import { Box, Button, CloseButton, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import {CreatePostLogo} from '../../../src/assets/contants'
import { BsFillImageFill } from "react-icons/bs";
import useGetImage from './../../Hooks/useGetImage'
import useShowToast from '../../Hooks/useTost';
import { useDispatch, useSelector } from 'react-redux';
import usePostsStore from '../../store/postStore';
import { useLocation } from 'react-router-dom';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../Firebase/Firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
// import {addPost} from '../../store/userAccount'
function CreatePost() {
  const {isOpen,onClose,onOpen}= useDisclosure()
  const imgRef = useRef(null)
  const [caption,setCaption] = useState('')
  const {selectedImage,
    handleLoadImage,setSelectedImage} = useGetImage()
    const {handleCreatePost,isLoading} = useCreatePost()
    const showToast = useShowToast()
    const handlePostCreation = async ()=>{
      try {
        await handleCreatePost(selectedImage,caption)
        onClose()
        setCaption('')
        setSelectedImage('')
      } catch (error) {
        showToast('Unable to create post',error.message,'error')
        // console.log(error.message);
      }
    }
    
  return (
    <>
      <Tooltip
      
      hasArrow
      label='create'
      placement='right'
      ml={'1'}
      openDelay={500}
      display={{base:'whiteAlpha.400'}}
      borderRadius={'6'}>
        <Flex
        onClick={onOpen}
        alignItems={'center'}
        gap={'4'}
        _hover={{bg:"WhiteAlpha.400"}}
        borderRadius={'6'}
        p={'2'}
        w={{base:10,md:'full'}}
        justifyContent={{base:'none',md:'flex-start'}}>
            <CreatePostLogo/>
            <Box display={{base:'none',md:'block'}}>
                Create 
            </Box>
        </Flex>
      </Tooltip>
       <Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />
				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea placeholder='Add caption...' value={caption} onChange={(e)=>setCaption(e.target.value)}/>

						<Input type='file' ref={imgRef} hidden onChange={handleLoadImage} />

						<BsFillImageFill onClick={()=>{
              imgRef.current.click()
            }} 
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>
            {
              selectedImage &&
              <Flex  width={'full'} position={'relative'} justifyContent={'center.'}>
                <img src={selectedImage} alt='Selected Image' style={{width:'100%', height:'auto', borderRadius:'4px'}}/>
                <CloseButton position={'absolute'} left={'95%'} top={2} size={'20px'} onClick={()=>{setSelectedImage(null)}} />
              </Flex>
              
            
            }
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>Post</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> 
    </>
  );
}

export default CreatePost;


function useCreatePost(){
  const showToast = useShowToast()
  const [isLoading,setIsLoading] = useState(false)
  const demo = useSelector(state=>state.user)
  const authUser = JSON.parse(demo)
  const dispatch = useDispatch() 
  const  createPost= usePostsStore(state=>state.createPost)
  
  const {pathname} = useLocation()
  const handleCreatePost = async (selectedImage,caption)=>{
    if(isLoading) return 
      if(!selectedImage) throw new Error('Please select an image')
      setIsLoading(true)
      const newPost = {
        caption : caption,
        likes : [],
        comments : [],
        createdAt: Date.now(),
        createdBy : authUser.userId
      }
      try {
        const postDocRef = await addDoc(collection(firestore,'posts'),newPost)
        const userDocRef =  doc(firestore,'users',authUser.userId)
        const imageRef =  ref(storage,`posts/${postDocRef.id}`)
        await updateDoc(userDocRef,{posts:arrayUnion(postDocRef.id)})
        await uploadString(imageRef,selectedImage,'data_url')
        const downloadUrl = await getDownloadURL(imageRef)
        await updateDoc(postDocRef,{imageUrl:downloadUrl})
        newPost.imageUrl  = downloadUrl
        createPost({...newPost,id:newPost.id})
        // dispatch(addPost({...newPost,id:postDocRef.id}))
        showToast('Success','Post Created Successfully','success')
      } catch (error) {
        console.log(error.message);
        showToast('Error',error.message,'error')
      }
      finally{
        setIsLoading(false)
      }
    }
    return {handleCreatePost,isLoading}
}