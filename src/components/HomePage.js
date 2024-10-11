"use client";
import { ContextData } from '@/app/DataProvider';
import { useContext } from "react";
import BalanceHeader from './BalanceHeader';
import PreFooter from './PreFooter';

export default function HomePage() {
  const { donorList, convertEnglishToBengali, convertBengaliToEnglish, formatNumberWithCommas, costingList } = useContext(ContextData);
  const date = costingList[0]?.date;
  const currentCosting = costingList.filter(costing => costing.date === date);

  return (
    <div className='w-full bg-[#f9f9ed] py-5 mx-auto'>
      <div>
        <BalanceHeader />
      </div>

      <div className='w-[95%] border-[3px] border-[#D39A41] mx-auto mt-5 rounded-3xl shadow-[5px_0_10px_rgba(0,128,197,0.29)] flex justify-between items-start overflow-hidden h-[380px] relative'>
        <hr className='border-[2px] border-[#D39A41] rotate-90 absolute bottom-0 left-[145px] w-[592px]' />
        <hr className='border-[2px] border-[#D39A41] rotate-90 absolute bottom-0 left-[580px] w-[592px]' />
        <hr className='border-[2px] border-[#D39A41] rotate-90 absolute bottom-0 left-[795px] w-[592px]' />
        <hr className='border-[2px] border-[#D39A41] rotate-90 absolute bottom-0 left-[1268px] w-[592px]' />

        <div className='w-[60%] overflow-hidden'>
          {/* Fixed Header */}
          <div className='bg-[#134834] text-white z-50'>
            <div className='flex text-[40px] text-center py-2'>
              <div className='text-start pl-5 w-[40%]'>দান দাতাগণের নাম</div>
              <div className='w-[40%]'>ঠিকানা</div>
              <div className='w-[20%]'>পরিমান</div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className='overflow-hidden h-[250px]'>
            <div className='marquee-content'>
              {
                Array.isArray(donorList) && donorList.map((donor, index) => (
                  <div key={index} className='flex text-[32px] font-bold py-[5px] border-b border-gray-200'>
                    <div className='pl-5 w-[40%]'>{convertEnglishToBengali(index + 1)}. {donor.donorName}</div>
                    <div className='w-[40%] text-center'>{donor.donorAddress}</div>
                    <div className='w-[20%] text-center'>
                      {convertEnglishToBengali(
                        formatNumberWithCommas(
                          parseFloat(convertBengaliToEnglish(donor.donationAmount))
                        )
                      )}৳
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className='w-[40%] overflow-hidden'>
          {/* Fixed Header */}
          <div className='bg-[#134834] text-white z-50'>
            <div className='flex text-[40px] text-center py-2'>
              <div className='w-[65%]'>খরচের বিবরণ</div>
              <div className='w-[35%]'>পরিমান</div>
            </div>
          </div>

          {/* Date Element (Fixed) */}
          <div className='text-[32px] font-bold pl-5 mt-2'>
            তারিখঃ {costingList[0]?.date}
          </div>

          {/* Scrollable Content */}
          <div className='overflow-hidden h-[200px] mt-2'>
            <div className='marquee-content'>
              {
                currentCosting &&
                currentCosting.map((costing, index) => (
                  <div key={index} className='flex text-[20px] py-[5px] border-b border-gray-200'>
                    <div className='pl-5 w-[65%]'>{costing.expenseDescription}</div>
                    <div className='w-[35%] text-center'>
                      {convertEnglishToBengali(
                        formatNumberWithCommas(
                          parseFloat(convertBengaliToEnglish(costing.expenseAmount))
                        )
                      )}৳
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      <div className='my-10 pt-8'>
        <PreFooter />
      </div>
    </div>
  )
}
