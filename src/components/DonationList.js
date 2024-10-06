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

// Utility function to format numbers with commas (use English numerals)
function formatNumberWithCommas(number) {
    if (!isNaN(number)) { // Ensure that the input is a valid number
        return new Intl.NumberFormat('en-IN').format(number);
    }
    return number; // Return the number as is if it's invalid
}

export default function DonationList() {
    const { donorList } = useContext(ContextData);

    return (
        <div className='space-y-5 pr-2'>
            {Array.isArray(donorList) && donorList.map((donor, index) => (
                <div className='flex items-center mt-2 w-full' key={index}>
                    {/* Convert index to Bengali numerals */}
                    <p className='font-bold w-[50%]'>
                        {convertEnglishToBengali(index + 1)}. {donor.donorName}
                    </p>

                    <p className='w-[25%]'>({donor.donorAddress})</p>

                    {/* Convert Bengali amount from DB to English, format, then convert back to Bengali */}
                    <p className='font-bold w-[25%] text-right'>
                        {convertEnglishToBengali(
                            formatNumberWithCommas(
                                parseFloat(convertBengaliToEnglish(donor.donationAmount))
                            )
                        )}৳
                    </p>
                </div>
            ))}
        </div>
    );
}
