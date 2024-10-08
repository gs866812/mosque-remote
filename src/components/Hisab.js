import React from 'react'
import 'moment/locale/bn-bd';
import moment from 'moment';
import Image from 'next/image';
moment.locale('bn-bd');

export default function Hisab() {
    const currentMonth = moment(new Date()).format('MMMM');

  return (
    <div className='mx-auto w-[80%] rounded-md'>
        <div className='flex items-center justify-between'>
            <h2 className='text-[#0080C5] text-4xl font-bold'>মাসিক আয় ব্যায়ের হিসাবঃ</h2>
            <h2 className='text-2xl text-[#0080C5]'>{currentMonth}</h2>
        </div>

        <div className='flex items-center justify-between gap-5 mt-8 mb-10'>
            <div className='w-1/3 flex flex-col items-center border px-16 py-12 rounded-md shadow-[0_5px_10px_rgba(0,128,197,0.29)] gap-3'>
                <Image src='https://iili.io/dp65cGI.png' alt='' height={200} width={200}/>
                <h2 className='text-[#0080C5] text-2xl font-bold'>৬৭,৫৬০ ৳</h2>
                <p className='text-xl'>সর্বমোট ইনকাম</p>
            </div>
            <div className='w-1/3 flex flex-col items-center border px-16 py-12 rounded-md shadow-[0_5px_10px_rgba(0,128,197,0.29)] gap-3'>
                <Image src='https://iili.io/dp6513X.png' alt='' height={200} width={200}/>
                <h2 className='text-red-500 text-2xl font-bold'>৬৭,৫৬০ ৳</h2>
                <p className='text-xl'>সর্বমোট ইনকাম</p>
            </div>
            <div className='w-1/3 flex flex-col items-center border px-16 py-12 rounded-md shadow-[0_5px_10px_rgba(0,128,197,0.29)] gap-3'>
                <Image src='https://iili.io/dp65aCN.png' alt='' height={200} width={200}/>
                <h2 className='text-green-500 text-2xl font-bold'>৬৭,৫৬০ ৳</h2>
                <p className='text-xl'>সর্বমোট ইনকাম</p>
            </div>
        </div>
    </div>
  )
}
