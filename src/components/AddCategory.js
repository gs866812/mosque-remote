"use client";
import { ContextData } from '@/app/DataProvider';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddCategory() {
    const { triggerReFetch, reFetch, setRefetch } = useContext(ContextData);
    const [incomeCategory, setIncomeCategory] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');

    const handleIncomeCategorySubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/post/incomeCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: incomeCategory }),
            });

            if (response.ok) {
                setIncomeCategory(''); // Clear the input field
                triggerReFetch();
                setRefetch(!reFetch);
                toast.success('আয়ের ক্যাটাগরি সফলভাবে যুক্ত হয়েছে');
            } else {
                toast.error('আয়ের ক্যাটাগরি যুক্ত করতে ব্যর্থ হয়েছে');
            }
        } catch (error) {
            toast.error('আয়ের ক্যাটাগরি যুক্ত করতে একটি সমস্যা হয়েছে', error);
        }
    };

    const handleExpenseCategorySubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/post/expenseCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: expenseCategory }),
            });

            if (response.ok) {
                setExpenseCategory(''); // Clear the input field
                triggerReFetch();
                setRefetch(!reFetch);
                toast.success('ব্যয়ের ক্যাটাগরি সফলভাবে যুক্ত হয়েছে');
            } else {
                toast.error('ব্যয়ের ক্যাটাগরি যুক্ত করতে ব্যর্থ হয়েছে');
            }
        } catch (error) {
            toast.error('ব্যয়ের ক্যাটাগরি যুক্ত করতে একটি সমস্যা হয়েছে', error);
        }
    };

    return (
        <div>
            <div className='flex items-center gap-2'>
                <button onClick={() => document.getElementById('income_modal').showModal()} className='py-2 px-4 rounded-md bg-green-800 text-white'>আয়ের ক্যাটাগরি এড করুন</button>
                <button onClick={() => document.getElementById('expense_modal').showModal()} className='py-2 px-4 rounded-md bg-red-600 text-white'>ব্যয়ের ক্যাটাগরি এড করুন</button>
            </div>

            {/* Income category */}
            <dialog id="income_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">আয়ের ক্যাটাগরি এড করুন</h3>
                    <form onSubmit={handleIncomeCategorySubmit}>
                        <input
                            type="text"
                            value={incomeCategory}
                            onChange={(e) => setIncomeCategory(e.target.value)}
                            placeholder="ক্যাটাগরি নাম লিখুন"
                            className="input input-bordered w-full my-4"
                            required
                        />
                        <button type="submit" className="btn btn-success">এড করুন</button>
                    </form>
                    <div className="modal-action">
                        <button className="btn" onClick={() => document.getElementById('income_modal').close()}>বন্ধ করুন</button>
                    </div>
                </div>
            </dialog>

            {/* Expense category */}
            <dialog id="expense_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">ব্যয়ের ক্যাটাগরি এড করুন</h3>
                    <form onSubmit={handleExpenseCategorySubmit}>
                        <input
                            type="text"
                            value={expenseCategory}
                            onChange={(e) => setExpenseCategory(e.target.value)}
                            placeholder="ক্যাটাগরি নাম লিখুন"
                            className="input input-bordered w-full my-4"
                            required
                        />
                        <button type="submit" className="btn btn-error">এড করুন</button>
                    </form>
                    <div className="modal-action">
                        <button className="btn" onClick={() => document.getElementById('expense_modal').close()}>বন্ধ করুন</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
