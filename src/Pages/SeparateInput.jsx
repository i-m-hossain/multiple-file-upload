import React from "react";
import MultipleFileSeparateInput from "../component/MultipleFileSeparateInput";
import useFileUploadSeparate from "../hooks/useFileUploadSeparate";

const SeparateInput = () => {
    const [files, setFiles, images, setImages, error, setError] = useFileUploadSeparate();
    console.log(files)
    return (
        <div className="px-32">
            <MultipleFileSeparateInput
                files={files}
                setFiles={setFiles}
                images={images}
                setImages={setImages}
                error={error}
                setError={setError}
            />
        </div>
    );
};

export default SeparateInput;
