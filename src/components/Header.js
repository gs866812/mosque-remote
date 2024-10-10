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
            <div className='bg-gradient-to-r from-[#D39A41] to-[#F8E79A] h-[112px] flex justify-center items-center'>
                <h2 className='font-poppins font-semibold text-[48px] leading-10 text-[#134834]'>
                    بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </h2>
            </div>

            <div className='bg-[#134834] text-white h-[141px] flex justify-center items-center'>
                <h2 className='font-poppins font-bold text-[56px] leading-[67px]'>
                    চিথলিয়া কেন্দ্রীয় জামে মসজিদ
                </h2>
            </div>
        </div>
    );
}
