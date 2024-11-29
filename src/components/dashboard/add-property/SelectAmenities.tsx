import { useDispatch } from 'react-redux';
import { addAmenity, removeAmenity } from '../../../redux/features/propertySlice';

const amenities: string[] = ["A/C & Heating", "Garages", "Swimming Pool", "Parking", "Lake View", "Garden", "Disabled Access", "Pet Friendly", "Ceiling Height", "Outdoor Shower", "Refrigerator", "Fireplace", "Wifi", "TV Cable", "Barbeque", "Laundry", "Dryer", "Lawn", "Elevator"];

const SelectAmenities = () => {

   const dispatch = useDispatch();

   // const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      const amenity = amenities[Number(value)];
      // Update selected amenities based on checkbox state
      if (checked) {
         // Add the amenity if checked
         dispatch(addAmenity(amenity));
      } else {
         // Remove the amenity if unchecked
         dispatch(removeAmenity(amenity));
      }
   };

   return (
      <div className="bg-white card-box border-20 mt-40">
         <h4 className="dash-title-three m0 pb-5">Select Amenities</h4>
         <ul className="style-none d-flex flex-wrap filter-input">
            {amenities.map((amenity, index) => (
               <li key={index}>
                  <input type="checkbox" name="Amenities" value={index} onChange={handleCheckboxChange} />
                  <label>{amenity}</label>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default SelectAmenities
