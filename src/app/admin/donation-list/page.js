"use client";
import React, { useContext } from 'react';
import { ContextData } from '../../DataProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function DonationListPage() {
    const { donationList, convertEnglishToBengali, triggerReFetch, reFetch, setRefetch} = useContext(ContextData);



    const handleDelete = async (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await fetch('/api/post/deleteDonation', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
              });
      
              if (response.ok) {
                triggerReFetch();
                setRefetch(!reFetch);
                Swal.fire({
                  title: "Deleted!",
                  text: "Your data has been deleted.",
                  icon: "success"
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Failed to delete donation.",
                  icon: "error"
                });
              }
            } catch (error) {
              Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting the donation.",
                icon: "error"
              });
              console.error("Error:", error);
            }
          }
        });
      };
      

    

    return (
        <div className='w-full mx-auto'>
            <div className='lg:w-[95%] mx-auto'>
                <div className='my-8'>
                    <h2 className='text-center lg:text-3xl text-xl my-5 font-bold'>সর্বমোট গৃহীত দানের তালিকা</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse border border-gray-400 w-full">
                            {/* head */}
                            <thead className="bg-gray-100">
                                <tr className='bg-gray-600 text-white'>
                                    <th className="border border-gray-400 px-4 py-2">আইডি</th>
                                    <th className="border border-gray-400 px-4 py-2">দাতার নাম</th>
                                    <th className="border border-gray-400 px-4 py-2">দাতার ঠিকানা</th>
                                    <th className="border border-gray-400 px-4 py-2">দানের পরিমাণ</th>
                                    <th className="border border-gray-400 px-4 py-2">আয়ের ক্যাটাগরি</th>
                                    <th className="border border-gray-400 px-4 py-2">আদায়কারী</th>
                                    <th className="border border-gray-400 px-4 py-2">তারিখ</th>
                                    <th className="border border-gray-400 px-4 py-2">অ্যাকশন</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    donationList &&
                                    donationList.map((donation, idx) =>
                                        <tr key={idx}>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                {convertEnglishToBengali(donation.donorID)}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2">{donation.donorName}</td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                {donation.donorAddress}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                {donation.donationAmount}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                {donation.incomeCategory}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                {donation.references}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                {donation.date}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                
                                                <button
                                                    onClick={() => handleDelete(donation._id)}
                                                    className="text-red-500"
                                                    title="Delete"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
