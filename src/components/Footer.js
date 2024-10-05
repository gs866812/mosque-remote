import Image from 'next/image'
import React from 'react'

export default function Footer() {
    return (
        <div>
            <div className='text-center text-4xl text-gray-800 font-extrabold'>
                <h2>
                    আপনার সাদাকা জমা করুন
                </h2>
            </div>

            <div className='flex gap-5 justify-between my-4 items-center w-[80%] mx-auto'>
                <div><Image src='https://iili.io/dbgU2NS.png' alt='Mosque Icon' width={60} height={60} /></div>
                <div className='flex gap-2 items-center justify-center'>
                    <div className='flex justify-center items-center gap-2'>
                        <Image src='https://iili.io/dmTGlmF.png' alt='Bkash Icon' width={80} height={30} />
                        <p><span className='font-bold'>বিকাশ নাম্বারঃ ০১৭১২ ৩৪৫৬৭৮ </span></p>
                    </div>
                    <div className='flex justify-center items-center gap-1'>
                        <Image src='https://iili.io/dmTGYdB.png' alt='Nagad Icon' width={50} height={30} />
                        <p><span className='font-bold'>বিকাশ নাম্বারঃ ০১৭১২ ৩৪৫৬৭৮ </span></p>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <Image src='https://iili.io/dmTGce1.png' alt='Islami bank Icon' width={120} height={30} />
                        <p><span className='font-bold'>ইসলামি ব্যংকঃ</span> </p>
                    </div>

                </div>
                <div><Image src='https://iili.io/dbgU2NS.png' alt='Mosque Icon' width={60} height={60} /></div>
            </div>


            <div className='mx-auto flex justify-center bg-[#0080C5] text-white py-2'>
                <p>{`
                    রসুলুল্লাহ সাঃ বলেন, 'সাদকা করলে কোনও মানুষের সম্পদ কমে না। (তিরমিজি, ইবনে মাজাহ)
                `}</p>
            </div>
        </div>
    )
}
