'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context'


export default function Select({ arr, name, click, defaultValue, uuid, label, required }) {

    const router = useRouter()
    const { select, setSelect } = useUser()

    const [state, setState] = useState(defaultValue ? defaultValue : arr[0])

    function handlerSelect() {
        select === name ? setSelect('') : setSelect(name)

    }

    function handlerUserState(name, i) {
        setState(i)
        click(name, i, uuid)
    }


    return (
        <div className='relative'>
            <div id={label}
                className={`relative block border border-[#a1a1a1]  pt-2.5 mb-0 pb-0  w-full text-[12px] text-gray-900 bg-transparent px-5  appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]`}
                onClick={handlerSelect}>
                  {defaultValue === 'Seleccionar'&&  <span className='absolute'>Seleccionar</span> }
                <input type="text" className='  w-full h-full border-transparent outline-none focus:outline-none' value={defaultValue !== 'Seleccionar' ? defaultValue : ''} required />
                <span className={select === name ? 'absolute right-5 rotate-[270deg]' : 'absolute right-5 rotate-90'}>{'>'}</span>

                <ul
                    className={`relative overflow-auto mt-3  transition-all rounded-[5px] bg-[#ffffff00] w-full  ${select === name ? `relative ${arr.length >= 2 && 'h-[95px] border-t  z-10'} ${arr.length == 2 && 'h-[72px] border-t  z-10'} ${arr.length == 1 && 'h-[36px] border-t  z-10'}  ` : 'h-[0]'}`} style={{ background: '#ffffff00' }} >
                    {
                        arr.map((i, index) => <li key={index} className='flex items-center  border-t cursor-pointer p-2' onClick={() => handlerUserState(name, i)}> {i} </li>)
                    }
                </ul>
            </div>
            {label && <label htmlFor={label} class={`z-50 peer-focus:font-medium shadow-white shadow-2xl absolute text-[12px] ${select === name ? 'text-blue-600' : 'text-[#6b7280]'} bg-white px-5 mx-2 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>{label}</label>}

        </div>
    )
}












