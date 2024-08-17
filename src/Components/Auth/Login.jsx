import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import useLogin from '../../Hooks/useLogin';

function Login() {
    const [inputs,setInputs] = useState(
        {
          email:'',
          password:''
        })
    const {isLoading,userLogin} = useLogin()
  return (
    <>
        <Input placeholder='Email' type='email' fontSize={14} value={inputs.email}
        onChange={(e)=>setInputs({...inputs,email:e.target.value})}/>
        <Input placeholder='Password' type='password' fontSize={14}
        value={inputs.password} 
        onChange={(e)=>setInputs({...inputs,password:e.target.value})}
        />
        <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14} onClick={()=>userLogin(inputs)} isLoading={isLoading}>
          Login
        </Button>
    </>
  );
}

export default Login;
