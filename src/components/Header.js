"use client";
import Image from 'next/image';
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
    console.log(mainBalance);

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
            <div className='bg-[#0080C5] text-white text-center py-1'>
                <h2 className='font-poppins font-semibold text-xl leading-10'>
                    بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </h2>
            </div>

            <div className='bg-[#FFDD2E] text-gray-800 text-center py-3'>
                <h2 className='font-poppins font-semibold text-2xl leading-10'>
                    চিথলিয়া কেন্দ্রীয় জামে মসজিদ
                </h2>
            </div>

            <div className='flex gap-5 justify-between my-4 items-center w-[80%] mx-auto'>
                <div>
                    <Image src='https://iili.io/dbgU2NS.png' alt='Mosque Icon' width={60} height={60} />
                </div>
                <div>
                    <h2 className='text-4xl font-extrabold text-gray-800'>
                        বর্তমান সর্বমোট জমাকৃত অর্থঃ {formattedBalance}৳
                    </h2>
                </div>
                <div>
                    <Image src='https://iili.io/dbgU2NS.png' alt='Mosque Icon' width={60} height={60} />
                </div>
            </div>
        </div>
    );
}
