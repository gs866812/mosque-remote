import Image from 'next/image'
import React from 'react'

export default function PreFooter() {
  return (
    <div>
      <h2 className='lg:text-3xl text-2xl font-bold text-center mb-1'>আপনার সাদাকা জমা করুন</h2>
      <div className='flex items-center justify-center gap-3 flex-col lg:flex-row lg:flex-wrap'>
          <div className='flex items-center gap-2 lg:w-auto'>
            <Image src='https://iili.io/2JrpYu9.png' alt='Bkash' width={50} height={28} className='' />
            <p className='lg:text-xl text-2xl'>০১৩০৩৭৩১৫২৭</p>
          </div>
          <div className='flex items-center gap-2 lg:flex-row'>
            <Image src='https://iili.io/dyUt6BV.png' alt='Nagad Icon' width={42} height={20} className='' />
            <p className='lg:text-xl text-2xl'>০১৩০৩৭৩১৫২৭</p>
          </div>
        <div className='flex items-center gap-2 flex-col lg:flex-row justify-center'>
          <Image src='https://iili.io/dmTGce1.png' alt='Islami bank' width={110} height={60} className='' />
          <p className='lg:text-xl text-2xl flex'>২০৫০১৩৩০২০৫৪৪৩৭১৮<span className='hidden lg:block'>,</span></p>
        </div>
        <div>
          <p className='lg:text-2xl text-xl text-center'>{`চিথলিয়া কেন্দ্রীয় জামে মসজিদ, শাখাঃ কুষ্টিয়া`}</p>
        </div>
      </div>
    </div>
  )
}
