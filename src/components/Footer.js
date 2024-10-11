'use client';
import { ContextData } from '@/app/DataProvider';
import { useContext } from "react";
import Marquee from 'react-fast-marquee';

export default function Footer() {
    const { hadithList } = useContext(ContextData);
    console.log(hadithList);

    return (

        <div className='w-full flex justify-center items-center bg-[#134834] text-white py-3'>
            <Marquee>
            {
                hadithList && hadithList.map((hadith, idx) => <p className='text-[32px] py-2' key={idx}>
                    {`${hadith.hadithList}`}
                </p>)
            }
            </Marquee>
        </div>

    )
}
