"use client";
import { ContextData } from '@/app/DataProvider';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function CostingListPage() {
  const { convertEnglishToBengali, triggerReFetch, reFetch, setRefetch } = useContext(ContextData);
  const [costingList, setCostingList] = useState([]);
  const [filteredCostingList, setFilteredCostingList] = useState([]);
  const [selectedCosting, setSelectedCosting] = useState(null);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 20;


  useEffect(() => {
    const fetchExpenseCategories = async () => {
      try {
        const response = await fetch('/api/get/expenseCategory');
        if (response.ok) {
          const data = await response.json();
          setExpenseCategories(data);
        }
      } catch (error) {
        console.error('Error fetching income categories:', error);
      }
    };

    fetchExpenseCategories();
  }, [reFetch]);

  useEffect(() => {
    // Fetch costing data with pagination and search term
    const fetchCostingData = async () => {
      try {
        const response = await fetch(`/api/get/costingList?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`);
        if (response.ok) {
          const data = await response.json();
          setCostingList(data.expenses);
          setFilteredCostingList(data.expenses);
          setTotalItems(data.total);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCostingData();
  }, [reFetch, currentPage, searchTerm]); // Re-fetch when reFetch, currentPage, or searchTerm changes

  // Handle Edit
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/post/editCosting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedCosting)
      });

      if (response.ok) {
        triggerReFetch();
        setRefetch(!reFetch);
        document.getElementById('edit_modal').close();
        Swal.fire({
          title: "Edited!",
          text: "Your data has been successfully updated.",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to edit costing.",
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while editing the costing.",
        icon: "error"
      });
      console.error("Error:", error);
    }
  };

  // Handle Delete
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
          const response = await fetch('/api/post/deleteCosting', {
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
              text: "Failed to delete costing.",
              icon: "error"
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the costing.",
            icon: "error"
          });
          console.error("Error:", error);
        }
      }
    });
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  // Handle pagination click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const minPage = Math.max(currentPage - 2, 1);
  const maxPage = Math.min(currentPage + 2, totalPages);

  const renderPagination = () => {
    const pageNumbers = [];
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
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-center lg:text-3xl text-xl my-5 font-bold'>সর্বমোট খরচের তালিকা</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="খোঁজ করুন..."
              className="p-2 border rounded"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-400 w-full table-zebra">
              <thead className="bg-gray-100">
                <tr className='bg-gray-600 text-white'>
                  <th className="border border-gray-400 px-4 py-2">খরচের বিবরণ</th>
                  <th className="border border-gray-400 px-4 py-2">টাকার পরিমাণ</th>
                  <th className="border border-gray-400 px-4 py-2">খরচের ধরণ</th>
                  <th className="border border-gray-400 px-4 py-2">তারিখ</th>
                  <th className="border border-gray-400 px-4 py-2">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {filteredCostingList &&
                  filteredCostingList.map((costing, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2">{costing.expenseDescription}</td>
                      <td className="border border-gray-400 px-4 py-2 text-center">{convertEnglishToBengali(costing.expenseAmount)} ৳</td>
                      <td className="border border-gray-400 px-4 py-2 text-center">{costing.expenseCategory}</td>
                      <td className="border border-gray-400 px-4 py-2 text-center">{costing.date}</td>
                      <td className="border border-gray-400 px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            setSelectedCosting(costing);
                            document.getElementById('edit_modal').showModal();
                          }}
                          className="text-blue-500 mr-4"
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(costing._id)}
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
          <form onSubmit={handleEdit} className='w-full p-5 border-green-600 border mt-5 rounded-lg'>
            <h2 className='text-xl font-bold mb-4'>খরচের বিবরণ</h2>
            <div className='mb-4'>
              <label className='block mb-2'>খরচ</label>
              <input
                type='text'
                name='expenseDescription'
                value={selectedCosting?.expenseDescription || ''}
                onChange={(e) => setSelectedCosting({ ...selectedCosting, expenseDescription: e.target.value })}
                required
                className='w-full p-2 border rounded'
                placeholder='খরচের বিবরণ লিখুন...'
              />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>ব্যয়ের ক্যাটাগরি</label>
              <select
                value={selectedCosting?.expenseCategory || ''}
                onChange={(e) => setSelectedCosting({ ...selectedCosting, expenseCategory: e.target.value })}
                className='w-full p-2 border rounded'
                required
              >
                <option value=''>ক্যাটাগরি নির্বাচন করুন...</option>
                {expenseCategories.map((category, index) => (
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
                name='expenseAmount'
                value={selectedCosting?.expenseAmount || ''}
                onChange={(e) => setSelectedCosting({ ...selectedCosting, expenseAmount: e.target.value })}
                required
                className='w-full p-2 border rounded'
                placeholder='মোট খরচের পরিমান লিখুন...'
              />
            </div>

            <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded'>
              জমা দিন
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
