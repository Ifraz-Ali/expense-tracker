import React from 'react';

const Loader = () => {
    return (

        <div className='flex flex-col justify-center items-center h-screen bg-slate-200'>
            <div className='bg-gray-300 w-1/2 h-60 p-2 shadow-2xl '>
                <h2 className='bg-gray-400 flex justify-center p-5 animate-pulse'> <p className='bg-gray-300 w-1/2 h-2 rounded-xl'></p></h2>
                <div className='flex items-center bg-gray-400 h-3/4 mt-2 gap-4 px-2 p-1 max-[1000px]:flex-col max-[1000px]:h-4/5'>
                    <div className='bg-gray-300 h-28 w-1/5 animate-pulse'>
                    </div>
                    <div className='bg-gray-300 w-0.5 h-36 max-[1000px]:hidden animate-pulse'></div>
                    <div className='flex flex-col gap-6 p-4 max-[1000px]:text-sm animate-pulse'>
                        <p className='bg-gray-300 w-64 h-3 rounded-xl'></p>
                        <p className='bg-gray-300 w-64 h-3 rounded-xl'></p>
                        <p className='bg-gray-300 w-64 h-3 rounded-xl'></p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Loader;