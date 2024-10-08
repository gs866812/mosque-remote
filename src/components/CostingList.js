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


// Utility function to group expenses by date
function groupByDate(expenses = []) {
    if (!Array.isArray(expenses)) {
        return {}; // Return an empty object if expenses is not an array
    }

    return expenses.reduce((acc, expense) => {
        const { date } = expense;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(expense);
        return acc;
    }, {});
}


export default function CostingList() {
    const { costingList } = useContext(ContextData);

    // Group costingList by date
    const groupedByDate = groupByDate(costingList);

    return (
        <div className='space-y-5 pr-2'>
            {Object.keys(groupedByDate).map((date, index) => (
                <div key={index}>
                    {/* Render date once */}
                    <h2 className='font-bold'>তারিখঃ {date}</h2>
                    <div className='pl-5 mt-2'>
                        {/* Render all expenses for this date */}
                        {groupedByDate[date].map((costing, idx) => (
                            <div className='flex items-center mb-2' key={idx}>
                                <p className='w-[70%]'>{costing.expenseDescription}</p>
                                <p className='w-[30%]'>{convertEnglishToBengali(
                                    formatNumberWithCommas(
                                        parseFloat(convertBengaliToEnglish(costing.expenseAmount))
                                    )
                                )}৳</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
