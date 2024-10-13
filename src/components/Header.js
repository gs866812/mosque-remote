"use client";
import { ContextData } from "@/app/DataProvider";
import { useContext } from "react";

// Utility function to convert Bengali numerals to English numerals
function convertBengaliToEnglish(bengaliNum) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return bengaliNum.toString().replace(/[০-৯]/g, (digit) => {
        return englishDigits[bengaliDigits.indexOf(digit)];
    });
}

// Utility function to convert English numerals to Bengali numerals
function convertEnglishToBengali(englishNum) {
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return englishNum.toString().replace(/[0-9]/g, (digit) => {
        return bengaliDigits[englishDigits.indexOf(digit)];
    });
}

// Utility function to format numbers with commas
function formatNumberWithCommas(number) {
    return new Intl.NumberFormat('en-IN').format(number);
}

export default function Header() {
    const { mainBalance } = useContext(ContextData);

    // Check if mainBalance is available and contains the required data
    const formattedBalance = mainBalance && Array.isArray(mainBalance) && mainBalance[0]?.totalBalance
        ? convertEnglishToBengali(
            formatNumberWithCommas(
                parseFloat(convertBengaliToEnglish(mainBalance[0].totalBalance))
            )
        )
        : null; // Handle the case when mainBalance is not available

    return (
        <div className='w-full'>
            <div className='bg-[#134834] text-white flex justify-center items-center'>
                <h2 className='font-poppins font-bold lg:text-5xl py-5 text-xl'>
                    চিথলিয়া কেন্দ্রীয় জামে মসজিদ
                </h2>
            </div>
        </div>
    );
}
