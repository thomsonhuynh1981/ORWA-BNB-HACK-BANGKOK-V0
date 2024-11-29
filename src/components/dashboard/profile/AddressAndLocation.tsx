import { useMemo, useState } from "react";
import NiceSelect from "../../../ui/NiceSelect";

import { useDispatch } from 'react-redux';

import { setAddressInfo, setLocationInfo } from "../../../redux/features/propertySlice";
import useDidMountEffect from "../../../hooks/useDidMountEffect";

const AddressAndLocation = () => {

   const dispatch = useDispatch();

   const countries = [
      { value: "1", text: "Afghanistan" },
      { value: "2", text: "Albania" },
      { value: "3", text: "Algeria" },
      { value: "4", text: "Andorra" },
      { value: "5", text: "Angola" },
      { value: "6", text: "Antigua and Barbuda" },
      { value: "7", text: "Argentina" },
      { value: "8", text: "Armenia" },
      { value: "9", text: "Australia" },
      { value: "10", text: "Austria" },
      { value: "11", text: "Azerbaijan" },
      { value: "12", text: "Bahamas" },
      { value: "13", text: "Bahrain" },
      { value: "14", text: "Bangladesh" },
      { value: "15", text: "Barbados" },
      { value: "16", text: "Belarus" },
      { value: "17", text: "Belgium" },
      { value: "18", text: "Belize" },
      { value: "19", text: "Thailand" },
      { value: "20", text: "Vietnam" },
   ];

   const cities = [
      { value: "1", text: "HoChiMinh" },
      { value: "2", text: "Tokyo" },
      { value: "3", text: "Delhi" },
      { value: "4", text: "Shanghai" },
      { value: "5", text: "Mumbai" },
      { value: "6", text: "Bangalore" },
   ];

   const [formData, setFormData] = useState({
      address: '',
      city: '1', // Default to first option
      country: '1', // Default to first option
      zipCode: '',
   });

   const selectHandler = () => { };

   const getCountryName = (value: string) => {
      const countryObj = countries.find(country => country.value === value);
      return countryObj ? countryObj.text : '';
   };

   const getCityName = (value: string) => {
      const cityObj = cities.find(city => city.value === value);
      return cityObj ? cityObj.text : '';
   };

   const fullAddress = useMemo(() => {
      const countryName = getCountryName(formData.country);
      const cityName = getCityName(formData.city);
      return `${formData.address}, ${cityName}, ${countryName}`;
   }, [formData]);

   const fullLocation = useMemo(() => {
      const countryName = getCountryName(formData.country);
      const cityName = getCityName(formData.city);
      return `${cityName}, ${countryName}`;
   }, [formData]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData(prevData => ({ ...prevData, [name]: value }));
   };

   useDidMountEffect(() => {
      dispatch(setAddressInfo(fullAddress));
   }, [fullAddress, dispatch]);

   useDidMountEffect(() => {
      dispatch(setLocationInfo(fullLocation));
   }, [fullLocation, dispatch]);

   return (
      <div className="bg-white card-box border-20 mt-40">
         <h4 className="dash-title-three">Address & Location</h4>
         <div className="row">
            <div className="col-12">
               <div className="dash-input-wrapper mb-25">
                  <label htmlFor="">Address*</label>
                  <input type="text" placeholder="19 Yawkey Way" name="address" onChange={handleChange} />
               </div>
            </div>
            <div className="col-lg-3">
               <div className="dash-input-wrapper mb-25">
                  <label htmlFor="">Country*</label>
                  <NiceSelect className="nice-select"
                     options={countries}
                     defaultCurrent={0}
                     onChange={handleChange}
                     name="country"
                     placeholder=""
                  />
               </div>
            </div>
            <div className="col-lg-3">
               <div className="dash-input-wrapper mb-25">
                  <label htmlFor="">City*</label>
                  <NiceSelect className="nice-select"
                     options={cities}
                     defaultCurrent={0}
                     onChange={handleChange}
                     name="city"
                     placeholder=""
                  />
               </div>
            </div>
            <div className="col-lg-3">
               <div className="dash-input-wrapper mb-25">
                  <label htmlFor="">Zip Code*</label>
                  <input type="number" placeholder="700000" />
               </div>
            </div>
            <div className="col-lg-3">
               <div className="dash-input-wrapper mb-25">
                  <label htmlFor="">State*</label>
                  <NiceSelect className="nice-select"
                     options={[
                        { value: "1", text: "Hanoi" },
                        { value: "2", text: "Tokyo" },
                        { value: "3", text: "HoChiMinh" },
                        { value: "4", text: "Shanghai" },
                        { value: "5", text: "Mumbai" },
                        { value: "6", text: "Bangalore" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
         </div>
         <div className="col-12">
            <div className="dash-input-wrapper mb-25">
               <label htmlFor="">Map Location*</label>
               <div className="position-relative">
                  <input type="text" placeholder="Vincom Center Dong Khoi" />
                  <button className="location-pin tran3s"><img src="/assets/images/dashboard/icon/icon_16.svg" alt="" className="lazy-img m-auto" /></button>
               </div>
               <div className="map-frame mt-30">
                  <div className="gmap_canvas h-100 w-100">
                     <iframe className="gmap_iframe h-100 w-100" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Vincom Center Dong Khoi&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AddressAndLocation
