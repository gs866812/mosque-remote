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
    <div className='w-full mx-auto'>
      <div className='lg:my-10 my-5'>
        <BalanceHeader />
      </div>

      <div className='lg:w-[95%] border-[3px] lg:border-[#D39A41] mx-auto rounded-3xl shadow-[5px_0_10px_rgba(0,128,197,0.29)] lg:flex lg:justify-between items-start lg:h-[400px] flex-col lg:flex-row'>

        <div className='lg:w-[60%] overflow-hidden border-[#D39A41] border-[3px] lg:border-0 rounded-3xl lg:rounded-br-[0px] lg:rounded-tr-[0px]'>
          {/* Fixed Header */}
          <div className='bg-[#134834] text-white lg:rounded-tl-3xl lg:rounded-tr-[0px] rounded-t-3xl'>
            <div className='flex lg:text-4xl text-center py-4'>
              <div className='text-start pl-5 w-[40%]'>দাতাগণের নাম</div>
              <div className='w-[40%]'>ঠিকানা</div>
              <div className='w-[20%]'>পরিমান</div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className='lg:h-[320px] h-[220px] overflow-hidden relative'>
            <div className='border-r-[3px] absolute border-[#D39A41] lg:h-[320px] h-[220px] left-[40%] top-0'></div>
            <div className='border-r-[3px] absolute border-[#D39A41] lg:h-[320px] h-[220px] left-[80%] top-0'></div>
            <div className='hidden lg:block border-r-[3px] absolute border-[#D39A41] lg:h-[320px] right-0 top-0'></div>
            <div className={donorList.length > 5 ? 'marquee-loop' : ''}>
              {donorList &&
                donorList.map((donor, index) => (
                  <div key={index} className='flex lg:text-3xl font-bold py-2'>
                    <div className='pl-5 w-[40%]'>{convertEnglishToBengali((index % donorList.length) + 1)}. {donor.donorName}</div>
                    <div className='w-[40%] font-normal text-center'>{donor.donorAddress}</div>
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

        <div className='lg:w-[40%] overflow-hidden mt-10 lg:mt-0 border-[#D39A41] border-[3px] lg:border-0 rounded-3xl lg:rounded-tl-[0px]'>
          {/* Fixed Header */}
          <div className='bg-[#134834] text-white lg:rounded-tr-3xl lg:rounded-tl-[0px] rounded-t-3xl'>
            <div className='flex lg:text-4xl text-center py-4'>
              <div className='w-[65%]'>খরচের বিবরণ</div>
              <div className='w-[35%]'>পরিমান</div>
            </div>
          </div>

          {/* Date Element (Fixed) */}
          <div className='lg:text-3xl font-bold pl-5 py-2 bg-[#e5af58]'>
            তারিখঃ {costingList[0]?.date}
          </div>

          {/* Scrollable Content */}
          <div className='lg:h-[270px] h-[200px] overflow-hidden relative'>
          <div className='border-r-[3px] absolute border-[#D39A41] lg:h-[270px] h-[200px] left-[65%] top-0'></div>
            <div className={currentCosting.length > 5 ? 'marquee-loop' : ''}>
              {
                currentCosting &&
                currentCosting.concat(currentCosting).map((costing, index) => (
                  <div key={index} className='flex lg:text-3xl py-2'>
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

      <div className='my-10 lg:pt-[47px]'>
        <PreFooter />
      </div>
    </div>
  )
}
