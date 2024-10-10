import Image from 'next/image'
import React from 'react'

export default function PreFooter() {
  return (
    <div>
        <h2 className='text-[48px] font-bold text-center'>আপনার সাদাকা জমা করুন</h2>
        <div className='flex items-center justify-center gap-2 mt-10'>
        <Image src='https://iili.io/dmTGlmF.png' alt='Bkash' width={86} height={38} />
        <p className='text-[32px]'>০১৩০৩৭৩১৫২৭</p>
        <Image src='https://iili.io/dyUt6BV.png' alt='Nagad Icon' width={56} height={43} className='ml-10'/>
        <p className='text-[32px]'>০১৩০৩৭৩১৫২৭</p>
        <Image src='https://iili.io/dmTGce1.png' alt='Islami bank' width={103} height={55} className='ml-10'/>
        <p className='text-[32px]'>{`২০৫০১৩৩০২০৫৪৪৩৭১৮, চিথলিয়া কেন্দ্রীয় জামে মসজিদ, শাখাঃ কুষ্টিয়া`}</p>
        </div>
    </div>
  )
}
