"use client";
import { ContextData } from "@/app/DataProvider";
import Link from "next/link";
import { useContext } from "react";
import { RiMenu3Line } from "react-icons/ri";

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
    const { totalIncome, handleLogout } = useContext(ContextData);

    // Check if totalIncome is available and contains the required data
    const formattedBalance = totalIncome && Array.isArray(totalIncome) && totalIncome[0]?.totalBalance
        ? convertEnglishToBengali(
            formatNumberWithCommas(
                parseFloat(convertBengaliToEnglish(totalIncome[0].totalBalance))
            )
        )
        : null; // Handle the case when totalIncome is not available

    return (
        <div className='w-full bg-[#134834]'>
            <div className=' text-white flex justify-center items-center w-[95%] mx-auto relative'>
                <h2 className='font-poppins font-bold lg:text-4xl py-3 text-xl'>
                    চিথলিয়া কেন্দ্রীয় জামে মসজিদ
                </h2>

                <div className="dropdown dropdown-end absolute right-0">
                    <div tabIndex={0} role="button"><RiMenu3Line className="text-3xl"/></div>
                    <ul tabIndex={0} className="dropdown-content menu rounded-md z-50 lg:w-52 lg:p-2 shadow bg-white lg:mt-5 mt-3">
                        <li className="bg-green-800 lg:p-1 mb-1 rounded-md hover:bg-green-600">
                            <Link href='/'>Home</Link>
                        </li>
                        <li className="bg-green-800 lg:p-1 mb-1 rounded-md hover:bg-green-600">
                             <Link href='/admin/donation-list'>Donations</Link>
                        </li>
                        <li className="bg-green-800 lg:p-1 mb-1 rounded-md hover:bg-green-600">
                             <Link href='/admin/costing-list'>Costing</Link>
                        </li>
                        <li className="bg-green-800 lg:p-1 mb-1 rounded-md hover:bg-green-600">
                             <Link href='/admin/donor-list'>Donor list</Link>
                        </li>
                        <li className="bg-red-600 lg:p-1 mb-1 rounded-md hover:bg-red-400">
                             <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
