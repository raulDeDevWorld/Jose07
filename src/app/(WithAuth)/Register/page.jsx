'use client'
import { writeUserData, getSpecificData } from '@/firebase/utils'
import { useUser } from '@/context/Context'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
// import { WithAuth } from '@/HOCs/WithAuth'
// import Video from '@/components/Video'


import { useRouter } from 'next/navigation';

export default function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData } = useUser()
    const router = useRouter()
    const [countries, setCountries] = useState(null)
    const [rol, setRol] = useState('Cliente')
    const [pais, setPais] = useState('Ninguno')
    const [pais2, setPais2] = useState('Ninguno')
    const [flag, setFlag] = useState('Ninguno')
    const [state, setState] = useState({})

    const changeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const onClickHandlerCountry = (name, value) => {
        setPais(value.translations.spa.official)
        setPais2(value)
        setFlag(value.flags.png)
    }
    const registerHandler = (e) => {
        e.preventDefault()
        console.log({ uuid: user.uid, email: user.email, photo: user.photoURL !== undefined ? user.photoURL : 'non exist', rol: 'Cliente', flag, pais, ...state })
        let nombre = e.target[0].value
        writeUserData(`Users/${user.uid}`, { rol: 'Cliente' , uuid: user.uid, email: user.email, photo: user.photoURL !== undefined ? user.photoURL : 'non exist', rol: 'Cliente', flag, pais, ...state }, setUserSuccess)
        router.push('/')

    }
    // console.log(pais)

    const getContries = async (e) => {

        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json()
        setCountries(data)

    }


    console.log(user)

    // console.log([...countries.map((i)=>i.translations.spa.official)])
    useEffect(() => {
        getContries()
        console.log(user)
        // if (user && user.rol) router.push('/Cliente')
        // if (user == null || user  == undefined || user.role !== 'authenticated') router.push('/SignUp')

        // if (user && user.rol) getSpecificData('Users', user.uuid, setUserData)
        // if (user && user.rol) router.push('/Cliente')
    }, [user]);

    return (
        <div className="min-h-full "
            style={{
                backgroundImage: 'url(/bg-2.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
            }}>
            {/* <Video /> */}
            <div className='w-screen h-screen  flex flex-col justify-center items-center'>

                {/* <img src="/truck.png" className='fixed  w-screen h-screen bg-[#01A7EB] object-cover lg:hidden' alt="" /> */}

                <img src="/airplane-bg.jpg" className='absolute  w-screen h-screen bg-[#01A7EB] object-cover ' alt="" />

                <form className={`space-y-6 lg:space-y-3  rounded-[30px] w-[100%] max-w-[400px] p-5 h-auto px-5 py-10 lg:p-10 z-10 lg:scale-110`} onSubmit={registerHandler} >

                    <div className='space-y-4 bg-[#00061860] p-5  rounded-[10px] lg:space-y-3'>
                        <h5 className="text-[18px] text-center text-white font-medium">Registrate</h5>
                        <br />                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Nombre Completo</label>
                            <Input type="text" name="nombre" onChange={changeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Empresa</label>
                            {/* <Select arr={['Perona regular', 'Empleado', 'Empresario', 'Distribuidor']} name='rol' click={onClickHandler} /> */}
                            <Input type="text" name="empresa" onChange={changeHandler} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />

                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-[16px] text-left  font-medium text-white">Pais</label>
                            <Select arr={countries ? countries : []} name='Ciudad' click={onClickHandlerCountry} defaultValue={pais2 ? pais2 : 'Ninguno'} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Ciudad</label>
                            {/* <Select arr={['Perona regular', 'Empleado', 'Empresario', 'Distribuidor']} name='rol' click={onClickHandler} /> */}
                            <Input type="text" name="ciudad" onChange={changeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Telefono o Whatsapp</label>
                            {/* <Select arr={['Perona regular', 'Empleado', 'Empresario', 'Distribuidor']} name='rol' click={onClickHandler} /> */}
                            <Input type="number" name="telefono" onChange={changeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />

                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <Link href="/Politicas" className="ml-2 text-[14px] font-medium text-gray-100 ">Políticas de Servicio</Link>
                            </div>
                        </div>
                        <Button type="submit" theme="Transparent" >Continuar</Button>
                        <br />
                        <div className="text-[14px] text-center font-medium text-white dark:text-gray-300">Ya tienes una cuenta? <Link href="/" className="text-gray-100 hover:underline">Inicia Sessión</Link >
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}



