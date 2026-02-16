import bannerimg01 from '../assets/banner01.jpg'
import bannerimg02 from '../assets/banner02.jpg'
import bannerimg03 from '../assets/banner03.jpg'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const Slider = () => {
  return (
    <div className="w-full h-[300px] md:h-[450px] lg:h-[450px]">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        effect="fade"
        speed={800}
        loop
        autoplay={{ delay: 3000 }}
        className="h-full"
      >
        <SwiperSlide className="h-full">
          <img
            src={bannerimg01}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide className="h-full">
          <img
            src={bannerimg02}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide className="h-full">
          <img
            src={bannerimg03}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>


  );
}

export default Slider;
