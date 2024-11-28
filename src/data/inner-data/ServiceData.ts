interface DataType {
   id: number;
   page: string;
   icon: string;
   title: string;
   desc: string;
   btn: string;
}[]

const service_data: DataType[] = [
   {
      id: 1,
      page: "service_1",
      icon: "/assets/images/icon/icon_69.svg",
      title: "Add Property",
      btn: "Property List",
      desc: "Streamline real estate management, tokenize assets, and unlock global investment potential.",
   },
   {
      id: 2,
      page: "service_1",
      icon: "/assets/images/icon/icon_70.svg",
      title: "Stake and Certify",
      btn: "Stake N Cert",
      desc: "Secure assets, earn rewards, and ensure transparency in real-world asset management.",
   },
   {
      id: 3,
      page: "service_1",
      icon: "/assets/images/icon/icon_71.svg",
      title: "Owner and Auction",
      btn: "Owner N Auction",
      desc: "Empower ownership, enable asset auctions, and maximize value through transparency.",
   },
   {
      id: 4,
      page: "service_1",
      icon: "/assets/images/icon/icon_69.svg",
      title: "Mortgage",
      btn: "Buy Home",
      desc: "Explore ORWA’s 2 million+ homes and uncover your ideal living space.",
   },
   {
      id: 5,
      page: "service_1",
      icon: "/assets/images/icon/icon_70.svg",
      title: "Consulting",
      btn: "Rent Home",
      desc: "Discover a rental you'll love on ORWA, thanks to 35+ filters.",
   },
   {
      id: 6,
      page: "service_1",
      icon: "/assets/images/icon/icon_71.svg",
      title: "Property Managements",
      btn: "Sell Home",
      desc: "List, sell, thrive – with our top-notch real estate agency.",
   },

]

export default service_data;