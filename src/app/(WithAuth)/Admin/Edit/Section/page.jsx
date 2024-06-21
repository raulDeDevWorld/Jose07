'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, writeUserData, removeData } from '@/firebase/utils'
import { uploadIMG } from '@/firebase/storage'
import { Suspense } from 'react'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import { generateUUID } from '@/utils/UIDgenerator'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import TextEditor from '@/components/TextEditor'
import TextEditorSimple from '@/components/TextEditorSimple'

// import { useSearchParams } from 'next/navigation'






export default function Home() {



    // const Button = ({ children }) => {
    //     return <Suspense ><button className='bg-[#ffbd2f] w-[200px] p-2 rounded-[5px] inline'>
    //         {children}
    //     </button></Suspense>
    // }
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()

    const [counter, setCounter] = useState([''])

    //    console.log(window.location.href.split('=')[1]) 
    const [textEditor, setTextEditor] = useState(undefined)
    const [textEditor2, setTextEditor2] = useState(undefined)

    // const searchParams = useSearchParams()
    const [query, setQuery] = useState('')


    const [option, setOption] = useState('Seccion')

    const [data, setData] = useState({})
    const [data2, setData2] = useState({})
    const [data3, setData3] = useState({})

    const [dataURL, setDataURL] = useState({})
    const [dataURL2, setDataURL2] = useState({})
    const [check, setCheck] = useState(false)

    function onChangeHandler(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    function handlerImage(e) {
        setDataURL({
            ...dataURL,
            [e.target.name]: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }



    // --------------------------mini tarjetas 2----------------------------------
    function handlerLess2() {
        let db = { ...data2 };
        delete db[`item${data2 !== undefined && Object.keys(data2).length - 1}`];
        return setData2(db)
    }

    function onChangeHandler2(e, i) {
        setData2({ ...data2, [i]: { ...data2[i], [e.target.name]: e.target.value } })
    }



    // --------------------------tarjetas 3----------------------------------
   
    function onChangeHandler3(e, i) {
        setData3({ ...data3, [i]: { ...data3[i], [e.target.name]: e.target.value } })
    }
    function onChangeHandler4(e, i) {
        setData3({ ...data3, [i]: { ...data3[i], paragraph: e } })
    }






    function saveFrontPage(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}`, { ...data, content: textEditor, miniTarjetas: data2 }, setUserSuccess)

        // if (e.target[0].files[0]) {
        //     uploadIMG(`/Cliente/${query}`, '/', query, dataURL.file, { ...data, content: textEditor, miniTarjetas: data2 }, setUserSuccess)
        // } else {
        //     writeUserData(`/Cliente/${query}`, { ...data, content: textEditor, miniTarjetas: data2 }, setUserSuccess)
        // }
    }
    function saveMiniTarjetas(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}`, { miniTarjetas: data2 }, setUserSuccess)
    }
    function saveFrontPage2(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        Object.entries(data3).map(i => {
            let db = { ...i[1] }
            delete db['file']
            if (i[1].file && i[1].file !== undefined) {
                uploadIMG(`/Cliente/${query}/tarjetas/${[i[0]]}`, '/', `/${query}/tarjetas/${[i[0]]}`, i[1].file, db, setUserSuccess)
            } else {
                writeUserData(`/Cliente/${query}/tarjetas`, { [i[0]]: db }, setUserSuccess)
            }
        })
    }


    function addContact(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        const obj = {
            [e.target[0].name]: e.target[0].value,
            [e.target[1].name]: e.target[1].value,
            [e.target[2].name]: e.target[2].value,
            [e.target[3].name]: e.target[3].value,
            [e.target[4].name]: e.target[4].value,
            [e.target[5].name]: e.target[5].value,
            [e.target[6].name]: e.target[6].value,
            [e.target[7].name]: e.target[7].value,
            [e.target[8].name]: e.target[8].value,
            [e.target[9].name]: e.target[9].value,
        }
        writeUserData(`Cliente/contactos/`, obj, setUserSuccess)
    }

    function close(e) {
        // setUserModal(false)
        // setCheck(false)
        router.back()
    }


    function deleteHandler(e, route, key, update) {
        e.preventDefault()
        setUserSuccess('Cargando')
        let val = { ...data2 }
        delete val[key]
        console.log(val)
        update(val)
        removeData(route, null, setUserSuccess)


    }

console.log(query)

    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente])


    useEffect(() => {

        if (Object.keys(data2).length === 0 && cliente && cliente[query] && cliente[query] && cliente[query].miniTarjetas) {
            setData2({ ...cliente[query].miniTarjetas, ...data2, })
        }
        if (Object.keys(data3).length === 0 && cliente && cliente[query] && cliente[query] && cliente[query].tarjetas) {
            console.log('getData3')
            setData3({ ...cliente[query].tarjetas, ...data2, })
        }
        if (textEditor == undefined && cliente && cliente[query] && cliente[query] && cliente[query].content) {
            console.log('text')
            setTextEditor(cliente[query].content)
        }
    }, [textEditor, data2, data3, query, option])
    console.log(data3)
    return (

        <div className="min-h-full">

            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen bg-[#01A7EB] object-cover  ' alt="" />

            <div className="fixed top-0 left-0 flex justify-center w-full h-auto bg-[#000000b4] p-0 z-40 " >

                <div className="relative w-[95%] h-screen overflow-y-scroll lg:w-[50%] bg-white border-b border-gray-900/10 pt-16 pb-16 lg:pb-4 px-5">
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>


                    <div className='w-full'>



                        <ul className="flex border-b border-[blue] ">
                            <li className={`-mb-px mr-1 ${option === 'Seccion' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('Seccion')}>
                                <span className=" inline-block rounded-t py-2 px-2 text-blue-700 font-semibold" href="#">Seccion</span>
                            </li>
                            <li className={`-mb-px mr-1 ${option === 'MiniTarjetas' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('MiniTarjetas')}>
                                <span className=" inline-block rounded-t py-2 px-2 text-blue-500 font-semibold" href="#">MiniTarjetas</span>
                            </li>
                            <li className={`-mb-px mr-1 ${option === 'Tarjetas' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setOption('Tarjetas')}>
                                <span className=" inline-block rounded-t py-2 px-2 text-blue-500  font-semibold" href="#">Tarjetas</span>
                            </li>
                        </ul>

                        {/* <button className={` py-2 w-full border-[#F1BA06] border-[2px] ${option === 'Seccion' ? 'bg-[#F1BA06]' : ''}`} onClick={() => setOption('Seccion')}>Seccion</button>
                        <button className={`py-2 w-full border-[#F1BA06] border-[2px] ${option === 'MiniTarjetas' ? 'bg-[#F1BA06]' : ''}`} onClick={() => setOption('MiniTarjetas')}>MiniTarjetas</button>
                        <button className={`py-2 w-full border-[#F1BA06] border-[2px] ${option === 'Tarjetas' ? 'bg-[#F1BA06]' : ''}`} onClick={() => setOption('Tarjetas')}>Tarjetas</button>
                   */}
                    </div>


                    {option === 'Seccion' && <form className="relative  pt-5" onSubmit={saveFrontPage} >
                        <div className="col-span-full">
                            <h2 className="text-base font-bold leading-7 text-gray-900  text-center p-5 ">ADMINISTRAR SECCIONES</h2>
                            {/* <label htmlFor="cover-photo" className="block text-[12px] font-medium leading-6 text-gray-900">Video de imagen de fondo</label>
                            <div className="w-full flex justify-center">
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 md:w-[250px] md:h-[200px]"
                                    style={{
                                        backgroundImage: `url('${dataURL && dataURL.frontPage && dataURL.frontPage ? dataURL.frontPage : (userDB && userDB.frontPage && userDB.frontPage.url)}')`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}>
                                    <div className="text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                        </svg>
                                        <div className="mt-4 flex text-[12px] leading-6 text-gray-600">
                                            <label htmlFor="fileUpload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                <span>Subir video</span>
                                                <input id="fileUpload" name="frontPage" onChange={handlerImage} type="file" accept="video/*" className="sr-only" />
                                            </label>
                                            <p className="pl-1">menos de 5mb</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">MP4</p>
                                    </div>
                                </div>
                            </div> */}

                            <div className='flex justify-center p-5'>
                                <Suspense >
                                    <video src={data && data.url && data.url ? data.url : (cliente && cliente[query] && cliente[query].url)} className='h-[300px]' autoPlay loop muted ></video>
                                    {/* <video src={dataURL && dataURL.frontPage && dataURL.frontPage ? dataURL.frontPage : (cliente && cliente[query] && cliente[query].url)} className='h-[300px]' autoPlay loop muted ></video> */}
                                </Suspense >
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subir Video por URL</label>
                            <input type="text" name="url" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].url} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Titulo</label>
                            <input type="text" name="titulo" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].titulo} />
                        </div>
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Contenido de texto</label>
                                    <TextEditor value={textEditor} setValue={setTextEditor} edit={true} ></TextEditor>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <Button type="submit" theme="Primary">Guardar</Button>
                        </div>
                    </form>}

                    {option === 'MiniTarjetas' && <form className="relative  pt-5" onSubmit={saveMiniTarjetas} >
                        <Link href={`/Admin/Edit/Add?item=${query}`} className='fixed bottom-[100px] right-[100px]  rounded-full z-50 block font-medium '>
                            <div className="absolute top-5 left-5  p-1 border text-white border-white rounded-full h-[50px] w-[50px] text-center flex items-center justify-center bg-[#F1BA06]" >
                                ADD
                            </div>
                        </Link>
                        {/* ---------------------------------TARJETAS 2---------------------------------------- */}

                        {/* <div class="inline-flex">
    
                            <button type='button' class="bg-green-500 text-white font-bold py-2 px-4 rounded-r" onClick={() => setData2({ ...data2, [generateUUID()]: { ic: '', ip: '' } })} >
                                ADD
                            </button>
                        </div> */}
                        {data2 && data2 !== undefined && Object.entries(data2).map((i) => {
                            return <div className="sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]">
                                <h4 className='text-base font-bold leading-7 text-gray-900  text-center p-5'>MINI TARJETA</h4>
                                <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Item principal</label>
                                <input type="text" name={`ip`} onChange={(e) => onChangeHandler2(e, i[0])} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={i[1][`ip`]} />
                                <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Item contenido</label>
                                <input type="text" name={`ic`} onChange={(e) => onChangeHandler2(e, i[0])} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={i[1][`ic`]} />
                                <div className="mt-6 flex items-center justify-center gap-x-6">
                                    <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/${query}/miniTarjetas/${i[0]}`, i[0], setData2)}>Eliminar</Button>
                                    <Button type="submit" theme="Primary">Guardar</Button>
                                </div>

                            </div>
                        })
                        }
                        {/* ----------------------------------------------------------------------------------------- */}



                    </form>}




                    {option === 'Tarjetas' && <form className="relative  pt-10" onSubmit={saveFrontPage2} >

                        <Link href={`/Admin/Edit/AddTarjetas?item=${query}`} className='fixed bottom-[100px] right-[100px]  rounded-full z-50 block font-medium '>
                            <div className="absolute top-5 left-5  p-1 border text-white border-white rounded-full h-[50px] w-[50px] text-center flex items-center justify-center bg-[#F1BA06]" >
                                ADD
                            </div>
                        </Link>
                        {/* ---------------------------------TARJETAS 3---------------------------------------- */}


                        {/* <div class="inline-flex">
                            <button type='button' class="bg-red-500 text-white font-bold py-2 px-4 rounded-l" onClick={handlerLess3}>
                                -
                            </button>
                            <button type='button' class="bg-green-500 text-white font-bold py-2 px-4 rounded-r" onClick={() => setData3({ ...data3, [`item${data3 !== undefined && Object.keys(data3).length}`]: { title: '', paragraph: '' } })} >
                                +
                            </button>
                        </div> */}

                        {data3 && data3 !== undefined && Object.entries(data3).map((i) => {
                            return <div className="sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]">
                                <div class="inline-flex">
                                    <Link type='button' class="bg-green-500 text-white font-bold py-2 px-4 rounded-r" href={`/Admin/Edit/AddContent?item=${query}&route=${i[0]}`} >
                                        Añadir mas contenido
                                    </Link>
                                </div>

                                <div className="w-full flex justify-center">
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 md:w-[250px] md:h-[200px]"
                                        // style={{
                                        //     backgroundImage: `url('${data3[`item${index}`][`file`] ? URL.createObjectURL(data3[`item${index}`][`file`]) : (data3[`item${index}`] && data3[`item${index}`][`url`] && data3[`item${index}`][`url`] && data3[`item${index}`][`url`])}')`,
                                        //     backgroundSize: 'contain',
                                        //     backgroundRepeat: 'no-repeat',
                                        //     backgroundPosition: 'center'
                                        // }}
                                        style={{
                                            backgroundImage: `url(${i[1][`url`]})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        <div className="text-center flex flex-col justify-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                            </svg>
                                            {/* <div className="mt-4 flex text-[12px] leading-6 text-gray-600">
                                                <label htmlFor={`fileUpload${index}`} className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Subir imagen</span>
                                                    <input id={`fileUpload${index}`} name={`frontPage${index}`} onChange={(e) => handlerImage3(e, index)} type="file" accept="image/*" className="sr-only" />
                                                </label>
                                                <p className="pl-1">menos de 3mb</p>
                                            </div> */}
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
                                        </div>
                                    </div>
                                </div>

                                <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">IMG url</label>
                                <input type="text" name={`url`} onChange={(e) => onChangeHandler3(e, i[0])} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={i[1][`url`]} />
                                <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Titulo</label>
                                <input type="text" name={`title`} onChange={(e) => onChangeHandler3(e, i[0])} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={i[1][`title`]} />
                                <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Descripción</label>
                                <TextEditorSimple value={i[`paragraph`]} setValue={(e) => onChangeHandler4(e, i[0])} edit={true} ></TextEditorSimple>
                                {/* <input type="text" name={`paragraph`} onChange={(e) => onChangeHandler3(e, index)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data3[`item${index}`][`paragraph`]} /> */}
                                <br />
                                <div className='flex justify-center'>
                                    <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/${query}/tarjetas/${i[0]}`, i[0], setData3)}>Eliminar</Button>
                                    <Button type="submit" theme="Primary">Guardar</Button>
                                </div>
                            </div>
                        })
                        }
                        {/* ----------------------------------------------------------------------------------------- */}
                    </form>}


                </div>

            </div>


            {/* ---------------------------------Contactos---------------------------------------- */}

            {
                query === 'contactos' && <div className="fixed top-0 flex justify-center w-full h-auto bg-[#000000b4] p-0 z-40">
                    <form className="relative w-[95%] h-screen overflow-y-scroll lg:w-[50%] bg-white border-b border-gray-900/10 pt-16 pb-4 px-5" onSubmit={addContact}>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Administrar contactos</h2>

                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Departamento</label>
                                    <input type="text" name="departamento" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['departamento']} />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Dirección 1</label>
                                    <input type="text" name="direccion 1" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['direccion 1']} />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Dirección 2</label>
                                    <input type="text" name="direccion 2" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['direccion 2']} />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Telefono</label>
                                    <input type="text" name="telefono" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['telefono']} />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Celular</label>
                                    <input type="text" name="celular" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['celular']} />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Facebook</label>
                                    <input type="text" name="facebook" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['facebook']} />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">TiK Tok</label>
                                    <input type="text" name="twiter" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['twiter']} />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block 
                                  text-[12px] font-medium leading-6 text-gray-900">Gmail</label>
                                    <input type="text" name="gmail" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['gmail']} />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Instagram</label>
                                    <input type="text" name="instagram" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['instagram']} />
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Linkedin</label>
                                    <input type="text" name="linkedin" className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente.contactos && cliente.contactos['linkedin']} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Button type="submit" theme="Primary" >Guardar</Button>
                        </div>
                        <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                            X
                        </div>
                    </form>
                </div>}



            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>



    )
}






