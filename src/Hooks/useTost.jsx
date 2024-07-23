import { useToast } from '@chakra-ui/react';
import React, { useCallback } from 'react';

const useShowToast = () => {
    const toast = useToast()
    const showToast = useCallback((title,disp,status)=>{
        toast({
            title:title,
            discription: disp,
            status : status,
            duration: 3000,
            isClosable: true
        })
    },[toast])
    
    return showToast
}

export default useShowToast;
