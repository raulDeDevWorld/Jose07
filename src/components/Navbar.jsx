'use client'
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react'
import { useUser } from '@/context/Context'
import Link from 'next/link'
import { handleSignOut } from '@/firebase/utils'
import Modal from '@/components/Modal'
import { glosario } from '@/db'



export default function BottomNavigation({ rol }) {
    const { user, userDB, modal, setModal, setUserProfile, setUserData, setUserProduct, setRecetaDB, setUserCart, setUserDistributorPDB, filter, setFilter, nav, setNav, navItem, setNavItem, setSeeMore } = useUser()
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollY, setScrollY] = useState(0)
    // const [filter, setFilter] = useState('')
    const router = useRouter()
    const pathname = usePathname()
    function openNav(e) {
        e.preventDefault()
        e.stopPropagation()
        setNav(!nav)
    }

    function handlerNavItem(item) {
        navItem === item
            ? setNavItem('')
            : setNavItem(item)
    }
    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
            setShow(false);
            setFilter('')
            setScrollY(window.scrollY)

        } else {
            setFilter('')
            setShow(true);
            setScrollY(window.scrollY)
        }
        setLastScrollY(window.scrollY);
    };


    // console.log(filter)
    function handlerFilter(e) {
        setFilter(e.target.value)
        console.log(filter)
    }


    // console.log()


    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY, show, filter]);
    return <>
        <nav className={`fixed  w-screen   transition-all ${pathname == '/Glosario' ? ' bg-gradient-to-br from-[#00195c] via-[#274492] to-[#00195c]' : ''} z-40  ${show ? 'top-0' : 'top-[-100px]'} transition-all  ${scrollY > 500 ? 'bg-[#101c3fd5] lg:border-b lg:border-gray-200' : ''}`}>

            <div className="w-screen flex items-center justify-between mx-auto py-4 px-4 lg:px-8 ">
                <Link href="/" className="flex items-center">
                    <img src="/logo.svg" className="relative top-[3px] h-[50px]  mr-3" alt="Flowbite Logo" />
                </Link>
                {
                    pathname === '/Glosario' && <div className="relative w-[60vw] h-[40px] ">
                        <input type="search" id="location-search" onChange={handlerFilter} className="block p-3 w-full h-full z-20  placeholder-white text-[12px]   bg-[#7397e69d] rounded-[5px] focus:ring-blue-500 focus:border-blue-500 text-white" placeholder="Glosario" required />
                        <button type="submit" className="absolute top-0 end-0 h-full p-2.5 text-[12px] font-medium text-[#000000] bg-[#ffffffc7] rounded-r-[5px] border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>

                    </div>
                }


                {/* 
                {filter.length > 1 && <div className='bg-[#fffffff8] w-screen fixed top-[60px] left-0 p-5 max-h-[50vh]'>
                    {Object.entries(glosario).map((i, index) => {
                        return i[0].toUpperCase().includes(filter.toUpperCase()) && <div className='pb-[10px]'><span className='block font-medium'>{i[0]}</span>{i[1]}<span></span> </div>
                    })
                    }
                </div>} */}


                {pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' &&
                    <div className='relative  flex items-center'>
                        {
                            pathname === '/' && (user
                                ? <button className=' relative h-[35px]   z-50 bg-[#F7BE38] mr-5 p-2 px-5 rounded-[5px] border lg:hidden' onClick={() => handleSignOut()}>Cerrar Sesión</button>
                                : <button className=' relative h-[35px] z-50 bg-[#F7BE38]  mr-5 p-2 px-5 rounded-[5px] border lg:hidden' onClick={() => router.push('/Login')}>Iniciar Sesión</button>
                            )
                        }
                        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-[35px] h-[35px] justify-center text-[12px] text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 " onClick={openNav} aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 17 14">
                                <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                }

                <div className="hidden w-screen md:block md:w-auto " id="navbar-default">
                    <ul className="list-none font-medium flex flex-col p-4 md:p-0 mt-0 rounded-lg md:flex-row md:space-x-8  ">

                        <li onClick={() => handlerNavItem('Servicios')}>
                            <a href="#" className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'Servicios' ? 'text-[#F1BA06]' : 'text-white'}`}>Servicios</a>
                            <div className={`absolute top-[90px] right-[20px] w-[350px]  bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  overflow-hidden ${navItem === 'Servicios' ? 'h-auto p-[20px]' : 'h-0 overflow-hidden'}`}>
                                <Link href='#terrestre' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/TERRESTRE.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Transporte Terrestre</span>
                                </Link>
                                <Link href='#maritimo' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/MARITIMO.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Transporte Maritimo</span>
                                </Link>
                                <Link href='#aereo' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/AEREO.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Transporte Aereo</span>
                                </Link>
                                <Link href='#despachos' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/DESPACHO ADUANERO.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Despachos Aduaneros</span>
                                </Link>
                            </div>
                        </li>
                        <li onClick={() => handlerNavItem('ServiciosEspecializados')}>
                            <a href="#" className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'ServiciosEspecializados' ? 'text-[#F1BA06]' : 'text-white'}`}>Servicios Especializados</a>
                            <div className={`absolute top-[90px] right-[20px] w-[350px]  bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  overflow-hidden ${navItem === 'ServiciosEspecializados' ? 'h-auto p-[20px]' : 'h-0 overflow-hidden'}`}>
                                <Link href='/#proyecto' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/CARGA REFRIGERADA.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium">Cargas Proyecto</span>
                                </Link>
                                <Link href='#exportaciones' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/TERRESTRE.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Exportaciones</span>
                                </Link>
                                <Link href='#farmaceutico' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/MARITIMO.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Farmacéutico y Sanitario</span>
                                </Link>
                            </div>
                        </li>
                        
                        <li onClick={() => handlerNavItem('Herramientas')}>
                            <a href="#" className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'Herramientas' ? 'text-[#F1BA06]' : 'text-white'}`} >Herramientas</a>
                            <div className={`absolute top-[90px] right-[20px] w-[350px]  bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  overflow-hidden ${navItem === 'Herramientas' ? 'h-auto p-[20px]' : 'h-0 overflow-hidden'}`}>
                                <Link href='/Contenedores?item=maritimos' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/TIPOS DE CONTENEDORES.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Contenedores maritimos</span>
                                </Link>
                                <Link href='/Contenedores?item=aereos' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/TIPOS DE CONTENEDORES.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Contenedores aereos</span>
                                </Link>
                                <Link href='/Calculadora' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/CALCULADORA DE PESO CARGABLE.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Calculadora de peso cargable  </span>
                                </Link>
                                <Link href='/Impuestos' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/CALCULADORA DE IMPUESTOS.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Calculadora de impuestos  </span>
                                </Link>
                                <Link href='/#home' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/DIRECCION.png" className=" w-[35px]" alt="" />
                                    <span className="text-[12px] font-medium text-center">Tracking</span>
                                </Link>
                            </div>
                        </li>
                        <li onClick={() => handlerNavItem('Nosotros')}>
                            <a href="#" className={`block py-2 pl-3 pr-4 text-[14px] rounded   md:border-0  md:p-0   transition-all hover:text-[#F1BA06] cursor-pointer z-30 ${navItem === 'Nosotros' ? 'text-[#F1BA06]' : 'text-white'}`}>Acerca de</a>
                            <div className={`absolute top-[90px] right-[20px] w-[350px]  bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  overflow-hidden ${navItem === 'Nosotros' ? 'h-auto p-[20px]' : 'h-0 overflow-hidden'}`}>
                                <Link href='/#Nosotros' className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/NOSOTROS.png" className=" w-[35px]" alt="" />
                                    <span>Nosotros</span>
                                </Link>
                                <Link href='/#PorQueElegirnos' onClick={() => { setNav(false); setSeeMore('PORQUE') }} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                                    <img src="/icons/NOSOTROS.png" className=" w-[35px]" alt="" />
                                    <span>Por que nosotros?</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>





        <div className={`fixed top-0 w-screen lg:w-screen lg:border-r-8 overflow-auto  bg-gradient-to-tr from-[#00195c] via-[#274492] to-[#00195c] h-screen transition-all	z-50  py-[20px] pb-[50px] ${nav ? 'left-0  ' : 'left-[-100vw] '} z-50`} >
            <div className="py-4 overflow-y-auto absolute top-[10px] right-[20px]">
                <div className="w-[100%] text-[12px] flex justify-between items-center">
                    <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={() => setNav(false)}>
                        <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#991b1b" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/*-------------------------------------------- MOBILE--------------------------- */}
            <div className='pt-5'>
                <h3 className="text-white text-[12px] font-medium pt-2 pl-5 m-0">NOSOTROS</h3>
                <div className='grid grid-cols-2 gap-[20px] p-[20px] pt-[10px]'>
                    <Link href='/#Nosotros' onClick={() => setNav(false)} className='bg-[#F1BA06]    flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/NOSOTROS.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Nosotros</span>
                    </Link>
                    <Link href='/#PorQueElegirnos' onClick={() => { setNav(false); setSeeMore('PORQUE') }} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/TRABAJO CONCLUIDO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Por que elegirnos?</span>
                    </Link>
                </div>
                <h3 className="text-white text-[12px] font-medium pt-2 pl-5 m-0">NUESTROS SERVICIOS</h3>
                <div className='grid grid-cols-2 gap-[20px] p-[20px] pt-[10px]'>
                    <Link href='#terrestre' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/TERRESTRE.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Transporte Terrestre</span>
                    </Link>
                    <Link href='#maritimo' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/MARITIMO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Transporte Maritimo</span>
                    </Link>
                    <Link href='#aereo' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/AEREO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Transporte Aereo</span>
                    </Link>
                    <Link href='#despachos' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/DESPACHO ADUANERO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Despachos Aduaneros</span>
                    </Link>

                </div>
                <h3 className="text-white text-[12px] font-medium pt-2 pl-5 m-0">SERVICIOS ESPECIALIZADOS</h3>
                <div className='grid grid-cols-2 gap-[20px] p-[20px] pt-[10px]'>

                    <Link href='/#proyecto' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/CARGA REFRIGERADA.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium">Cargas Proyecto</span>
                    </Link>
                    <Link href='#exportaciones' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/TERRESTRE.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Exportaciones</span>
                    </Link>
                    <Link href='#farmaceutico' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/MARITIMO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Farmacéutico y Sanitario</span>
                    </Link>
                </div>

                <h3 className="text-white text-[12px] font-medium pt-2 pl-5 m-0">HERRAMIENTAS</h3>
                <div className='relative grid grid-cols-2 gap-[20px] p-[20px] pt-[10px] '>
                    <Link href='/Contenedores?item=maritimos' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/TIPOS DE CONTENEDORES.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Contenedores maritimos</span>
                    </Link>
                    <Link href='/Contenedores?item=aereos' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/TIPOS DE CONTENEDORES.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Contenedores aereos</span>
                    </Link>
                    <Link href='/Calculadora' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/CALCULADORA DE PESO CARGABLE.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Calculadora de peso cargable  </span>
                    </Link>
                    <Link href='/Impuestos' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/CALCULADORA DE IMPUESTOS.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Calculadora de impuestos </span>
                    </Link>
                    <Link href='/Tracking' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/DIRECCION.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Tracking</span>
                    </Link>
                    <Link href='/Glosario' onClick={() => setNav(false)} className='bg-[#F1BA06]   flex flex-col items-center px-[5px] py-[5px] rounded-[7px]'>
                        <img src="/icons/GLOSARIO.png" className=" w-[35px]" alt="" />
                        <span className="text-[12px] font-medium text-center">Glosario</span>
                    </Link>
                </div>
                <div className='relative grid grid-cols-2 gap-[20px] p-[20px] pt-[10px] '>

                </div>
            </div>
        </div>
    </>
}


