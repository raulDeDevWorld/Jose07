'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail } from '@/firebase/utils'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Error from '@/components/Error'
import BottomNavigation from '@/components/BottomNavigation'

import { useRouter } from 'next/navigation';


export default function Home() {
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
    const [option, setOption] = useState('Dimension')

    const router = useRouter()

    const [data, setData] = useState({})




    function onChangeHandler(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const signInHandler = (e) => {
        e.preventDefault()
        let email = e.target[0].value
        let password = e.target[1].value
        email.length !== 0 && password.length !== 0 ? signInWithEmail(email, password, setUserSuccess) : setUserSuccess('Complete')
    }



    useEffect(() => {
        user === undefined && onAuth(setUserProfile)
        if (user !== undefined && user !== null) router.replace('/')
    }, [user])

    return (
        <div className="h-full "
            style={{
                backgroundImage: 'url(/gif.gif)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
            }}>

            <div className=' w-screen pt-[50px] min-h-screen bg-gradient-to-t from-[#00061860] to-[#000618d1] flex flex-col justify-center items-center  z-10'>



                <img src="/airplane-bg.jpg" className='fixed top-0 w-screen h-screen  object-cover ' alt="" />
                <div className='w-full text-center flex justify-center'>
                    <img src="/logo.svg" className='w-[300px] z-10' alt="User" />
                </div>


      


                <div className='relative bg-[#ffffff] rounded-[10px] p-10 m-[10px] min-h-[600px] md:min-h-[540px]'>
              
                <h5 className="text-[26px] text-center font-bold text-[#F1BA06] z-[50]">CALCULADORA DE PESO VOLUMETRICO</h5>

                    
                    <div className='relative w-full flex justify-around  my-5'>
                        <button className={` py-2 w-full border-[#F1BA06]  border-[2px] ${option === 'Dimension' ? 'bg-[#F1BA06]' : ''}`} onClick={() => setOption('Dimension')}>POR DIMENSIONES</button>
                        <button className={`py-2 w-full border-[#F1BA06] border-[2px] ${option === 'M3' ? 'bg-[#F1BA06]' : ''}`} onClick={() => setOption('M3')}>POR M3</button>
                    </div>

                    {option === 'Dimension' && <form className={`relative space-y-6 w-[100%]  z-10 `} onSubmit={signInHandler} >

                        {/* <h5 className="text-[16px] text-center font-bold text-[#636363] z-[50]">CALCULO POR PESO VOLUMETRICO POR DIMENSIONES</h5> */}

                        {/* <p>Indica los siguientes datos</p> */}
                        {/* <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f4" onChange={onChangeHandler} id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cantidad</label>
                        </div> */}
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f1" onChange={onChangeHandler} id="floating_email1" defaultValue={data.f1} class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email1" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Largo cm</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f2" onChange={onChangeHandler} id="floating_email2" defaultValue={data.f2}  class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email2" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ancho cm</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f3" onChange={onChangeHandler} id="floating_email3" defaultValue={data.f3}  class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email3" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alto cm</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f4" onChange={onChangeHandler} id="floating_email3" defaultValue={data.f4}  class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email4" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cantidad</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f5" onChange={onChangeHandler} id="floating_email5" defaultValue={data.f5}  class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email5" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso en KG</label>
                        </div>

                        {/* <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" value={data.f1 && data.f2 && data.f3 && data.f4 && ((data.f1*data.f2*data.f3)*data.f4)/6000} name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso volumetrico</label>
                        </div> */}

                        <Button type="submit" theme="Primary">CALCULAR</Button>
                        <div class="relative z-0 w-full mb-5 group mt-10">
                            <input type="number" value={data.f1 && data.f2 && data.f3 && data.f4 &&   Math.round(((data.f1 * data.f2 * data.f3) * data.f4) / 6000) } name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso volumetrico</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group mt-10">
                            <input type="number" value={data.f1 && data.f2 && data.f3 && data.f4 && Math.round(((data.f1 * data.f2 * data.f3) * data.f4) / 6000) > Math.round(data.f5) ? Math.round(((data.f1 * data.f2 * data.f3) * data.f4) / 6000) : Math.round(data.f5)} name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso cargable</label>
                        </div>
                        {/* <div class="relative z-0 w-full mb-5 group mt-10">
                            <input type="number" value={data.f1 && data.f2 && data.f3 && data.f4 && Math.round(((data.f1 * data.f2 * data.f3) * data.f4) / 6000) > Math.round(data.f5) ? Math.round(((data.f1 * data.f2 * data.f3) * data.f4) / 6000) : Math.round(data.f5)} name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso volumetrico</label>
                        </div> */}
                    </form>
                    }




                    {option === 'M3' && <form className={`relative space-y-6 w-[100%]   z-10 `} onSubmit={signInHandler} >


                        {/* <h5 className="text-[16px] text-center font-bold text-[#636363] z-[50]">CALCULO DEL PESO VOLUMETRICO POR M3</h5> */}
                        {/* <p>aquí solo debes poner los m3 de tu(s) cajas o paquetes mas la cantidad y automaticamente se calculara el peso volumetrico


                            </p> */}
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f21" onChange={onChangeHandler} id="floating_email21" defaultValue={data.f21}  class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email21" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">m3</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f22" onChange={onChangeHandler} id="floating_email22" defaultValue={data.f22}  class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email22" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cantidad</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f23" onChange={onChangeHandler} id="floating_email23" defaultValue={data.f23}  class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email23" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso en KG</label>
                        </div>

                        <Button type="submit" theme="Primary">CALCULAR</Button>
                        <div className="text-[14px] text-center font-medium text-white">No tienes una cuenta? <Link href="/SignUp" className="text-gray-100 hover:underline">Registrate</Link ></div>
                        <div class="relative z-0 w-full mb-5 group mt-10">
                            <input type="number" value={data.f21 && data.f22 && data.f23 && Math.round((data.f21 * 167) * data.f22)} name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso volumetrico</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group mt-10">
                            <input type="number" value={data.f21 && data.f22 && data.f23 && Math.round((data.f21 * 167) * data.f22) > Math.round(data.f23) ? Math.round((data.f21 * 167) * data.f22) : Math.round(data.f23)} name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso cargable</label>
                        </div>
                    </form>}









                    {/* <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f2" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso volumetrico</label>
                        </div> */}

                </div>

                {/* 
                <form className={`space-y-6 lg:space-y-3 w-[100%] rounded-[30px] max-w-[350px] z-10 lg:scale-110`} onSubmit={signInHandler} >

                    <br />
                    <div className='space-y-4 bg-[#00061860] p-5  rounded-[10px] lg:space-y-3 bg-white'>

                        <h5 className="text-[16px] text-center font-bold text-[#636363] z-[50]">PESO CARGABLE TRANSPORTE AEREO</h5>
                        <p>aquí se debe poner el peso de la carga y el peso cargable para transporte aereo sera el mayor de los 2


                        </p>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f1" onChange={onChangeHandler} id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso kg</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="number" name="f2" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                            <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso volumetrico</label>
                        </div>




                        <Button type="submit" theme="Primary">CALCULAR</Button>
                        <div className="text-[14px] text-center font-medium text-white">No tienes una cuenta? <Link href="/SignUp" className="text-gray-100 hover:underline">Registrate</Link ></div>

                    </div>
                </form> */}
            </div>

            {success == 'AccountNonExist' && <Error>Cuenta inexistente</Error>}
            {success == 'Complete' && <Error>Complete el formulario</Error>}
        </div >
    )
}





