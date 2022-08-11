import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import FileInput from "./component/FileInput";
import useFileUpload from "./hooks/useFileUpload";

const App = () => {
  const [files, setFiles, images, setImages] = useFileUpload()
    return (
        <div>
            <p>length: {files.length}</p>
            <FileInput 
              files={files}  
              setFiles={setFiles}
              images={images}
              setImages={setImages}
              />        
        </div>
    );
};

export default App;
