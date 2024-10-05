import React from 'react'

export default function HomePage() {
    const date = new Date().getFullYear();
  return (
    <div className='mx-auto w-[80%] rounded-md shadow-[5px_0_10px_rgba(0,128,197,0.29)]'>
        <div className='bg-[#0080C5] text-white flex items-center justify-center py-2 text-xl rounded-t-md'>
            <h2 className='w-[70%] flex justify-center'>দান দাতাগনের নাম</h2>
            <h2 className='w-[30%] flex justify-center'>খরচের বিবরনি</h2>
        </div>


        <div className='bg-[#0080C5] h-[20px] rounded-b-md mt-5'>
            {date}
        </div>
    </div>
  )
}
