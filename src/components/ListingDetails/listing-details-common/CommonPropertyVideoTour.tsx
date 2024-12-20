import { useState } from "react";
import VideoPopup from "../../../modals/VideoPopup";

const CommonPropertyVideoTour = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <h4 className="mb-40">Video Tour</h4>
         <div className="bg-white shadow4 border-20 p-15">
            <div className="position-relative border-15 image-bg overflow-hidden z-1">
               <img src="/assets/images/listing/img_47.jpg" alt="" className="lazy-img w-100" />
               <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="video-icon tran3s rounded-circle d-flex align-items-center justify-content-center" data-fancybox >
                  <i className="fa-thin fa-play"></i>
               </a>
            </div>
         </div>
         {/* video modal start */}
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"vIBwM5oADUk"}
         />
         {/* video modal end */}
      </>
   )
}

export default CommonPropertyVideoTour;
