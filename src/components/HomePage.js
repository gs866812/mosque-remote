import DonationList from './DonationList';
import CostingList from './CostingList';


export default function HomePage() {
    
  return (
    <div className='mx-auto w-[80%] rounded-md shadow-[5px_0_10px_rgba(0,128,197,0.29)]'>
        <div className='bg-[#0080C5] text-white flex items-center justify-center py-2 text-xl rounded-t-md'>
            <h2 className='w-[70%] flex justify-center'>দান দাতাগনের নাম</h2>
            <h2 className='w-[30%] flex justify-center'>খরচের বিবরনি</h2>
        </div>

        <div className='flex justify-center items-start mx-auto'>
            {/* List of donar */}
            <div className='w-[70%] border-r border-[#00ADE7] border-1 p-2 pl-5'>
                <DonationList/>
            </div>
            <div className='w-[30%] p-2 pl-5 mt-2'>
                <CostingList/>
            </div>
        </div>


        <div className='bg-[#0080C5] h-[20px] rounded-b-md'>
        </div>
    </div>
  )
}
