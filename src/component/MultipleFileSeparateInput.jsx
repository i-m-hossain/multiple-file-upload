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

        if (!targetFile?.name.match(/\.(jpg|png|jpeg|gif|JPG|PNG|JPEG|GIF)$/)) { //todo all file support including uppercase 
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
                {/* ------ Mapping three inputs------ */}
                {[1,2,3].map((item, i)=>(
                    <div className="relative">
                    {
                        (images[`image${item}`]|| error[`image${item}`]) &&
                        <span className="absolute top-8 right-2 z-10 cursor-pointer" onClick={() =>     
                            {!error[`image${item}`] ? handleDelete(files[`image${item}`]?.name, `image${item}`): handleCancel(`image${item}`)}
                        }>
                            <ImCross className="bg-white p-1 rounded-lg text-lg" />
                        </span>
                    }
                    {
                        (images[`image${item}`] || error[`image${item}`]) ?
                            <img className="h-[150px] w-[200px] object-cover" src={(error[`image${item}`] ? brokenImage : images[`image${item}`])} alt={`${item}`} />
                            :
                            <div className="flex flex-col space-y-2 pt-14 h-[150px] w-[200px] border border-dashed border-black text-center relative">
                                <h4 className="text-gray-500">Drop File</h4>
                                <h4 className="text-gray-500 ">Or</h4>
                                <label htmlFor="image1" className="cursor-pointer text-blue-600">
                                    Select File
                                    <input
                                        type="file"
                                        name={`image${item}`}
                                        id={`image${item}`}
                                        className="absolute top-0 left-0 opacity-0 w-full h-full block cursor-pointer"
                                        onChange={(e) => { handleUpload(e) }}
                                        accept="image/png, image/jpg, image/jpeg, image/gif, image/PNG, image/JPG, image/JPEG, image/GIF"
                                    />
                                </label>
                            </div>
                    }
                </div>
                ))}
                
            </div>
        </div>
    )


}

export default MultipleFileSeparateInput;

