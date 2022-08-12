import { ImCross } from "react-icons/im";
// import { deleteFile, uploadFile } from "react-s3"; //*react-s3 library is used to save and delete files from s3
import brokenImage from "../img/broken.png";
//*--------I used AWS S3 bucket as image storage, this will be replaced by any storage-------*//
/* const config = {
    bucketName: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
}
window.Buffer = window.Buffer || require("buffer").Buffer; */
const MultipleFileSeparateInput = ({ files, setFiles, images, setImages, error, setError }) => {
    console.log("files",files);
    console.log("images",images);
    //handling input on change
    const handleUpload = async (e) => {
        //getting the file which is selected
        const targetFile = e.target.files[0];
        //file size can't be greater than 1MB= 1000000 Bytes
        if (targetFile?.size > 1000000) {
            setError(prev => ({ ...prev, [e.target.name]: true }))
            return;
        }
        //file type must be jpg or png 
        if (!targetFile?.name.match(/\.(jpg|png|jpeg|gif)$/)) { //todo all file support including uppercase 
            setError(prev => ({ ...prev, [e.target.name]: true }));
            return;
        }
        //send request to aws s3 bucket
        try {
            // const result = await uploadFile(targetFile, config) //* post request to aws s3
            const result ={location: true} //! I am just passing location as true, dummy implementation
            //success
            if (result.location) {
                //removing error if any
                setError(current => {
                    const copy = { ...current };
                    delete copy[e.target.name];
                    return copy;
                });
                console.log('result', result)
                //add file to the state
                setFiles(prev => ({ ...prev, [e.target.name]: targetFile }));

                //create an image from that selected file and save to state
                const imageFile = URL.createObjectURL(targetFile)
                setImages(prev => ({ ...prev, [e.target.name]: imageFile }));
            }
        } catch (err) {
            //error
            setError(prev => ({ ...prev, [e.target.name]: true }))
            console.log(err)
        }
    }
    //handling image delete
    const handleDelete = async (imageName, inputName) => {
            try {
                //send delete request to s3 bucket
                // const result = await deleteFile(imageName, config) //*delete request to s3
                const result = {ok: true} //! I am just passing ok as true, dummy implementation
                //success
                if (result.ok) {
                    //clear the file from local state
                    setFiles(current => {
                        const copy = { ...current };
                        delete copy[inputName];
                        return copy;
                    });
                    //clear the image from local state
                    setImages(current => {
                        const copy = { ...current };
                        delete copy[inputName];
                        return copy;
                    });
                }
            } catch (err) {
                console.log("delete error--->", err);
            }
    }
    //if error happens the error image will be cleared
    const handleCancel=(inputName)=>{
        //deleting the error of clicked input
        setError(current => {
            const copy = { ...current };
            delete copy[inputName];
            return copy;
        });
    }
    return (
        <div >
            <label htmlFor="">Select Image (upto 3)</label>
            <div className='flex space-x-4 mb-4 h-44 p-2 outline-none border border-solid border-blue-100 w-full'>
                {/* first input image */}
                <div className="relative">
                    {
                        (images?.image1 || error?.image1) &&
                        <span className="absolute top-8 right-2 z-10 cursor-pointer" onClick={() =>     
                            {!error?.image1 ? handleDelete(files?.image1.name, "image1"): handleCancel("image1")}
                        }>
                            <ImCross className="bg-white p-1 rounded-lg text-lg" />
                        </span>
                    }
                    {
                        (images.image1 || error.image1) ?
                            <img className="h-[150px] w-[200px] object-cover" src={(error.image1 ? brokenImage : images.image1)} alt="image1" />
                            :
                            <div className="flex flex-col space-y-2 pt-14 h-[150px] w-[200px] border border-dashed border-black text-center relative">
                                <h4 className="text-gray-500">Drop File</h4>
                                <h4 className="text-gray-500 ">Or</h4>
                                <label htmlFor="image1" className="cursor-pointer text-blue-600">
                                    Select File
                                    <input
                                        type="file"
                                        name="image1"
                                        id="image1"
                                        className="absolute top-0 left-0 opacity-0 w-full h-full block cursor-pointer"
                                        onChange={(e) => { handleUpload(e) }}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </label>
                            </div>
                    }

                </div>
                {/* second input image */}
                <div className="relative">
                    {
                        (images.image2 || error.image2) &&
                        <span className="absolute top-8 right-2 z-10 cursor-pointer" onClick={() =>{
                            !error.image2 ? handleDelete(files?.image2.name, "image2"): handleCancel('image2')
                        } }>
                            <ImCross className="bg-white p-1 rounded-lg text-lg" />
                        </span>
                    }
                    {
                        (images.image2 || error.image2) ?
                            <img className="h-[150px] w-[200px] object-cover" src={(error.image2 ? brokenImage : images.image2)} alt="image2" />
                            :
                            <div className="flex flex-col space-y-2 pt-14 h-[150px] w-[200px] border border-dashed border-black text-center relative">
                                <h4 className="text-gray-500">Drop File</h4>
                                <h4 className="text-gray-500 ">Or</h4>
                                <label htmlFor="image2" className="cursor-pointer text-blue-600">
                                    Select File
                                    <input
                                        type="file"
                                        name="image2"
                                        id="image2"
                                        className="absolute top-0 left-0 opacity-0 w-full h-full block cursor-pointer"
                                        onChange={(e) => { handleUpload(e) }}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </label>
                            </div>
                    }
                </div>
                {/* third input image */}
                <div className="relative">
                    {
                        //delete button
                        (images.image3 || error.image3) && //if image or error encounter the icon will be shown
                        <span className="absolute top-8 right-2 z-10 cursor-pointer" onClick={() => {
                            !error.image3 ? handleDelete(files.image3.name, "image3"): handleCancel('image3')
                        }}>
                            <ImCross className="bg-white p-1 rounded-lg text-lg" />
                        </span>
                    }
                    {
                        (images.image3 || error.image3) ?
                            <img className="h-[150px] w-[200px] object-cover" src={(error.image3 ? brokenImage : images.image3)} alt="image3" />
                            :
                            <div className="flex flex-col space-y-2 pt-14 h-[150px] w-[200px] border border-dashed border-black text-center relative">
                                <h4 className="text-gray-500">Drop File</h4>
                                <h4 className="text-gray-500 ">Or</h4>
                                <label htmlFor="image3" className="cursor-pointer text-blue-600">
                                    Select File
                                    <input
                                        type="file"
                                        name="image3"
                                        id="image3"
                                        className="absolute top-0 left-0 opacity-0 w-full h-full block cursor-pointer"
                                        onChange={(e) => { handleUpload(e) }}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </label>
                            </div>
                    }                 
                </div>
            </div>
        </div>
    )


}

export default MultipleFileSeparateInput;

