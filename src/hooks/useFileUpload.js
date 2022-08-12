import { useEffect, useState } from 'react';

const useFileUpload = () => {
    const [files, setFiles] = useState([])
    const [images, setImages] = useState([])
    useEffect(()=>{
        if(files.length> 0){
            console.log('call api here', files)
        }
    }, [files])
    return [files, setFiles, images, setImages]
};

export default useFileUpload;
