"use client";
import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
export const ContextData = createContext(null);


export default function DataProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [reFetch, setReFetch] = useState(false);
    const [donorList, setDonorList] = useState({});
    const [costingList, setCostingList] = useState({});
    const [mainBalance, setMainBalance] = useState(0);



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



    const info = {
        reFetch,
        setReFetch,
        donorList,
        triggerReFetch,
        costingList,
        mainBalance,
    };
    return <ContextData.Provider value={info}>{children}</ContextData.Provider>
}
