import { Link } from "react-router-dom";

interface DataType {
   id: number;
   class_name?: string;
   title: string;
   address_1: string;
   address_2?: string;
}

const address_data: DataType[] = [
   {
      id: 1,
      title: "We’r always happy to help.",
      address_1: "contact@olym3.com"
   },
   {
      id: 2,
      class_name: "skew-line",
      title: "Our hotline number",
      address_1: "+84 974 63 9191,",
      address_2: "+84 974 63 9191",
   },
   {
      id: 3,
      title: "Live chat",
      address_1: "www.ORWAlivechat.com"
   },
]

const AddressBanner = ({ style }: any) => {
   return (
      <div className={`address-banner mt-120 lg-mt-80 ${style ? "mb-140" : ""}`}>
         <div className="container container-large">
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-between">
               {address_data.map((item) => (
                  <div key={item.id} className={`block position-relative ${item.class_name} z-1 mt-25`}>
                     <div className="d-xl-flex align-items-center">
                        <div className="icon rounded-circle d-flex align-items-center justify-content-center"><img src="/assets/images/icon/icon_39.svg" alt="" className="lazy-img" /></div>
                        <div className="text">
                           <p className="fs-22">{item.title}</p>
                           <Link to="#" className="tran3s">{item.address_1}</Link>
                           {item.address_2 && <> {" "} <Link to="#" className="tran3s">{item.address_2}</Link></>}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default AddressBanner
