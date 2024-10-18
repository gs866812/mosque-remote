'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setRedirect(params.get('redirect'));
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/post/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            toast.success('Login success');
            router.push(redirect || '/');
        } else {
            toast.error('Login failed');
        }
    };

    return (
        <div className="mx-auto p-8 rounded-lg">
            <form onSubmit={handleLogin} className='lg:border-[#e5af58] lg:border-2 lg:py-20 lg:px-20 lg:w-1/2 mx-auto rounded-xl'>
                <div className="relative mb-4">
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">&#9993;</i>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full py-4 lg:text-2xl pl-10 pr-4 rounded-lg bg-gray-200 outline-none focus:ring-2 focus:ring-[#e5af58]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="relative mb-4">
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">&#128274;</i>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full py-4 pl-10 pr-4 rounded-lg bg-gray-200 outline-none focus:ring-2 focus:ring-[#e5af58]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full py-3 bg-[#134834] rounded-lg text-white font-semibold hover:bg-[#248461] transition-colors">Login</button>
            </form>
        </div>
    );
}
