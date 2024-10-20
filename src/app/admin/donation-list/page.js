"use client";
import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../../DataProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function DonationListPage() {
  const { convertEnglishToBengali, triggerReFetch, reFetch, setRefetch } = useContext(ContextData);
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [incomeCategories, setIncomeCategories] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    // Fetch donations with pagination
    const fetchDonations = async () => {
      try {
        const response = await fetch(`/api/get/donationList?page=${currentPage}&limit=${itemsPerPage}`);
        if (response.ok) {
          const data = await response.json();
          setDonations(data.donations);
          setTotalDonations(data.total);
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, [currentPage, reFetch]);

  // Fetch Income Categories
  useEffect(() => {
    const fetchIncomeCategories = async () => {
      try {
        const response = await fetch('/api/get/incomeCategory');
        if (response.ok) {
          const data = await response.json();
          setIncomeCategories(data);
        }
      } catch (error) {
        console.error('Error fetching income categories:', error);
      }
    };

    fetchIncomeCategories();
  }, [reFetch]);

  // Handler for edit action
  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(selectedDonation);

    try {
      // Send the edited donation data to the server
      const response = await fetch('/api/post/editDonation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedDonation)
      });

      if (response.ok) {
        triggerReFetch();
        setRefetch(!reFetch);
        document.getElementById('edit_modal').close(); // Close the modal after handling the edit
        Swal.fire({
          title: "Edited!",
          text: "Your data has been successfully updated.",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to edit donation.",
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while editing the donation.",
        icon: "error"
      });
      console.error("Error:", error);
    }
  };

  // Handler for delete action
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

  // Handler for pagination click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalDonations / itemsPerPage);

  const renderPagination = () => {
    const pageNumbers = [];
    const minPage = Math.max(currentPage - 2, 1);
    const maxPage = Math.min(currentPage + 2, totalPages);

    for (let i = minPage; i <= maxPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center space-x-2 mt-4">
        {currentPage > 1 && (
          <button onClick={() => handlePageClick(currentPage - 1)} className="px-3 py-1 bg-gray-300 rounded">
            Previous
          </button>
        )}
        {minPage > 1 && (
          <>
            <button onClick={() => handlePageClick(1)} className="px-3 py-1 bg-gray-300 rounded">1</button>
            {minPage > 2 && <span>...</span>}
          </>
        )}
        {pageNumbers.map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`px-3 py-1 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          >
            {pageNumber}
          </button>
        ))}
        {maxPage < totalPages && (
          <>
            {maxPage < totalPages - 1 && <span>...</span>}
            <button onClick={() => handlePageClick(totalPages)} className="px-3 py-1 bg-gray-300 rounded">{totalPages}</button>
          </>
        )}
        {currentPage < totalPages && (
          <button onClick={() => handlePageClick(currentPage + 1)} className="px-3 py-1 bg-gray-300 rounded">
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div className='w-full mx-auto'>
      <div className='lg:w-[95%] mx-auto'>
        <div className='my-8'>
          <h2 className='text-center lg:text-3xl text-xl my-5 font-bold'>সর্বমোট গৃহীত দানের তালিকা</h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-400 w-full table-zebra">
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
                {donations &&
                  donations.map((donation, idx) => (
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
                          onClick={() => {
                            setSelectedDonation(donation);
                            document.getElementById('edit_modal').showModal();
                          }}
                          className="text-blue-500 mr-4"
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button
                          onClick={() => handleDelete(donation._id)}
                          className="text-red-500"
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {renderPagination()}
        </div>
      </div>

      <dialog id="edit_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">দানের বিবরণ </h3>

          <form onSubmit={handleEdit} className='w-full p-5 border-green-600 border mt-5 rounded-lg'>
            <h2 className='text-xl font-bold mb-4'>দাতার বিবরণ</h2>

            <div className='mb-4'>
              <label className='block mb-2'>আয়ের ক্যাটাগরি</label>
              <select
                value={selectedDonation?.incomeCategory || ''}
                onChange={(e) => setSelectedDonation({ ...selectedDonation, incomeCategory: e.target.value })}
                className='w-full p-2 border rounded'
                required
              >
                <option value=''>ক্যাটাগরি নির্বাচন করুন...</option>
                {incomeCategories.map((category, index) => (
                  <option key={index} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label className='block mb-2'>টাকার পরিমান</label>
              <input
                type='text'
                name='donationAmount'
                value={selectedDonation?.donationAmount || ''}
                onChange={(e) => setSelectedDonation({ ...selectedDonation, donationAmount: e.target.value })}
                required
                className='w-full p-2 border rounded'
                placeholder='মোট টাকার পরিমান লিখুন...'
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-2'>পেমেন্ট অপশন</label>
              <select
                name='paymentOption'
                value={selectedDonation?.paymentOption || ''}
                onChange={(e) => setSelectedDonation({ ...selectedDonation, paymentOption: e.target.value })}
                className='w-full p-2 border rounded'
                required
              >
                <option value='নগদ'>নগদ</option>
                <option value='বিকাশ'>বিকাশ</option>
                <option value='ব্যাংক একাউন্ট'>ব্যাংক একাউন্ট</option>
                <option value='হাতে গ্রহণ'>হাতে গ্রহণ</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block mb-2'>রেফারেন্স (আদায়কারী)</label>
              <input
                type='text'
                value={selectedDonation?.references || ''}
                onChange={(e) => setSelectedDonation({ ...selectedDonation, references: e.target.value })}
                name='references'
                className='w-full p-2 border rounded'
                placeholder='রেফারেন্স লিখুন...'
              />
            </div>

            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
              সম্পাদন করুন
            </button>
          </form>
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('edit_modal').close()}>বন্ধ করুন</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
