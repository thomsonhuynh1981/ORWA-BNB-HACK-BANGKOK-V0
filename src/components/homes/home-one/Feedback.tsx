import Slider from 'react-slick'

interface DataType {
   id: number;
   img: string;
   title: string;
   country: string;
   desc: string;
   rating_count: number;
   total_rating: number;
}

const feedback_data: DataType[] = [
   {
      id: 1,
      img: "/assets/images/media/img_01.jpg",
      title: "Mai Thanh Nha",
      country: "Ho Chi Minh City, Vietnam",
      desc: "ORWA is transforming real estate! The model makes property investment easy, even for beginners.",
      rating_count: 0,
      total_rating: 0,
   },
   {
      id: 2,
      img: "/assets/images/media/img_02.jpg",
      title: "Nguyen Thi Lieu",
      country: "Ho Chi Minh City, Vietnam",
      desc: "ORWA is a game-changer for real estate, providing a transparent solution, using blockchain to protect assets.",
      rating_count: 0,
      total_rating: 0
   },
   {
      id: 3,
      img: "/assets/images/media/img_03.jpg",
      title: "Nguyen Thi Hieu",
      country: "Da Nang, Vietnam",
      desc: "ORWA elevates real estate investment with a professional team, innovative platform, making property accessible for all!",
      rating_count: 0,
      total_rating: 0
   },
]

const Feedback = () => {

   const settings = {
      dots: true,
      arrows: false,
      centerPadding: '0px',
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: true,
      autoplaySpeed: 300000
   }

   return (
      <div className="feedback-section-one position-relative z-1 pt-70 md-pt-50 pb-80 md-pb-60">
         <div className="main-content m-auto">
            <Slider {...settings} className="feedback-slider-one position-static">
               {feedback_data.map((item) => (
                  <div key={item.id} className="item">
                     <div className="feedback-block-one text-center">
                        <div className="row align-items-center">
                           <div className="col-md-3">
                              <img src={item.img} alt="" className="rounded-circle m-auto avatar" />
                              <h6 className="fs-20 m0 pt-10">{item.title}</h6>
                              <span className="fs-16">{item.country}</span>
                           </div>
                           <div className="col-md-6">
                              <blockquote>{item.desc}</blockquote>
                           </div>
                           <div className="col-md-3">
                              <img src="/assets/images/assets/rating_01.png" alt="" className="lazy-img m-auto" />
                              <p className="text-center m0 pt-10"><span className="fw-500 color-dark">{item.total_rating}k rating</span> ({item.rating_count} Rating)</p>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </Slider>
         </div>
      </div>
   )
}

export default Feedback
