"use client";
import { ContextData } from '@/app/DataProvider';
import { useContext } from "react";
import BalanceHeader from './BalanceHeader';
import PreFooter from './PreFooter';



export default function HomePage() {
  const { donorList, convertEnglishToBengali, convertBengaliToEnglish, formatNumberWithCommas, costingList, hadithList } = useContext(ContextData);
  const date = costingList[0]?.date;
  const currentCosting = costingList.filter(costing => costing.date === date);
  console.log(hadithList);


  return (
    <div className='w-[2592px] bg-[#f9f9ed] py-10 mx-auto'>
      <div className=''>
        <BalanceHeader />
      </div>
      <div className='w-[1956px] h-[600px] mx-auto mt-10 border-[3px] border-[#D39A41] rounded-3xl shadow-[5px_0_10px_rgba(0,128,197,0.29)]'>
        <div className='bg-[#134834] h-[123px] rounded-t-3xl text-white flex justify-center items-center border-b-[3px] border-[#D39A41]'>
          <p className='text-[48px] w-[25%] text-center'>দান দাতাগনের নাম</p>
          <p className='text-[48px] w-[15%] text-center'>ঠিকানা</p>
          <p className='text-[48px] w-[20%] text-center'>সাদকার পরিমান</p>
          <p className='text-[48px] w-[20%] text-center'>খরজের বিবরন</p>
          <p className='text-[48px] w-[20%] text-center'>অর্থের পরিমান</p>
        </div>

        <div className='flex justify-between items-center'>

          <div className='flex justify-start items-center w-[60%]'>
            <div className='border-r-[3px] border-[#D39A41] w-[42%] h-[472px] marquee'>
              <div className="absolute marquee-content">
                {
                  Array.isArray(donorList) && donorList.map((donor, index) => (
                    <div className=''>
                      <p className='font-bold text-[40px] pl-4 pt-6 w-full' key={index}>
                        {convertEnglishToBengali(index + 1)}. {donor.donorName}
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className='border-r-[3px] border-[#D39A41] w-[25%] h-[472px] marquee'>
              <div className="absolute marquee-content ml-4">
                {
                  Array.isArray(donorList) && donorList.map((donor, index) => (
                    <p className='text-[32px] text-center pt-[34px]' key={index}>
                      {donor.donorAddress}
                    </p>
                  ))
                }
              </div>
            </div>
            <div className='border-r-[3px] border-[#D39A41] w-[33%] h-[472px] marquee'>
              <div className="absolute marquee-content left-1/3">
                {
                  Array.isArray(donorList) && donorList.map((donor, index) => (
                    <p className='font-bold text-[40px] pt-6 text-center' key={index}>
                      {convertEnglishToBengali(
                        formatNumberWithCommas(
                          parseFloat(convertBengaliToEnglish(donor.donationAmount))
                        )
                      )}৳
                    </p>
                  ))
                }
              </div>
            </div>
          </div>

          <div className='flex justify-start items-center w-[40%]'>
            <div className='border-r-[3px] border-[#D39A41] w-[52%]'>
              <p className='text-[32px] font-bold pt-3 pl-5'>তারিখঃ {costingList[0]?.date}</p>
              <div className='marquee w-full h-[400px] mt-[10px]'>
                <div className="absolute marquee-content">
                  {
                    currentCosting &&
                    currentCosting.map((costing, index) => <p className='text-[32px] pt-3 pl-5' key={index}>
                      {costing.expenseDescription}
                    </p>)
                  }
                </div>
              </div>
            </div>
            <div className='w-[48%] h-[432px] pt-10'>
            <div className='marquee w-full h-[400px] mt-[10px]'>
              <div className="absolute marquee-content left-1/3">
              {
                currentCosting &&
                currentCosting.map((costing, index) => <p className='text-[32px] text-center pt-3' key={index}>
                  {convertEnglishToBengali(
                    formatNumberWithCommas(
                      parseFloat(convertBengaliToEnglish(costing.expenseAmount))
                    )
                  )} ৳
                </p>)
              }
              </div>
              </div>
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
