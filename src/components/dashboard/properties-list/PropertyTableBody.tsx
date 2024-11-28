import { Link } from "react-router-dom";

interface DataType {
   id: number;
   title: string;
   address: string;
   totalnfts: number;
   date: string;
   view: number;
   img: string;
   status: string;
   status_bg?: string;
}

const list_data: DataType[] = [
   {
      id: 1,
      title: "Vincom Center Dong Khoi",
      address: "72 Le Thanh Ton, Dist 1, HCMC, Vietnam",
      totalnfts: 1000000,
      date: "09 Nov, 2024",
      view: 1210,
      img: "/assets/images/dashboard/img_01a.jpg",
      status: "Active",
   },
   {
      id: 2,
      title: "Landmark 81",
      address: "Vinhomes Central Park, HCMC, Vietnam",
      totalnfts: 5000000,
      date: "09 Nov, 2024",
      view: 0,
      img: "/assets/images/dashboard/img_02a.jpg",
      status: "Active",
      status_bg: "active"
   },
   {
      id: 3,
      title: "Luxury villa in Dal lake",
      address: "Muza link road, ca, usa",
      totalnfts: 0,
      date: "09 Nov, 2024",
      view: 0,
      img: "/assets/images/dashboard/img_03.jpg",
      status: "Processing",
      status_bg: "processing",
   },
   {
      id: 4,
      title: "Wooden World",
      address: "Board Baxar, Califronia, USA",
      totalnfts: 63300,
      date: "09 Nov, 2024",
      view: 970,
      img: "/assets/images/dashboard/img_04.jpg",
      status: "Active",
   },
   {
      id: 5,
      title: "Orkit Villa",
      address: "Green Road, Uttara, BD",
      totalnfts: 72000,
      date: "09 Nov, 2024",
      view: 2320,
      img: "/assets/images/dashboard/img_05.jpg",
      status: "Active",
   },
   {
      id: 6,
      title: "Galaxy Flat",
      address: "Mirpur 10, dhaka, BD",
      totalnfts: 0,
      date: "09 Nov, 2024",
      view: 1210,
      img: "/assets/images/dashboard/img_01.jpg",
      status: "Refuse",
      status_bg: "refuse"
   },
   {
      id: 7,
      title: "White House villa",
      address: "Ranchview, California, USA",
      totalnfts: 0,
      date: "09 Nov, 2024",
      view: 0,
      img: "/assets/images/dashboard/img_02.jpg",
      status: "Pending",
      status_bg: "pending"
   },
]

const PropertyTableBody = () => {
   return (
      <tbody className="border-0">
         {list_data.map((item) => (
            <tr key={item.id}>
               <td>
                  <div className="d-lg-flex align-items-center position-relative">
                     <img src={item.img} alt="" className="p-img" />
                     <div className="ps-lg-4 md-pt-10">
                        <Link to="#" className="property-name tran3s color-dark fw-500 fs-20 stretched-link">{item.title}</Link>
                        <div className="address">{item.address}</div>
                        <strong className="price color-dark">Total NFT Issued: {item.totalnfts}</strong>
                     </div>
                  </div>
               </td>
               <td>{item.date}</td>
               <td>{item.view}</td>
               <td>
                  <div className={`property-status ${item.status_bg}`}>{item.status}</div>
               </td>
               <td>
               <div className="button-group d-inline-flex align-items-right mt-30">
                     <Link
                        to="https://google.com"
                        className={`dash-btn-two tran3s me-3 ${item.status !== "Active" ? "disabled" : ""}`}
                        style={{ pointerEvents: item.status === "Active" ? "auto" : "none", opacity: item.status === "Active" ? 1 : 0.5 }}
                     >
                        Release NFTs
                     </Link>
                  </div>
               </td>
               
            </tr>
         ))}
      </tbody>
   )
}

export default PropertyTableBody
