import feature_data from "../../data/home-data/FeatureData";
import Count from "./Count";

const CardStyleTwo = () => {
   return (
      <div className="row gx-lg-5 align-items-center mt-120 lg-mt-50">
         <div className="col-lg-3">
            <div className="card-style-three mt-40">
               <div className="bg-wrapper text-center">
                  <h3>0<Count number={3} />+</h3>
                  <p>Years Experience <br />with proud.</p>
               </div>
            </div>
         </div>

         <div className="col-lg-9">
            <div className="row gx-xl-5">
               {feature_data.filter((items) => items.page === "home_three_feature_2").map((item) => (
                  <div key={item.id} className="col-md-4">
                     <div className="card-style-four mt-40">
                        <div className="icon rounded-circle d-flex align-items-center justify-content-center position-relative style-two">
                           <img src={item.icon ? item.icon : ""} alt="" className="lazy-img" />
                        </div>
                        <h5 className="mt-35 mb-15">{item.title}</h5>
                        <p>{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default CardStyleTwo;
