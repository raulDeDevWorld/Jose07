'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import { generateUUID } from '@/utils/UIDgenerator'
import TextEditorSimple from '@/components/TextEditorSimple'

export default function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success,  cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const [data3, setData3] = useState({})



    function onChangeHandler3(e, ) {
        setData3({ ...data3,  [e.target.name]: e.target.value  })
    }
    function onChangeHandler4(e, ) {
        setData3({ ...data3, paragraph: e })
    }
  

    console.log(data3)



    function close(e) {
        router.back()
    }
    function saveTarjetas(e) {
        e.preventDefault()
        let key = generateUUID()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}/tarjetas`, { [key]: data3 }, setUserSuccess)
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
                    <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] " onSubmit={saveTarjetas} >
                        <div className="sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]">
                            <div className="w-full flex justify-center">
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 md:w-[250px] md:h-[200px]"
                                    style={{
                                        backgroundImage: `url(${data3[`url`]})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <div className="text-center flex flex-col justify-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                        </svg>

                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
                                    </div>
                                </div>
                            </div>

                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">IMG url</label>
                            <input type="text" name={`url`} onChange={(e) => onChangeHandler3(e)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data3[`url`]} />
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Titulo</label>
                            <input type="text" name={`title`} onChange={(e) => onChangeHandler3(e)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data3[`title`]} />
                            <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Descripción</label>
                            <TextEditorSimple value={data3[`paragraph`]} setValue={(e) => onChangeHandler4(e)} edit={true} ></TextEditorSimple>
                            <br />
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
