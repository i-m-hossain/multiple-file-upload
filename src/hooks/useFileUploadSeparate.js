import { useState } from 'react';
const useFileUploadSeparate = () => {
    const [files, setFiles] = useState({})
    const [images, setImages] = useState({})
    const [error, setError] = useState({})  
    return [files, setFiles, images, setImages, error, setError]
};

export default useFileUploadSeparate;