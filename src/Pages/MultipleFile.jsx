import React from "react";
import MultipleFileInput from "../component/MultipleFileInput";
import useFileUpload from "../hooks/useFileUpload";

const MultipleFile = () => {
    const [files, setFiles, images, setImages] = useFileUpload();
    return (
        <div>
            <p>length: {files.length}</p>
            <MultipleFileInput
                files={files}
                setFiles={setFiles}
                images={images}
                setImages={setImages}
            />
        </div>
    );
};

export default MultipleFile;
