import Image from 'next/image'
import React from 'react'

export default function PreFooter() {
  return (
    <div>
      <h2 className='lg:text-4xl text-2xl font-bold text-center mb-8'>আপনার সাদাকা জমা করুন</h2>
      <div className='flex items-center justify-center gap-3 flex-col lg:flex-row lg:flex-wrap'>
          <div className='flex items-center gap-2 lg:flex-row lg:w-auto'>
            <Image src='https://iili.io/dmTGlmF.png' alt='Bkash' width={86} height={38} />
            <p className='lg:text-[32px] text-2xl'>০১৩০৩৭৩১৫২৭</p>
          </div>
          <div className='flex items-center gap-2 lg:flex-row'>
            <Image src='https://iili.io/dyUt6BV.png' alt='Nagad Icon' width={56} height={43} className='' />
            <p className='lg:text-[32px] text-2xl'>০১৩০৩৭৩১৫২৭</p>
          </div>
        <div className='flex items-center gap-2 flex-col lg:flex-row justify-center'>
          <Image src='https://iili.io/dmTGce1.png' alt='Islami bank' width={120} height={60} className='' />
          <p className='lg:text-[32px] text-2xl flex'>২০৫০১৩৩০২০৫৪৪৩৭১৮<span className='hidden lg:block'>,</span></p>
        </div>
        <div>
          <p className='lg:text-3xl text-xl text-center'>{`চিথলিয়া কেন্দ্রীয় জামে মসজিদ, শাখাঃ কুষ্টিয়া`}</p>
        </div>
      </div>
    </div>
  )
}
