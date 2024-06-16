import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
const UploadButton = ({Verification}) => {
  const [loadingToastId, setLoadingToastId] = useState(null);
  const handleFileChange = async (event) => {
   
    let files = event.target.files[0];
    const formData = new FormData();
    formData.append('files', files);
    try {
          if(files) setLoadingToastId(true);

      const uploadResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/upload`, {
        method: "POST",
    
        body:formData,
        credentials: 'include',
      });
      if (uploadResponse.ok) {
        let resp=await uploadResponse.json()
        setLoadingToastId(null)// Dismiss the loading toast
        toast.success(resp.message); // Create a new success toast
        Verification()
        files=null;
        window.location.reload();
        return;
      } else {
        const errorResp = await uploadResponse.json();
        setLoadingToastId(null) // Dismiss the loading toast
        toast.error(errorResp.message); // Create a new error toast
        return;
      }
    } catch (error) {
      console.log("error");
    }
  };
 useEffect(()=>{
 if(loadingToastId){
  toast.loading("Uploading")
 }
 },[loadingToastId])
  return (<>
    <div className="bottom-box">
      <div className="upload-button">
        <FiUpload /> <input type="file" onChange={handleFileChange} />{" "}
        <p>|       Upload</p>
      </div>
    </div>
    </>
  );
};

export default UploadButton;
