import { useState } from "react";
import NumberNiceSelect from "../../../ui/NumberNiceSelect";

import { useDispatch } from 'react-redux';
import { setPropertyInfo } from "../../../redux/features/propertySlice";
import useDidMountEffect from "../../../hooks/useDidMountEffect";

interface PropertyData {
   sqft: string;
   bed: string;
   bath: string;
   kitchen?: string;
   parking_lot?: string;
   garden?: string;
}

const ListingDetails = () => {

   const dispatch = useDispatch();

   const [propertyData, setPropertyData] = useState<PropertyData>({
      sqft: '',
      bed: '',
      bath: '',
      kitchen: '',
      parking_lot: '',
      garden: '',
   });

   useDidMountEffect(() => {
      dispatch(setPropertyInfo(propertyData));
   }, [propertyData, dispatch]);

   const selectHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setPropertyData(prev => ({ ...prev, [name]: value }));
   }

   const handleChange = () => {

   }

   return (
      <div className="bg-white card-box border-20 mt-40">
         <h4 className="dash-title-three">Listing Details</h4>
         <div className="row align-items-end">
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Size in ft*</label>
                  <input type="text" placeholder="Ex: 3,210 sqft" name="sqft" onChange={selectHandler} />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Bedrooms*</label>
                  <NumberNiceSelect className="nice-select"
                     options={[
                        { value: 1, text: 0 },
                        { value: 2, text: 1 },
                        { value: 3, text: 2 },
                        { value: 4, text: 3 },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name="bed"
                     placeholder="" />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Bathrooms*</label>
                  <NumberNiceSelect className="nice-select"
                     options={[
                        { value: 1, text: 0 },
                        { value: 2, text: 1 },
                        { value: 3, text: 2 },
                        { value: 4, text: 3 },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name="bath"
                     placeholder="" />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Kitchens*</label>
                  <NumberNiceSelect className="nice-select"
                     options={[
                        { value: 1, text: 0 },
                        { value: 2, text: 1 },
                        { value: 3, text: 2 },
                        { value: 4, text: 3 },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name="kitchen"
                     placeholder="" />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Garages</label>
                  <NumberNiceSelect className="nice-select"
                     options={[
                        { value: 1, text: 1 },
                        { value: 2, text: 2 },
                        { value: 3, text: 3 },
                        { value: 4, text: 4 },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name="parking_lot"
                     placeholder="" />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Garage Size</label>
                  <input type="text" placeholder="Ex: 1,230 sqft" />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Year Built*</label>
                  <input type="text" placeholder="Type Year" />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Floors No*</label>
                  <NumberNiceSelect className="nice-select"
                     options={[
                        { value: 1, text: 0 },
                        { value: 2, text: 1 },
                        { value: 3, text: 2 },
                        { value: 4, text: 3 },
                     ]}
                     defaultCurrent={0}
                     onChange={handleChange}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="col-12">
               <div className="dash-input-wrapper">
                  <label htmlFor="">Description*</label>
                  <textarea className="size-lg" placeholder="Write about property..."></textarea>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ListingDetails;
