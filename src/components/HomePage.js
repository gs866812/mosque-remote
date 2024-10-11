"use client";
import { ContextData } from '@/app/DataProvider';
import { useContext } from "react";
import BalanceHeader from './BalanceHeader';
import PreFooter from './PreFooter';

export default function HomePage() {
  const { donorList, convertEnglishToBengali, convertBengaliToEnglish, formatNumberWithCommas, costingList } = useContext(ContextData);
  const date = costingList[0]?.date;
  const currentCosting = costingList.filter(costing => costing.date === date);

  // Duplicate the list of donors to create a continuous effect
  const loopingDonorList = donorList.concat(donorList);

  return (
    <div className='w-full bg-[#f9f9ed] py-5 mx-auto'>
      <div>
        <BalanceHeader />
      </div>

      <div className='w-[95%] border-[3px] border-[#D39A41] mx-auto mt-5 rounded-3xl shadow-[5px_0_10px_rgba(0,128,197,0.29)] flex justify-between items-start h-[450px]'>

        <div className='w-[60%] overflow-hidden'>
          {/* Fixed Header */}
          <div className='bg-[#134834] text-white rounded-tl-3xl'>
            <div className='flex text-[40px] text-center py-2'>
              <div className='text-start pl-5 w-[40%]'>দান দাতাগণের নাম</div>
              <div className='w-[40%]'>ঠিকানা</div>
              <div className='w-[20%]'>পরিমান</div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className='h-[340px] overflow-hidden'>
            <div className='marquee-loop'>
              {
                loopingDonorList.map((donor, index) => (
                  <div key={index} className='flex text-[32px] font-bold py-2'>
                    <div className='pl-5 w-[40%]'>{convertEnglishToBengali((index % donorList.length) + 1)}. {donor.donorName}</div>
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
          <div className='bg-[#134834] text-white rounded-tr-3xl'>
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
          <div className='h-[280px] mt-2 overflow-hidden'>
            <div className='marquee-loop'>
              {
                currentCosting &&
                currentCosting.concat(currentCosting).map((costing, index) => (
                  <div key={index} className='flex text-[20px] py-2 border border-gray-200'>
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
