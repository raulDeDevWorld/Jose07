'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, getSpecificData } from '@/firebase/utils'
import { useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Error from '@/components/Error'
import Video from '@/components/Video'

import Input from '@/components/Input'
import { useRouter } from 'next/navigation';



export default function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, temporal, setTemporal } = useUser()
    const router = useRouter()
    const refFirst = useRef(null);
    const [filter, setFilter] =useState('')

    const signUpHandler = (e) => {

    }

    useEffect(() => {
        temporal == undefined && getSpecificData('/Users', setTemporal)
    }, [temporal]);

    const prev = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            refFirst.current.scrollLeft = scrollLeft - itemWidth;
        });
    };
    const next = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            console.log(itemWidth)
            refFirst.current.scrollLeft = scrollLeft + itemWidth;
        });
    };

console.log(filter)
    function handlerFilter (e) {
        setFilter(e.target.value)
    }
    // console.log(Object.values(temporal))
    return (

        <div className="min-h-full"
            style={{
                backgroundImage: 'url(/gif.gif)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
            }}>





            <div className='w-screen h-screen bg-gradient-to-t from-[#00061860] to-[#000618d1] flex flex-col justify-center items-center p-5 z-[50]'>

                {/* <video  className='absolute top-0  w-full min-h-[100vh] object-cover z-10' autoPlay loop muted>
      <source src='underwater.mp4' type="video/mp4" />
    </video>  */}
                <img src="/truck.png" className='fixed top-0 w-screen h-screen bg-[#01A7EB] object-cover lg:hidden' alt="" />

                <img src="/airplane-bg.jpg" className='fixed top-0  w-screen h-screen bg-[#01A7EB] object-cover hidden md:block' alt="" />




                <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
                <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg z-10 p-5 bg-white scroll-smooth w-full rounded-[10px]" ref={refFirst}>
                    <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white ">

                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search-users" onChange={handlerFilter} class="block p-2 ps-10 text-[12px] text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Buscar Usuario" />
                        </div>
                    </div>
                    <table class="w-full text-[12px] text-left rtl:text-right text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>

                                <th scope="col" class="px-6 py-3">
                                    Usuario
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Empresa
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Pais
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Ciudad
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Contacto
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {temporal && temporal !== undefined && Object.values(temporal).map((i, index) => {
                                return  i.nombre.toLowerCase().includes(filter.toLowerCase()) && <tr class="bg-white border-b  hover:bg-gray-50 " key={index}>

                                    <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        <img class="w-10 h-10 rounded-full border" src={i.photo && i.photo !== undefined ? i.photo : '/usuarios.png'} alt="Jese image" />
                                        <div class="ps-3">
                                            <div class="text-base font-semibold">{i.nombre}</div>
                                            <div class="font-normal text-gray-500">{i.email}</div>
                                        </div>
                                    </th>
                                    <td class="px-6 py-4">
                                        {i.empresa}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            {i.pais}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        {i.ciudad}
                                    </td>
                                    <td class="px-6 py-4">
                                        {i.telefono}
                                        <a type="button" href={`tel:${i.telefono}`} class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300  shadow-lg shadow-teal-500/50  font-medium rounded-lg text-[12px] px-10 py-2.5 text-center me-2 mb-2">Llamar</a>

                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}
