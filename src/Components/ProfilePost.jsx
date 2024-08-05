import { Avatar, Box, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import{AiFillHeart} from 'react-icons/ai'
import{FaComment} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { auth } from '../Firebase/Firebase';
import { MdDelete } from "react-icons/md";
import useDeletePost from '../Hooks/useDeletePost';
import Comment from './Comment';
import CommenrFooter from './CommenrFooter';
import usePostsStore from '../store/postStore';
import Caption from './Caption';


function ProfilePost({post}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const demo = useSelector(state=>state.user)
    const authUser = JSON.parse(demo)
    const {isDeleting,deleteUserPost} = useDeletePost()
    const posts = usePostsStore(state=>state.posts)
    // console.log("posts",posts);
  return (
    <>
    
    <GridItem cursor={'pointer'} borderRadius={5} overflow={'hidden'} border={'1px solid '} borderColor={'whiteAlpha.400'} position={'relative'} aspectRatio={1/1} onClick={onOpen}>
        <Flex 
        opacity={0}
        w={'full'}
        _hover={{opacity:1}}
        position={'absolute'}
        top={0} left={0} bottom={0} right={0}
        bg={'blackAlpha.700'}
        transition={'all 0.3s ease'}
        justifyContent={'center'}>
            <Flex alignItems={'center'}
            justifyContent={'center'}
            gap={50} w={'full'} bg={'blackAlpha.400'}>
                <Flex bg={'blackAlpha.400'}>
                    <AiFillHeart size={20} enableBackground={'blackAlpha.400'} />
                    <Text fontWeight={'bold'} ml={2} bg={'transparent'}>
                        {post.likes.length}
                    </Text>
                </Flex>
                <Flex>
                    <FaComment size={20} enableBackground={'blackAlpha.400'}/>
                    <Text fontWeight={'bold'} ml={2} bg={'transparent'}>
                        {post.comments.length}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
        <Image src={post.imageUrl} w={'100%'} h={'100%'} objectFit={'cover  '} />
        
    </GridItem>
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{base:'3xl',md:'5xl'}}>
        <ModalOverlay />
        <ModalContent>
          
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
          <Flex
							gap='4'
							w={{ base: "90%", sm: "70%", md: "full" }}
							mx={"auto"}
							maxH={"90vh"}
							minH={"50vh"}
                            direction={{base:'column' , md:'row'}}
						>
							<Flex
								borderRadius={4}
								overflow={"hidden"}
								border={"1px solid"}
								borderColor={"whiteAlpha.300"}
								flex={1.5}
								justifyContent={"center"}
								alignItems={"center"}
                                direction={'column'}
							>
								<Image  src={post.imageUrl} alt='profile post' />
                                {/* <Box width={'100%'}>

                                {post.caption && <Caption post={post} />}
                                </Box> */}
							</Flex>
							<Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
								<Flex alignItems={"center"} justifyContent={"space-between"}>
									<Flex alignItems={"center"} gap={4}>
										<Avatar src={authUser.profilePicUrl} size={"sm"} name={authUser.username} />
										<Text fontWeight={"bold"} fontSize={12}>
											{authUser.username}
										</Text>
                                    </Flex>

                                    { authUser.userId==post.createdBy && 
                                    <Button
											size={"sm"}
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={4}
											p={1}
                                            backgroundColor={'transparent'}
											onClick={()=>deleteUserPost(post.id)}
											isLoading={isDeleting}
										>
										<MdDelete size={20} cursor='pointer' />
									</Button>}
                                </Flex>
                                <Flex fontFamily={'revert'} textAlign={'center'}>
                                {post.caption && <Text> {post.caption   }</Text>}
                                </Flex>
                                        <Divider my={4} bg={"gray.500"} />
                                        

                            <VStack w='full' alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                {
                                    post.comments.map((comment,i)=>(
                                        <Comment key={i} comment={comment}/>
                                    ))
                                }
                            {/* CAPTION */}
                            
                            {/* COMMENTS */}
                            {/* {post.comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))} */}
                        </VStack>
                        <Divider my={4} bg={"gray.8000"} />
                        <CommenrFooter post={post}/>
                    </Flex>
                </Flex>
          </ModalBody>
        </ModalContent>
    </Modal> 
    </>
  );
}

export default ProfilePost;