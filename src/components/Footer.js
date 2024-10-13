'use client';
import { ContextData } from '@/app/DataProvider';
import { useContext } from "react";
import Marquee from 'react-fast-marquee';

export default function Footer() {
    const { hadithList } = useContext(ContextData);
    console.log(hadithList);

    return (

        <div className='w-full flex justify-center items-center bg-[#134834] text-white py-3'>
            <Marquee speed={30}>
            {
                hadithList && hadithList.map((hadith, idx) => <p className='text-2xl py-1' key={idx}>
                    {`${hadith.hadithList}`}
                </p>)
            }
            </Marquee>
        </div>

    )
}
