"use client";
import moment from "moment";
import { toast } from "react-toastify";
import 'moment/locale/bn-bd';
import { useContext } from "react";
import { ContextData } from "@/app/DataProvider";
moment.locale('bn-bd');


export default function DonateForm() {
    const { triggerReFetch, handleLogout } = useContext(ContextData);


    // Handle Form-1 Submission (POST request for Form-1)
    const handleForm1Submit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const donorName = form.donorName.value;
        const donorAddress = form.donorAddress.value;
        const donationAmount = form.donationAmount.value;

        const donorInfo = { donorName, donorAddress, donationAmount };

        try {
            const response = await fetch("/api/donations", {
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
                triggerReFetch();
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

        const expenseInfo = { expenseDescription, expenseAmount, date };

        try {
            const response = await fetch("/api/expense", {
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
                toast.success('খরচটি সম্পন্ন হয়েছে ');
            } else {
                toast.error("খরচটি সম্পন্ন হয়নি", data.error);
            }
        } catch (error) {
            toast.error("একটি সমস্যা হয়েছে", error);
        }


    };
    // <button onClick={handleLogout}>Log out</button>

    return (
        <div className='mx-auto w-[80%]'>
            <div className='flex justify-end'>
            <button onClick={handleLogout} className='bg-red-500 rounded-md text-white py-1 px-3'>Log out</button>
            </div>

            <div className='border shadow-md rounded-md flex items-start justify-between px-5 gap-5 mt-5'>
                {/* Form-1 */}
                <form onSubmit={handleForm1Submit} className='w-1/2 p-5 border-r'>
                    <h2 className='text-xl font-bold mb-4'>দাতার বিবরণ</h2>
                    <div className='mb-4'>
                        <label className='block mb-2'>দাতার নাম</label>
                        <input
                            type='text'
                            name='donorName'
                            required
                            className='w-full p-2 border rounded'
                            placeholder='দাতার নাম লিখুন...'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block mb-2'>দাতার ঠিকানা</label>
                        <input
                            type='text'
                            name='donorAddress'
                            required
                            className='w-full p-2 border rounded'
                            placeholder='দাতার ঠিকানা লিখুন...'
                        />
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

                    {/* Submit Button for Form-1 */}
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                        জমা দিন
                    </button>
                </form>

                {/* Form-2 */}
                <form onSubmit={handleForm2Submit} className='w-1/2 p-5'>
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
            </div>
        </div>
    );
}
