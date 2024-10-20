"use client";
import { ContextData } from '@/app/DataProvider';
import React, { useContext, useEffect, useState } from 'react'

export default function DonorList() {
    const { triggerReFetch, reFetch, setRefetch } = useContext(ContextData);
    const [donorList, setDonorList] = useState(null);

    useEffect(() => {
        // Fetch costing data when the component mounts
        const fetchCostingData = async () => {
          try {
            const response = await fetch(`/api/get/donorList`);
            if (response.ok) {
              const data = await response.json();
              setDonorList(data);
            }
          } catch (err) {
            console.error(err.message);
          }
        };
        fetchCostingData();
      }, [reFetch]); // Will re-fetch when reFetch changes
    
    return (
        <div className='w-full mx-auto'>
            <div className='lg:w-[95%] mx-auto'>
                <div className='my-8'>

                </div>
            </div>
        </div>
    )
}
