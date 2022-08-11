import React from "react";
const FileInput = (props) => {
    const handleFile = (e) => {
        const targetFiles =e.target.files;
        //Set Files
        props.setFiles(targetFiles);
        
        //Set Images
        const selectedFIles =[];
        const targetFilesObject= [...targetFiles]
        targetFilesObject.map((file)=>{
            return selectedFIles.push(URL.createObjectURL(file))
        })
        props.setImages(selectedFIles);
    };
    
    return (
        <div>
            <img src={props.images[0] || "https://via.placeholder.com/150"} alt="image1" style={{marginRight:"20px"}}/>
            <img src={props.images[1] || "https://via.placeholder.com/150"} alt="image2" style={{marginRight:"20px"}}/>
            <img src={props.images[2] || "https://via.placeholder.com/150"} alt="image3" />
            <br />
            <label>select file</label>
            <br />
            <input
                type="file"
                name="file"
                multiple
                onChange={(e) => {handleFile(e)}}
            />
            <p>{props.files.length}</p>
        </div>
    );
};
export default FileInput;
