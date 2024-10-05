import Image from 'next/image'
import React from 'react'

export default function Header() {
    return (
        <div className='w-full'>
            <div className='bg-[#0080C5] text-white text-center py-1'>
                <h2 className='font-poppins font-semibold text-xl leading-10'
                >بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ

                </h2>
            </div>

            <div className='bg-[#FFDD2E] text-gray-800 text-center py-3'>
                <h2 className='font-poppins font-semibold text-2xl leading-10'>
                    চিথলিয়া কেন্দ্রীয় জামে মসজিদ
                </h2>
            </div>

            <div className='flex gap-5 justify-between my-4 items-center w-[80%] mx-auto'>
                <div>
                    <Image src='https://iili.io/dbgU2NS.png' alt='Mosque Icon' width={60} height={60} />
                </div>
                <div>
                    <h2 className='text-4xl font-extrabold text-gray-800'> বর্তমান সর্বমোট জমাকৃত অর্থঃ ১২,৫০,৩৫০৳ </h2>
                </div>
                <div>
                    <Image src='https://iili.io/dbgU2NS.png' alt='Mosque Icon' width={60} height={60} />
                </div>
            </div>

        </div>
    )
}
