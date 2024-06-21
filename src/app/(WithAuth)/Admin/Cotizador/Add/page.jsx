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



    function handlerOnChange(e, key) {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    console.log(data)



    function saveFrontPage(e) {
        e.preventDefault()
        let key = generateUUID()
        setUserSuccess('Cargando')
        writeUserData(`/price${query}/${key}`, data, setUserSuccess)
    }

    function close(e) {
        router.back()
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
                    <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] "  >
                        <div className='relative p-5 my-5 mt-10 bg-white space-y-5'>
                            <h5 className='text-center font-medium text-[16px]'>Añadir {query}<br /> </h5>
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['ORIGEN']} required label={'ORIGEN'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['DESTINO']} required label={'DESTINO'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['PESO (KG)']} required label={'PESO (KG)'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['VOLUMEN M3']} required label={'VOLUMEN M3'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['TIPO DE UNIDAD']} required label={'TIPO DE UNIDAD'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['MERCANCIA']} required label={'MERCANCIA'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['SERVICIO']} required label={'SERVICIO'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['FLETE USD']} required label={'FLETE USD'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['SERVICIOS LOGISTICOS USD']} required label={'SERVICIOS LOGISTICOS USD'} shadow='shadow-white' />
                           <div className='flex justify-center'>
                            <Button theme="Primary" click={(e) => { saveFrontPage(e,) }}>Guardar</Button>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>
    )
}
