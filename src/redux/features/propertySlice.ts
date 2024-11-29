/* eslint-disable @typescript-eslint/ban-types */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import properties from '../../data/inner-data/ListingData';

interface CarouselThumb {
   img: string;
   active?: string;
}

interface PropertyInfo {
   sqft: string;
   bed: string;
   bath: string;
   kitchen?: string;
   parking_lot?: string;
   garden?: string;
}
interface Property {
   id: number;
   page: string;
   tag: string;
   tag_bg?: string;
   carousel_thumb: CarouselThumb[];
   thumb?: string;
   bg_img?: string;
   title: string;
   address?: string;
   location: string;
   property_info: PropertyInfo;
   price: number;
   price_text?: string;
   carousel?: string;
   type: string;
   status: string;
   amenities?: string[];
}

interface PropertyState {
   properties: Property[] | any[];
   property: Property | null;
}

const initialState: PropertyState = {
   properties: [],
   property: properties,
};

export const propertySlice = createSlice({
   name: 'properties',
   initialState,
   reducers: {
      addAmenity: (state, action: PayloadAction<string>) => {
         if (state.property && state.property.amenities) {
            if (!state.property.amenities.includes(action.payload)) {
               state.property.amenities.push(action.payload); // Add amenity if not already included
            }
         }
      },
      removeAmenity: (state, action: PayloadAction<string>) => {
         if (state.property && state.property.amenities) {
            state.property.amenities = state.property.amenities.filter(amenity => amenity !== action.payload); // Remove amenity
         }
      },
      clearAmenities: (state) => {
         if (state.property && state.property.amenities) {
            state.property.amenities = []; // Clear all amenities
         }
      },
      setCarouselThumbs: (state, action: PayloadAction<CarouselThumb[]>) => {
         if (state.property) {
            state.property.carousel_thumb = action.payload;
         }
      },
      setPropertyInfo: (state, action: PayloadAction<PropertyInfo>) => {
         if (state.property) {
            state.property.property_info = action.payload;
         }
      },
      setTitleInfo: (state, action: PayloadAction<string>) => {
         if (state.property) {
            state.property.title = action.payload;
         }
      },
      setCategoryInfo: (state, action: PayloadAction<string>) => {
         if (state.property) {
            state.property.type = action.payload;
         }
      },
      setListingTypeInfo: (state, action: PayloadAction<string>) => {
         if (state.property) {
            state.property.tag = action.payload;
         }
      },
      setPriceInfo: (state, action: PayloadAction<number>) => {
         if (state.property) {
            state.property.price = action.payload;
         }
      },
      setAddressInfo: (state, action: PayloadAction<string>) => {
         if (state.property) {
            state.property.address = action.payload;
         }
      },
      setLocationInfo: (state, action: PayloadAction<string>) => {
         if (state.property) {
            state.property.location = action.payload;
         }
      },
   },
});

export const { addAmenity, removeAmenity, clearAmenities,
   setCarouselThumbs, setPropertyInfo, setTitleInfo,
   setCategoryInfo, setListingTypeInfo, setPriceInfo,
   setAddressInfo, setLocationInfo
} = propertySlice.actions;

// Selectors
export const selectProperties = (state: { properties: PropertyState }) => state?.properties?.properties;
export const selectProperty = (state: { properties: PropertyState }) => state?.properties?.property;

export default propertySlice.reducer;