import { useSafeLayoutEffect } from '@chakra-ui/react';
import React, { useState } from 'react';
import useShowToast from './useTost';

function useGetImage() {
    const showToast = useShowToast()
    const [selectedImage,setSelectedImage] = useState('')
    const handleLoadImage =  (e)=>{
        const file = e.target.files[0]
        if(file && file.type.includes('image')){
            setSelectedImage(URL.createObjectURL(file))
            const fileReader = new FileReader();
            fileReader.onload = ()=>{
                setSelectedImage(fileReader.result)
            }
            fileReader.readAsDataURL(file)
            // console.log(selectedImage);
        }
        else{
            showToast('Select an image to proceed','select an image only','error')
        }
    }
    return {
        selectedImage,
        handleLoadImage,
        setSelectedImage
    }
}

export default useGetImage;
