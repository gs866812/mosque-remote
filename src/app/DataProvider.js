"use client";
import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
export const ContextData = createContext(null);


export default function DataProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [reFetch, setReFetch] = useState(false);
    const [donorList, setDonorList] = useState([]);
    const [costingList, setCostingList] = useState([]);
    const [mainBalance, setMainBalance] = useState(0);
    const router = useRouter();


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



    // Listen for storage events from other tabs to trigger a re-fetch
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'reFetch' && event.newValue === 'true') {
                setReFetch((prev) => !prev);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Use localStorage to trigger re-fetch across tabs
    const triggerReFetch = () => {
        setReFetch((prev) => !prev);
        localStorage.setItem('reFetch', 'true');
        setTimeout(() => {
            localStorage.removeItem('reFetch'); // Clean up to avoid conflicts
        }, 1000);
    };


    useEffect(() => {
        // Fetch donation data when the component mounts
        fetch("/api/donorList")
            .then((response) => {
                if (!response.ok) {
                    toast.error("একটি সমস্যা হয়েছে");
                    return; // Return to stop further execution if there's an error
                }
                return response.json();
            })
            .then((data) => {
                setDonorList(data); // Store fetched data in the state
            })
            .catch((err) => {
                toast.error(err.message); // Show error if fetching fails
            });
    }, [reFetch]); // Will re-fetch when reFetch changes


    useEffect(() => {
        // Fetch costing data when the component mounts
        fetch("/api/costingList")
            .then((response) => {
                if (!response.ok) {
                    toast.error("একটি সমস্যা হয়েছে");
                    return; // Return to stop further execution if there's an error
                }
                return response.json();
            })
            .then((data) => {
                setCostingList(data); // Store fetched data in the state
            })
            .catch((err) => {
                toast.error(err.message); // Show error if fetching fails
            });
    }, [reFetch]); // Will re-fetch when reFetch changes


    useEffect(() => {
        // Fetch for main balance
        fetch("/api/mainBalance")
            .then((response) => {
                if (!response.ok) {
                    toast.error("একটি সমস্যা হয়েছে");
                    return; // Return to stop further execution if there's an error
                }
                return response.json();
            })
            .then((data) => {
                setMainBalance(data); // Store fetched data in the state
            })
            .catch((err) => {
                toast.error(err.message); // Show error if fetching fails
            });
    }, [reFetch]); // Will re-fetch when reFetch changes

    // Logout
    const handleLogout = async () => {
        await fetch('/api/logout', {
            method: 'POST',
        });

        // After logging out, redirect to the home page
        router.push('/');
    };



    const info = {
        reFetch,
        setReFetch,
        donorList,
        triggerReFetch,
        costingList,
        mainBalance,
        handleLogout,
        convertBengaliToEnglish,
        convertEnglishToBengali,
        formatNumberWithCommas,
    };
    return <ContextData.Provider value={info}>{children}</ContextData.Provider>
}
