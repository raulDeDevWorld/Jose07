'use client';

export default function Button({ styled, children }) {
    return (
        <label
             className={`block mb-2 text-[14px] text-left font-light text-gray-900${styled}`}>
            {/*  className={`block mb-2 text-[12px] font-medium text-gray-900 dark:text-white ${styled}`}> */}
            {children}
        </label>
    )
}
