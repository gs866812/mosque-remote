'use client';
import { ContextData } from '@/app/DataProvider';
import { useContext } from "react";
// import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay'; // Import autoplay styles
import { Autoplay } from 'swiper/modules';

export default function Footer() {
    const { hadithList } = useContext(ContextData);

    return (

        <div className='w-full bg-[#134834] text-white'>
            <Swiper
                spaceBetween={10}
                centeredSlides={true}
                loop={true}
                speed={10000}
                autoplay={{
                    delay: 30000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="text-center"
            >
                {hadithList && hadithList.map((hadith, idx) => 
                <SwiperSlide key={idx}>
                    <p className='text-[18px] py-2'>
                    {`${hadith.hadithList}`}
                </p>
                </SwiperSlide>
            )}
            </Swiper>

        </div>

    )
}
