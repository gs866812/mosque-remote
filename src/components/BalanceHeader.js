'use client';
import { ContextData } from '@/app/DataProvider';
import { useContext } from "react";

export default function BalanceHeader() {
  const { mainBalance, convertEnglishToBengali, convertBengaliToEnglish, formatNumberWithCommas } = useContext(ContextData);
  // Check if mainBalance is available and contains the required data
  const formattedBalance = mainBalance && Array.isArray(mainBalance) && mainBalance[0]?.totalBalance
    ? convertEnglishToBengali(
      formatNumberWithCommas(
        parseFloat(convertBengaliToEnglish(mainBalance[0].totalBalance))
      )
    )
    : null; // Handle the case when mainBalance is not available
  return (
    <div>
      {formattedBalance &&
        <h2 className='text-center text-[45px] font-bold'>{`বর্তমান সর্বমোট জমাকৃত অর্থঃ`} {formattedBalance}৳</h2>
      }
    </div>
  )
}
