import React, { useState } from "react";
import NiceSelect from "../../../ui/NiceSelect";

import { useDispatch } from 'react-redux';
import { setTitleInfo, setCategoryInfo, setListingTypeInfo, setPriceInfo } from "../../../redux/features/propertySlice";
import useDidMountEffect from "../../../hooks/useDidMountEffect";

const Overview = () => {

   const dispatch = useDispatch();

   const categories = [
      { value: "1", text: "Apartments" },
      { value: "2", text: "Condos" },
      { value: "3", text: "Houses" },
      { value: "4", text: "Industrial" },
      { value: "5", text: "Villas" },
   ];

   const listingTypeContent = ['ALL', 'FOR BUY', 'FOR SELL', 'FOR RENT'];
   const [title, setTitle] = useState('');
   const [category, setCategory] = useState('');
   const [listingType, setListingType] = useState(listingTypeContent[0]);
   const [price, setPrice] = useState(0);

   useDidMountEffect(() => {
      dispatch(setTitleInfo(title));
   }, [title, dispatch]);

   useDidMountEffect(() => {
      dispatch(setCategoryInfo(category));
   }, [category, dispatch]);

   useDidMountEffect(() => {
      dispatch(setListingTypeInfo(listingType));
   }, [listingType, dispatch]);

   useDidMountEffect(() => {
      dispatch(setPriceInfo(price));
   }, [price, dispatch]);

   const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setListingType(listingTypeContent[Number(event.target.value) - 1]);
   };
   
   const getCategory = (index: string) => {
      const categoryObj = categories.find((item) => item.value === index); 
      return categoryObj ? categoryObj.text : '';  
   }

   const handlePropertyTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
   }
   const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(Number(event.target.value));
   }
   const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(getCategory(event.target.value));
   }

   return (
      <div className="bg-white card-box border-20">
         <h4 className="dash-title-three">Overview</h4>
         <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Property Title*</label>
            <input type="text" placeholder="Your Property Name" value={title} onChange={handlePropertyTitle}/>
         </div>
         <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Description*</label>
            <textarea className="size-lg" placeholder="Write about property..."></textarea>
         </div>
         <div className="row align-items-end">
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Category*</label>
                  <NiceSelect className="nice-select"
                     options={categories}
                     defaultCurrent={0}
                     onChange={handleCategory}
                     name="category"
                     placeholder="" />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Listed in*</label>
                  <NiceSelect className="nice-select"
                     options={[
                        { value: "1", text: "All Listing" },
                        { value: "2", text: "Buy" },
                        { value: "3", text: "Sell" },
                        { value: "4", text: "Rent" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Price*</label>
                  <input type="text" placeholder="Your Price" value={price} onChange={handlePrice} />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Yearly Tax Rate*</label>
                  <input type="text" placeholder="Tax Rate" />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Overview;
