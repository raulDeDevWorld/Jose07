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






export default function Home() {




    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})



    function handlerOnChange(e, key) {
        setData({ ...data, [key]: { ...data[key], [e.target.name]: e.target.value } })
    }



    console.log(data)



    function saveFrontPage(e, key) {
        console.log('jhdjskf')
        e.preventDefault()
        if (data[key]) {
            setUserSuccess('Cargando')
            writeUserData(`/price${query}/${key}`, data[key], setUserSuccess)
        }
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

            <div className="fixed top-0 left-0 flex justify-center w-full h-auto bg-[#000000b4] p-0 z-40 " >
                <div className="relative w-[95%] h-screen overflow-y-scroll lg:w-[50%] bg-white border-b border-gray-900/10 pt-16 pb-16 lg:pb-4 px-5">
                    <Link href={`/Admin/Cotizador/Add?item=${query}`} className='fixed bottom-[100px] right-[100px]  rounded-full z-50 block font-medium '>
                        <div className="absolute top-5 left-5  p-1 border text-white border-white rounded-full h-[50px] w-[50px] text-center flex items-center justify-center bg-[#F1BA06]" >
                            ADD
                        </div>
                    </Link>
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>
                    <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]"  >


                        {
                            userDB && userDB[`price${query}`] && Object.entries(userDB[`price${query}`]).map((i, index) => {
                                return <div className='relative p-5 my-5 mt-10 bg-white space-y-5 shadow-2xl border-b-[.5px] border-[#666666] '>
                                    <h5 className='text-center font-medium text-[16px]'>Editar {query}<br /> <span className='text-[#5c5c5c]'> {i[0]}</span></h5>
                                    < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e, i[0])} defaultValue={i[1]['ORIGEN']} required label={'ORIGEN'} shadow='shadow-white' />
                                    < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e, i[0])} defaultValue={i[1]['DESTINO']} required label={'DESTINO'} shadow='shadow-white' />
                                    < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e, i[0])} defaultValue={i[1]['PESO (KG)']} required label={'PESO (KG)'} shadow='shadow-white' />
                                    < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e, i[0])} defaultValue={i[1]['VOLUMEN M3']} required label={'VOLUMEN M3'} shadow='shadow-white' />
                                    < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e, i[0])} defaultValue={i[1]['TIPO DE UNIDAD']} required label={'TIPO DE UNIDAD'} shadow='shadow-white' />
                                    < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e, i[0])} defaultValue={i[1]['MERCANCIA']} required label={'MERCANCIA'} shadow='shadow-white' />
                                    < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e, i[0])} defaultValue={i[1]['SERVICIO']} required label={'SERVICIO'} shadow='shadow-white' />
                                    < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e, i[0])} defaultValue={i[1]['FLETE USD']} required label={'FLETE USD'} shadow='shadow-white' />
                                    < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e, i[0])} defaultValue={i[1]['SERVICIOS LOGISTICOS USD']} required label={'SERVICIOS LOGISTICOS USD'} shadow='shadow-white' />
                                    <div className='w-full grid grid-cols-2 justify-items-center	'>
                                        <Button theme="Danger" click={(e) => { saveFrontPage(e, i[0]) }}>Eliminar</Button>
                                        <Button theme="Primary" click={(e) => { saveFrontPage(e, i[0]) }}>Guardar</Button>
                                    </div>

                                </div>
                            })
                        }

                    </form>
                </div>
            </div>
            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>
    )
}






