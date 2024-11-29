import { useState } from "react";
import Overview from "./Overview"
import ListingDetails from "./ListingDetails"
import SelectAmenities from "./SelectAmenities"
import AddressAndLocation from "../profile/AddressAndLocation"
import DashboardHeaderTwo from "../../../layouts/headers/dashboard/DashboardHeaderTwo"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { useWriteContract } from "wagmi";
import ORWAERC721NFT from "../../../abi/ORWAERC721NFT.json";
import { setCarouselThumbs, selectProperty } from "../../../redux/features/propertySlice";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import env from "react-dotenv";


interface CarouselThumb {
   img: string;
   active?: string; // Optional, only for the first image
}
interface CarouselName {
   name: String;
}

const AddPropertyBody = () => {
   const pinataKey = env.PINATA_KEY;
   const dispatch = useDispatch();
   const { writeContract } = useWriteContract();
   const [carouselThumb, setCarouselThumb] = useState<CarouselThumb[]>([]);
   const [carouselName, setCarouselName] = useState<CarouselName[]>([]);
   const [fileData, setFileData] = useState<File[]>([]);

   const properties = useSelector(selectProperty);

   useDidMountEffect(() => {
      dispatch(setCarouselThumbs(carouselThumb));
   }, [carouselThumb, dispatch]);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files; // Get the selected files
      if (files) {
         const selectedFiles = Array.from(files);
         setFileData(selectedFiles); // Update state with selected files
     }
      const newCarouselThumb: CarouselThumb[] = []; // Initialize an empty array for the new images
      const newCarouselName: CarouselName[] = [];
      if (!files || files.length === 0) return;

      // Loop through each file and create the desired object structure
      for (let i = 0; i < files.length; i++) {
         const file = files[i];
         const imgPath = URL.createObjectURL(file); // Create a URL for the uploaded file

         // Push the new image object to the array
         newCarouselThumb.push({ img: imgPath });
         newCarouselName.push({ name: file.name });
      }

      // Update state with the new array
      setCarouselThumb(prevThumbs => [...prevThumbs, ...newCarouselThumb]);
      setCarouselName(prevNames => [...prevNames, ...newCarouselName]);
   };
   const handleRemoveFile = (index: number) => {
      setCarouselThumb(prevNames => prevNames.filter((_, i) => i !== index));
      setCarouselName(prevNames => prevNames.filter((_, i) => i !== index)); // Remove file by index
   };

   const handleMint = async () => {
      const progress = () => {

      };
      const formData = new FormData();
      fileData.forEach(element => {
         formData.append('file', element);
      });
      formData.append('data', JSON.stringify(properties))
      formData.append('pinataMetadata', JSON.stringify({ name: 'SQD' }));
      formData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));

      const res = await axios
         .post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxBodyLength: Infinity,
            headers: {
               //@ts-ignore
               'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
               'Authorization': `Bearer ${pinataKey}`,
            },
            onUploadProgress: progress
         }).catch(err => {
            if (axios.isAxiosError(err)) {
               console.error("Error response:", err.response?.data);
               console.error("Error status:", err.response?.status);
               console.error("Error headers:", err.response?.headers);
            } else {
               console.error("Unexpected error:", err);
            }
         });

      if(res) {
         console.log(res.data.IpfsHash);
         const token_uri = res.data.IpfsHash;
   
         writeContract({
            abi: ORWAERC721NFT,
            address: '0xde40d445a7027f2771cb4472aac2c92152a3be9b',
            functionName: 'mintToken',
            args: [token_uri]
         })
      }
   }

   return (
      <div className="dashboard-body">
         <div className="position-relative">
            <DashboardHeaderTwo title="Add New Property" />
            <h2 className="main-title d-block d-lg-none">Add New Property</h2>
            <Overview />
            <ListingDetails />

            <div className="bg-white card-box border-20 mt-40">
               <h4 className="dash-title-three">Photo & Video Attachment</h4>
               <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">File Attachment*</label>
                  {
                     carouselName.map((item: CarouselName, index) => (
                        <div key={index} className="attached-file d-flex align-items-center justify-content-between mb-15">
                           <span>{item.name}</span>
                           <Link to="#" className="remove-btn" onClick={() => handleRemoveFile(index)}><i className="bi bi-x"></i></Link>
                        </div>
                     ))
                  }
               </div>
               <div className="dash-btn-one d-inline-block position-relative me-3">
                  <i className="bi bi-plus"></i>
                  Upload File
                  <input type="file" id="uploadCV" name="uploadCV" placeholder="" multiple onChange={handleFileChange} />
               </div>
               <small>Upload file .jpg, .png, .mp4</small>
            </div>
            <SelectAmenities />
            <AddressAndLocation />

            <div className="button-group d-inline-flex align-items-center mt-30">
               <Link to="#" className="dash-btn-two tran3s me-3">Submit Property</Link>
            </div>
            <div className="button-group d-inline-flex align-items-center mt-50">
               <Link to="#" className="dash-btn-two tran3s me-3" onClick={handleMint}>Mint RWA Token</Link>
               <Link to="#" className="dash-cancel-btn tran3s">Cancel</Link>
            </div>
         </div>
      </div>
   )
}

export default AddPropertyBody
