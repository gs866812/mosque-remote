"use client";
import { ContextData } from '@/app/DataProvider';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function DonorList() {
    const { triggerReFetch, reFetch, setRefetch, convertEnglishToBengali } = useContext(ContextData);
    const [donorList, setDonorList] = useState([]);
    const [filteredDonorList, setFilteredDonorList] = useState([]);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        // Fetch donor data with pagination
        const fetchDonorInfo = async () => {
            try {
                const response = await fetch(`/api/get/donorList?page=${currentPage}&limit=${itemsPerPage}`);
                if (response.ok) {
                    const data = await response.json();
                    setDonorList(data.donors);
                    setFilteredDonorList(data.donors);
                    setTotalItems(data.total);
                }
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchDonorInfo();
    }, [reFetch, currentPage]); // Will re-fetch when reFetch or currentPage changes

    // Handle search functionality
    // Handle search functionality
    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page after search

        try {
            // Fetch data from the server based on search
            const response = await fetch(`/api/get/donorList?page=1&limit=${itemsPerPage}&search=${value}`);
            if (response.ok) {
                const data = await response.json();
                setDonorList(data.donors);
                setFilteredDonorList(data.donors);
                setTotalItems(data.total);
            }
        } catch (err) {
            console.error('Error fetching search results:', err.message);
        }
    };


    // Handler for edit action
    const handleEdit = async (e) => {
        e.preventDefault();
        console.log("Editing:", selectedDonor);

        try {
            const response = await fetch('/api/post/editDonor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedDonor)
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
                    text: "Failed to edit donor.",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "An error occurred while editing the donor.",
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
                    const response = await fetch('/api/post/deleteDonor', {
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
                            text: "Failed to delete donor.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred while deleting the donor.",
                        icon: "error"
                    });
                    console.error("Error:", error);
                }
            }
        });
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
                        <h2 className='text-center lg:text-3xl text-xl my-5 font-bold'>দাতাগণের তালিকা</h2>
                        <input
                            type="text"
                            placeholder="খোঁজ করুন..."
                            className="p-2 border rounded"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse border border-gray-400 w-full table-zebra">
                            <thead className="bg-gray-100">
                                <tr className='bg-gray-600 text-white'>
                                    <th className="border border-gray-400 px-4 py-2">আইডি </th>
                                    <th className="border border-gray-400 px-4 py-2">দাতার নাম </th>
                                    <th className="border border-gray-400 px-4 py-2">দাতার ঠিকানা</th>
                                    <th className="border border-gray-400 px-4 py-2">দাতার মোবাইল</th>
                                    <th className="border border-gray-400 px-4 py-2">অ্যাকশন</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDonorList
                                    .map((donor, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-400 px-4 py-2 text-center">{convertEnglishToBengali(donor.donorID)}</td>
                                            <td className="border border-gray-400 px-4 py-2">{donor.donorName} </td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">{donor.donorAddress}</td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">{donor.donorContact}</td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                <button
                                                    onClick={() => {
                                                        setSelectedDonor(donor);
                                                        document.getElementById('edit_modal').showModal();
                                                    }}
                                                    className="text-blue-500 mr-4"
                                                    title="Edit"
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(donor._id)}
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
                        <h2 className='text-xl font-bold mb-4'>দাতার বিবরণ </h2>
                        <div className='mb-4'>
                            <label className='block mb-2'>দাতার নাম</label>
                            <input
                                type='text'
                                value={selectedDonor?.donorName || ''}
                                onChange={(e) => setSelectedDonor({ ...selectedDonor, donorName: e.target.value })}
                                className='w-full p-2 border rounded'
                                placeholder='দাতার নাম লিখুন...'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-2'>দাতার ঠিকানা</label>
                            <input
                                type='text'
                                value={selectedDonor?.donorAddress || ''}
                                onChange={(e) => setSelectedDonor({ ...selectedDonor, donorAddress: e.target.value })}
                                className='w-full p-2 border rounded'
                                placeholder='দাতার ঠিকানা লিখুন...'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-2'>দাতার মোবাইল নাম্বার</label>
                            <input
                                type='text'
                                value={selectedDonor?.donorContact || ''}
                                onChange={(e) => setSelectedDonor({ ...selectedDonor, donorContact: e.target.value })}
                                className='w-full p-2 border rounded'
                                placeholder='দাতার মোবাইল নাম্বার...(অপশনাল)'
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
