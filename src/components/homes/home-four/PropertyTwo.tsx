import { Link } from "react-router-dom"
//import feature_listing_data from "../../../data/home-data/FeaturedListingData"

const PropertyTwo = () => {
   return (
      <div className="property-listing-one mt-170 xl-mt-120">
         <div className="container container-large">
            <div className="position-relative">
               <div className="title-one mb-25 lg-mb-10">
                  <h3>Featured Listing</h3>
                  <p className="fs-22 mt-xs">Explore featured properties for sale.</p>
               </div>

               <div className="section-btn text-center md-mt-60">
                  <Link to="/listing_06" className="btn-eight"><span>Explore All</span> <i className="bi bi-arrow-up-right"></i></Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PropertyTwo
