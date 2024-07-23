import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import {ViewIcon,ViewOffIcon} from '@chakra-ui/icons'
import useSignUpWithEmailPassword from '../../Hooks/useSignUpWithEmailPassword'
function Signin() {
    const [inputs,setInputs] = useState(
        {
            fullname:'',
            username:'',
          email:'',
          password:''
        })
    const [showpass,SetShowPass] = useState(true);
    const {loading,error,signUp} = useSignUpWithEmailPassword()
  return (
    <>
      <Input 
      placeholder='Email' 
      type='email' 
      fontSize={14} 
      value={inputs.email}
      onChange={(e)=>setInputs({...inputs,email:e.target.value})}/>

      <Input 
      placeholder='Username' 
      type='text' 
      fontSize={14} 
      value={inputs.username}
      onChange={(e)=>setInputs({...inputs,username:e.target.value})}/>

      <Input 
      placeholder='Full name' 
      type='text' 
      fontSize={14} 
      value={inputs.fullname}
      onChange={(e)=>setInputs({...inputs,fullname:e.target.value})}/>
        
        <InputGroup>
            <Input 
            placeholder='Password' 
            type={showpass? 'text' : 'password'}
            fontSize={14}
            value={inputs.password}
            size={'sm'}
            onChange={(e)=>setInputs({...inputs,password:e.target.value})}
            />
            <InputRightElement h={'50%'} alignSelf={'center'} m={1}  bg={'black'} mt={2}>
            <Button variant={'ghost'} size={'sm'} fontSize={14} _hover={{bg:'black'}} onClick={()=>SetShowPass(p=>!p)}>
                {
                    showpass? <ViewIcon/> :<ViewOffIcon/>
                }
            </Button>
            </InputRightElement>
        </InputGroup>
        {
            error? <p style={{color:'red'}}>{error.message}</p> : null
        }
        <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14} onClick={()=>signUp(inputs)} isLoading={loading}>
          Sign Up'
        </Button>
    </>
  );
}

export default Signin;
