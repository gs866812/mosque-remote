'use client';
import { ContextData } from '@/app/DataProvider';
import { useContext } from "react";

export default function BalanceHeader() {
  const {donationList, convertEnglishToBengali, convertBengaliToEnglish, formatNumberWithCommas, costingList } = useContext(ContextData);
  const totalIncome = donationList
    .filter(amount => amount.donationAmount)
    .map(donation => parseFloat(convertBengaliToEnglish(donation.donationAmount)))
    .reduce((total, amount) => total + amount, 0);



  // Check if totalIncome is available and contains the required data
  const formattedIncomeBalance = totalIncome
    ? convertEnglishToBengali(
      formatNumberWithCommas(
        parseFloat(convertBengaliToEnglish(totalIncome))
      )
    )
    : null; // Handle the case when totalIncome is not available

  // Ensure costingList is defined and not empty before mapping
  const costingBanglaToEnglish = Array.isArray(costingList) && costingList.length > 0
    ? costingList.map(costing => parseFloat(convertBengaliToEnglish(costing.expenseAmount)))
    : [];

  // Calculate total costing (in Bengali)
  const totalCosting = costingBanglaToEnglish.length > 0
    ? convertEnglishToBengali(
      costingBanglaToEnglish.reduce((acc, amount) => acc + amount, 0)
    )
    : '০';

    const costingAmount = convertBengaliToEnglish(totalCosting);
    const formattedCostingAmount = convertEnglishToBengali(
      formatNumberWithCommas(costingAmount)
    );


  // Ensure totalIncome is properly defined and parse it
  const totalIncomeEnglish = totalIncome
    ? parseFloat(convertBengaliToEnglish(totalIncome))
    : 0;

  // Ensure totalCostingEnglish is properly parsed to avoid NaN
  const totalCostingEnglish = costingBanglaToEnglish.length > 0
    ? costingBanglaToEnglish.reduce((acc, amount) => acc + amount, 0)
    : 0;

  // Calculate rest amount
  const restAmountEnglish = totalIncomeEnglish - totalCostingEnglish;

  // Convert the rest amount to Bengali and format it with commas
  const formattedRestAmount = convertEnglishToBengali(
    formatNumberWithCommas(restAmountEnglish)
  );
  

  return (
    <div>
      {formattedIncomeBalance &&
        <h2 className='text-center lg:text-[32px] text-xl font-bold space-x-3'>
          <span>{`সর্বমোট আয়ঃ`} <span className='text-green-600'>{formattedIncomeBalance} ৳</span></span>

          <span>{`সর্বমোট খরচঃ`} <span className='text-red-500'>{formattedCostingAmount} ৳ </span></span>

          <span>{`অবশিষ্ট অর্থঃ`} <span className='text-orange-500'>{formattedRestAmount} ৳ </span></span>
        </h2>
      }
    </div>
  );
}
