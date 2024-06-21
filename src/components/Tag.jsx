'use client';

import style from './Tag.module.css'


export default function Button({ theme, click, children }) {



    switch (theme) {
        case 'Transparent':
            return <span
                className={`inline-block bg-white text-gray-400 text-[16px] text-center font-medium px-2.5 py-2 my-1 rounded-full 
                border border-gray-400 cursor-pointer`}
                onClick={click}
            >
                {children}
            </span>
            break
        case 'Primary':
            return <span
                className={`inline-block bg-[#F1BA06] text-black text-[16px] text-center font-medium px-2.5 py-2 m-1  
                border border-gray-400 cursor-pointer`}
                onClick={click}
            >
                {children}
            </span>
            break
        case 'Secondary':
            return <span
                className={`w-[100%] bg-white text-gray-400 text-[14px] text-center font-medium px-2.5 py-0.5 my-1 rounded-2xl 
                border border-gray-400 cursor-pointer`}
                onClick={click}
            >
                {children}
            </span>

        case 'Success':
            return <span
                className={`w-[40%] lg:w-[100%] bg-[#0064FA] text-gray-400 text-[14px] text-center font-medium px-2.5 py-0.5 my-1 rounded-2xl 
                border border-gray-400 cursor-pointer`}
                onClick={click}
            >
                {children}
            </span>
        default:
    }
}

    // return (
        // <span
        //     className={`w-[40%] bg-green-100 text-gray-400 text-[14px] text-center font-medium px-2.5 py-0.5 my-1 rounded-2xl
        //  border border-gray-400 ${style[styled]}`}
        //     onClick={click}
        // >
        //     {children}
        // </span>
    // )











