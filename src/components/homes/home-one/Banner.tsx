import DropdownOne from "../../search-dropdown/home-dropdown/DropdownOne"

const Banner = () => {
   return (
      <div className="hero-banner-one bg-pink z-1 pt-225 xl-pt-200 pb-250 xl-pb-150 lg-pb-100 position-relative">
         <div className="container position-relative">
            <div className="row">
               <div className="col-xxl-10 col-xl-9 col-lg-10 col-md-10 m-auto">
                  <h1 className="hero-heading text-center">ORWA - OLYM3 Real-World <span className="d-inline-block position-relative">Assets <img src="/assets/images/shape/shape_01.svg" alt="" className="lazy-img" /></span></h1>
                  <p className="fs-24 color-dark text-center pt-35 pb-35">Transforming Real Estate Investment for Everyone, Everywhere – ORWA by OLYM3.</p>
               </div>
            </div>
            <div className="row">
               <div className="col-xxl-10 m-auto">
                  <div className="search-wrapper-one layout-one bg position-relative">
                     <div className="bg-wrapper">
                        <DropdownOne style={false} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <img src="/assets/images/assets/ils_01.svg" alt="" className="lazy-img shapes w-100 illustration" />
      </div>
   )
}

export default Banner