"use client";
import moment from "moment";
import { toast } from "react-toastify";
import 'moment/locale/bn-bd';
import { useContext, useEffect, useState } from "react";
import { ContextData } from "@/app/DataProvider";
import AddCategory from "./AddCategory";
moment.locale('bn-bd');

export default function DonateForm() {
    const { triggerReFetch, reFetch, setRefetch } = useContext(ContextData);
    const [donorID, setDonorID] = useState('');
    const [donorName, setDonorName] = useState('');
    const [donorAddress, setDonorAddress] = useState('');
    const [donorContact, setDonorContact] = useState('');
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [selectedIncomeCategory, setSelectedIncomeCategory] = useState('');
    const [selectedExpenseCategory, setSelectedExpenseCategory] = useState('');
    
    console.log("Category:", incomeCategories);


    // Fetch Donor Info by ID
    useEffect(() => {
        const fetchDonorInfo = async () => {
            if (donorID) {
                try {
                    const response = await fetch(`/api/get/donorInfo?id=${donorID}`); // Use the correct API route and pass donorID
                    if (response.ok) {
                        const data = await response.json();
                        if (data) {
                            setDonorName(data.donorName || '');
                            setDonorAddress(data.donorAddress || '');
                            setDonorContact(data.donorContact || '');
                        } else {
                            setDonorName('');
                            setDonorAddress('');
                            setDonorContact('');
                        }
                    } else {
                        setDonorName('');
                        setDonorAddress('');
                        setDonorContact('');
                    }
                } catch (error) {
                    console.error('Error fetching donor info:', error);
                    setDonorName('');
                    setDonorAddress('');
                    setDonorContact('');
                }
            } else {
                setDonorName('');
                setDonorAddress('');
                setDonorContact('');
            }
        };

        fetchDonorInfo();
    }, [donorID]);


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
                toast.error('Error fetching income categories:', error);
            }
        };

        fetchIncomeCategories();
    }, [reFetch]);

    // Fetch Expense Categories
    useEffect(() => {
        const fetchExpenseCategories = async () => {
            try {
                const response = await fetch('/api/get/expenseCategory');
                if (response.ok) {
                    const data = await response.json();
                    setExpenseCategories(data);
                }
            } catch (error) {
                toast.error('Error fetching income categories:', error);
            }
        };

        fetchExpenseCategories();
    }, [reFetch]);

    // Handle Form-1 Submission (POST request for Form-1)
    const handleForm1Submit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const donationAmount = form.donationAmount.value;
        const paymentOption = form.paymentOption.value;
        const references = form.references.value;
        const date = moment(new Date()).format('DD/MM/YYYY');
        const month = moment(new Date()).format('MMMM');

        const donorInfo = {
            donorID,
            donorName,
            donorAddress,
            donorContact,
            donationAmount,
            paymentOption,
            references,
            date,
            month,
            incomeCategory: selectedIncomeCategory
        };

        try {
            const response = await fetch("/api/post/donations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(donorInfo), // Sending the form data
            });

            const data = await response.json();

            if (response.ok) {
                // Optionally reset form or show success message
                form.reset();
                setDonorID('');
                setDonorName('');
                setDonorAddress('');
                setSelectedIncomeCategory('');
                triggerReFetch();
                setRefetch(!reFetch);
                toast.success('উক্ত দানটি জমা হয়েছে ');
            } else {
                toast.error("উক্ত দানটি জমা হয়নি", data.error);
            }
        } catch (error) {
            toast.error("একটি সমস্যা হয়েছে", error);
        }
    };


    // Handle Form-2 Submission (POST request for Form-2)
    const handleForm2Submit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const expenseDescription = form.expenseDescription.value;
        const expenseAmount = form.expenseAmount.value;
        const date = moment(new Date()).format('DD/MM/YYYY');
        const month = moment(new Date()).format('MMMM');

        const expenseInfo = { expenseDescription, expenseAmount, date, month, expenseCategory: selectedExpenseCategory };

        try {
            const response = await fetch("/api/post/expense", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(expenseInfo), // Sending the form data
            });

            const data = await response.json();

            if (response.ok) {
                // Optionally reset form or show success message
                form.reset();
                triggerReFetch();
                setRefetch(!reFetch);
                toast.success('খরচটি সম্পন্ন হয়েছে ');
            } else {
                toast.error("খরচটি সম্পন্ন হয়নি", data.error);
            }
        } catch (error) {
            toast.error("একটি সমস্যা হয়েছে", error);
        }


    };

    // Handle Form-3 Submission (POST request for Form-3)
    const handleForm3Submit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const hadithList = form.hadithList.value;
        const date = moment(new Date()).format('DD/MM/YYYY');

        const hadithInfo = { hadithList, date };

        try {
            const response = await fetch("/api/post/hadith", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(hadithInfo), // Sending the form data
            });

            const data = await response.json();

            if (response.ok) {
                // Optionally reset form or show success message
                form.reset();
                triggerReFetch();
                setRefetch(!reFetch);
                toast.success('হাদীসটি যুক্ত হয়েছে ');
            } else {
                toast.error("হাদীসটি যুক্ত হয়নি", data.error);
            }
        } catch (error) {
            toast.error("একটি সমস্যা হয়েছে", error);
        }


    };

    return (
        <div className='mx-auto w-[80%]'>
            <div className="flex justify-center py-2">
                <AddCategory />
            </div>
            <div className='flex flex-col items-start justify-between px-5 gap-5 my-5'>
                {/* Form-1 */}
                <form onSubmit={handleForm1Submit} className='w-full p-5 border-green-600 border mt-5 rounded-lg'>
                    <h2 className='text-xl font-bold mb-4'>দাতার বিবরণ</h2>

                    <div className='mb-4'>
                        <label className='block mb-2'>আইডি</label>
                        <input
                            type='text'
                            value={donorID}
                            onChange={(e) => setDonorID(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='আইডি লিখুন...(অপশনাল)'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block mb-2'>দাতার নাম</label>
                        <input
                            type='text'
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='দাতার নাম লিখুন...'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block mb-2'>দাতার ঠিকানা</label>
                        <input
                            type='text'
                            value={donorAddress}
                            onChange={(e) => setDonorAddress(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='দাতার ঠিকানা লিখুন...'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2'>দাতার মোবাইল নাম্বার</label>
                        <input
                            type='text'
                            value={donorContact}
                            onChange={(e) => setDonorContact(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='দাতার মোবাইল নাম্বার...(অপশনাল)'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block mb-2'>আয়ের ক্যাটাগরি</label>
                        <select
                            value={selectedIncomeCategory}
                            onChange={(e) => setSelectedIncomeCategory(e.target.value)}
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
                            required
                            className='w-full p-2 border rounded'
                            placeholder='মোট টাকার পরিমান লিখুন...'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block mb-2'>পেমেন্ট অপশন</label>
                        <select name='paymentOption' className='w-full p-2 border rounded' required>
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
                            name='references'
                            className='w-full p-2 border rounded'
                            placeholder='রেফারেন্স লিখুন...'
                        />
                    </div>

                    {/* Submit Button for Form-1 */}
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                        জমা দিন
                    </button>
                </form>

                {/* Form-2 */}
                <form onSubmit={handleForm2Submit} className='w-full p-5 border border-green-600 rounded-lg'>
                    <h2 className='text-xl font-bold mb-4'>খরচের বিবরণ</h2>
                    <div className='mb-4'>
                        <label className='block mb-2'>খরচ</label>
                        <input
                            type='text'
                            name='expenseDescription'
                            required
                            className='w-full p-2 border rounded'
                            placeholder='খরচের বিবরণ লিখুন...'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2'>ব্যয়ের ক্যাটাগরি</label>
                        <select
                            value={selectedExpenseCategory}
                            onChange={(e) => setSelectedExpenseCategory(e.target.value)}
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
                            required
                            className='w-full p-2 border rounded'
                            placeholder='মোট খরচের পরিমান লিখুন...'
                        />
                    </div>

                    {/* Submit Button for Form-2 */}
                    <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded'>
                        জমা দিন
                    </button>
                </form>

                {/* Form-3 */}
                <form onSubmit={handleForm3Submit} className='w-full p-5 border border-green-600 rounded-lg'>
                    <h2 className='text-xl font-bold mb-4'>হাদীস সমূহ</h2>
                    <div className='mb-4'>
                        <label className='block mb-2'>
                            <textarea name="hadithList" rows="4" className='w-full p-2 border rounded' placeholder='হাদীস লিখুন ...' />
                        </label>
                    </div>

                    {/* Submit Button for Form-3 */}
                    <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded'>
                        জমা দিন
                    </button>
                </form>
            </div>
        </div>
    );
}
