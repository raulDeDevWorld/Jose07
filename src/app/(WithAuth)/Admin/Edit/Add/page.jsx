'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import InputFlotante from '@/components/InputFlotante'
import { generateUUID } from '@/utils/UIDgenerator'

export default function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const [data2, setData2] = useState({})



    function handlerOnChange(e, key) {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    console.log(data2)



    function onChangeHandler2(e) {
        setData2({ ...data2, [e.target.name]: e.target.value })
    }


    function close(e) {
        router.back()
    }
    function saveMiniTarjetas(e) {
        e.preventDefault()
        let key = generateUUID()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}/miniTarjetas`, { [key]: data2 }, setUserSuccess)
    }
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente])
    return (

        <div className="min-h-full">
            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen bg-[#01A7EB] object-cover  ' alt="" />

            <div className="fixed h-screen top-0 left-0 flex justify-center items-center w-full  bg-[#000000b4] p-0 z-40 " >
                <div className="relative w-[95%] lg:w-[50%] bg-white border-b rounded-[10px] pt-16 pb-16 lg:pb-4 px-5">
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>
                    <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] " onSubmit={saveMiniTarjetas} >
                        <div className="sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]">
                            <h4 className='text-base font-bold leading-7 text-gray-900  text-center p-5'>MINI TARJETA</h4>
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Item principal</label>
                            <input type="text" name={`ip`} onChange={(e) => onChangeHandler2(e)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data[`ip`]} />
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Item contenido</label>
                            <input type="text" name={`ic`} onChange={(e) => onChangeHandler2(e)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data[`ic`]} />
                            <div className="mt-6 flex items-center justify-center gap-x-6">
                                <Button type="submit" theme="Primary">Guardar</Button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>




            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>
    )
}
