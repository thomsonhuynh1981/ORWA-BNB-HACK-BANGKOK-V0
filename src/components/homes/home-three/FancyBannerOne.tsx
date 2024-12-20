/* eslint-disable no-mixed-spaces-and-tabs */

interface DataType {
   id: number;
   flag: string;
   title: string;
   desc: string;
}[]

const location_data: DataType[] = [
   {
      id: 1,
      flag: "/assets/images/logo/flag_01.png",
      title: "United States",
      desc: "32 link road, Mega Mall. California, USA",
   },
   {
      id: 2,
      flag: "/assets/images/logo/flag_02.png",
      title: "Brazil",
      desc: "32 link road, Mega Mall. California, USA",
   },
   {
      id: 3,
      flag: "/assets/images/logo/flag_03.png",
      title: "Russia",
      desc: "32 link road, Mega Mall. California, USA",
   },
   {
      id: 4,
      flag: "/assets/images/logo/flag_04.png",
      title: "Congo",
      desc: "32 link road, Mega Mall. California, USA",
   },
   {
      id: 5,
      flag: "/assets/images/logo/flag_05.png",
      title: "India",
      desc: "32 link road, Mega Mall. California, USA",
   },
   {
      id: 6,
      flag: "/assets/images/logo/flag_06.png",
      title: "Australia",
      desc: "32 link road, Mega Mall. California, USA",
   },
]

interface CountryDataType {
   title: string;
   class_name?: string;
   country: string[];
}[]

const country_data: CountryDataType[] = [
   {
      title: "Asia Pacific",
      class_name: "d-flex flex-wrap",
      country: ["Australia", "Dubai", "India", "Singapore", "Hong Kong"],
   },
   {
      title: "South America",
      country: ["United States", "Canada", "Argentina",],
   },
   {
      title: "European",
      class_name: "d-flex flex-wrap",
      country: ["Germany", "France", "Italy", "Netherlands", "Switzerland", "Spain"],
   },
   {
      title: "South America",
      country: ["Morocco", "South Africa"],
   },
]

const FancyBannerOne = () => {
   return (
      <div className="fancy-banner-six mt-160 xl-mt-140 lg-mt-100">
         <div className="container container-large">
            <div className="bg-wrapper position-relative z-1 pt-85 md-pt-50 pb-140 md-pb-100 ps-4 pe-4">
               <div className="row">
                  <div className="col-xl-7 col-lg-8 m-auto">
                     <div className="title-one text-center pe-xxl-2 ps-xxl-2">
                        <h2 className="font-garamond text-white">Where you are, You will find us every <em>where <span>easily</span></em> <span className="star-shape"><img src="/assets/images/shape/shape_37.svg" alt="" className="lazy-img" /></span></h2>
                     </div>
                  </div>
               </div>
               <div className="map-wrapper position-relative me-auto ms-auto mt-100 xl-mt-50 mb-50">
                  <img src="/assets/images/assets/map_01.svg" alt="" className="lazy-img w-100" />
                  {location_data.map((item) => (
                     <div key={item.id} className="location-pin">
                        <div className="dot-marker rounded-circle"></div>
                        <div className="map-info tran3s d-flex">
                           <img src={item.flag} alt="" className="lazy-img flag" />
                           <div className="info">
                              <h6>{item.title}</h6>
                              <span>{item.desc}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="country-list d-flex flex-wrap">
                  {country_data.map((item, i) => (
                     <div key={i} className="list-block">
                        <div className="title">{item.title}</div>
                        <ul className="style-none d-flex flex-wrap">
                           {item.country.map((country, index) => (<li key={index}>{country}</li>))}
                        </ul>
                     </div>
                  ))}
               </div>

               <div className="text-slide-wrapper">
                  <div className="marquee">
                     <p>
                        Dubai . America . Canada .
                     </p>
                     <p>
                        Dubai . America . Canada .
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBannerOne
