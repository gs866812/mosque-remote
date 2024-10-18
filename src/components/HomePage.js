"use client";
import { ContextData } from '@/app/DataProvider';
import { useContext } from "react";
import BalanceHeader from './BalanceHeader';
import PreFooter from './PreFooter';

export default function HomePage() {
  const { donationList, convertEnglishToBengali, convertBengaliToEnglish, formatNumberWithCommas, costingList } = useContext(ContextData);



  return (
    <div className='w-full mx-auto'>
      <div className='lg:my-[26px] my-5'>
        <BalanceHeader />
      </div>

      <div className='lg:w-[95%] border-[3px] lg:border-[#D39A41] mx-auto rounded-3xl shadow-[5px_0_10px_rgba(0,128,197,0.29)] lg:flex lg:justify-between items-start lg:h-[300px] flex-col lg:flex-row'>

        <div className='lg:w-[60%] overflow-hidden border-[#D39A41] border-[3px] lg:border-0 rounded-3xl lg:rounded-br-[0px] lg:rounded-tr-[0px]'>
          {/* Fixed Header */}
          <div className='bg-[#134834] text-white lg:rounded-tl-3xl lg:rounded-tr-[0px] rounded-t-3xl border-[#D39A41] border-b-[3px]'>
            <div className='flex lg:text-2xl text-center py-2'>
              <div className='text-start pl-5 w-[40%]'>দাতাগণের নাম</div>
              <div className='w-[40%]'>ঠিকানা</div>
              <div className='w-[20%]'>পরিমান</div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className='lg:h-[242px] h-[217px] overflow-hidden relative'>
            <div className='border-r-[3px] absolute border-[#D39A41] lg:h-[320px] h-[220px] left-[40%] top-0'></div>
            <div className='border-r-[3px] absolute border-[#D39A41] lg:h-[320px] h-[220px] left-[80%] top-0'></div>
            <div className='hidden lg:block border-r-[3px] absolute border-[#D39A41] lg:h-[320px] right-0 top-0'></div>
            <div className={donationList?.length > 5 ? 'marquee-loop' : ''}>
              {donationList &&
                donationList.map((donor, index) => (
                  <div key={index} className='flex lg:text-2xl font-bold py-2'>
                    <div className='pl-5 w-[40%]'>{convertEnglishToBengali((index % donationList.length) + 1)}. {donor.donorName}</div>
                    <div className='w-[40%] font-normal text-center'>{donor.donorAddress}</div>
                    <div className='w-[20%] text-center'>
                      {convertEnglishToBengali(
                        formatNumberWithCommas(
                          parseFloat(convertBengaliToEnglish(donor.donationAmount))
                        )
                      )} ৳
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className='lg:w-[40%] overflow-hidden mt-10 lg:mt-0 border-[#D39A41] border-[3px] lg:border-0 rounded-3xl lg:rounded-tl-[0px]'>
          {/* Fixed Header */}
          <div className='bg-[#134834] text-white lg:rounded-tr-3xl lg:rounded-tl-[0px] rounded-t-3xl border-[#D39A41] border-b-[3px]'>
            <div className='flex lg:text-2xl text-center py-2'>
              <div className='w-[65%]'>খরচের বিবরণ</div>
              <div className='w-[35%]'>পরিমান</div>
            </div>
          </div>


          {/* Scrollable Content */}
          <div className='lg:h-[242px] h-[217px] overflow-hidden relative'>
          <div className='border-r-[3px] absolute border-[#D39A41] lg:h-[270px] h-[200px] left-[65%] top-0'></div>
            <div className={costingList?.length > 5 ? 'marquee-loop' : ''}>
              {
                costingList &&
                costingList.map((costing, index) => (
                  <div key={index} className='flex lg:text-2xl font-bold py-2 text-red-600'>
                    <div className='pl-5 w-[65%]'>{costing.expenseDescription}</div>
                    <div className='w-[35%] text-center font-bold'>
                      {convertEnglishToBengali(
                        formatNumberWithCommas(
                          parseFloat(convertBengaliToEnglish(costing.expenseAmount))
                        )
                      )} ৳
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      <div className='my-[5px] lg:pt-[20px]'>
        <PreFooter />
      </div>
    </div>
  )
}
