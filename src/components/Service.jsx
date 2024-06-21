'use client';
import { useUser } from '@/context/Context'

import { useState } from 'react'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Link from 'next/link';

export default function CardH({i, index}) {

    const { user, userDB, item, setUserItem, setUserModal, setUserProfile, setUserSuccess, success, setUserData } = useUser()



    function handlerEditData() {
        setUserModal('Servicios')
        setUserItem(i)
    }


    return (
    
            <div  className="min-w-full min-h-screen lg:max-w-full  md:grid lg:grid-cols-2 rounded-[15px] overflow-hidden mt-5 bg-"
            style={{
                backgroundImage: `url(${i.img})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
              }}
            >
                {/* <div  className="h-48 w-full rounded-t text-center md:hidden bg-blue-500" style={{ backgroundImage: `url(${image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div> */}
                {index % 2 == 0
                    ? <div  className='hidden lg:flex relative w-full max-h-[300px]  justify-center'>
                        <img src={i.img}  className="max-h-[300px]" alt="" />
                    </div>
                    : ''}
{/*                
                    <div  className='lg:hidden relative w-full max-h-[300px] flex justify-center'>
                        <img src={i.img}  className="max-h-[300px]" alt="" />
                    </div> */}
                 
                <div  className="px-2 py-4 md:p-4 flex flex-col justify-between leading-normal">
                    <div  className="mb-8 bg-white">
                        <div  className=" font-bold text-xl mb-2 text-[#2A52BE]">
                            {i.title}
                            {/* <p  className="w-full text-[12px] text-gray-600 flex items-center justify-start text-right font-normal">
                                <span  className={`inline-block h-[5px] w-[5px] mr-[5px] rounded-[5px] bg-[#9EC011] }`}>
                                </span> {i.marca}
                            </p> */}
                        </div>
                        <p  className="text-gray-700 text-[14px] p-5">{i.content}</p>
                    </div>

                    
                </div>
                {index % 2 == 1
                    ? <div  className='hidden lg:flex relative w-full max-h-[300px]  justify-center'>
                        <img src={i.img}  className="max-h-[300px]" alt="" />
                    </div>
                    : ''
                }
            </div>
   
     

    )

}



