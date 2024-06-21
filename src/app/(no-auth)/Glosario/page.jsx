'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react'
import { useUser } from '@/context/Context'
import Link from 'next/link'
import { handleSignOut } from '@/firebase/utils'
import Modal from '@/components/Modal'
import { glosario } from '@/db'



export default function BottomNavigation({ rol }) {
    const { user, userDB, modal, setModal, setUserProfile, setUserData, setUserProduct, setRecetaDB, setUserCart, setUserDistributorPDB, filter, setFilter, nav, setNav, navItem, setNavItem } = useUser()
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
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

        } else {
            setFilter('')
            setShow(true);
        }
        setLastScrollY(window.scrollY);
    };


    console.log(filter)
    function handlerFilter(e) {
        setFilter(e.target.value)
        console.log(filter)
    }


    console.log()


    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY, show, filter]);
    return <div className='bg-[#fffffff8] w-screen p-5 mt-[80px] '>

        <h3 className='text-[#F7BE38] text-[26px] font-bold mb-10'>GLOSARIO DE TERMINOS DE COMERCIO INTERNACIONAL</h3>
        {
            Object.entries(glosario).map((i, index) => {
                return i[0].toUpperCase().includes(filter.toUpperCase()) && i[0].toUpperCase().includes(filter.toUpperCase()) && <div className='flex pb-[10px]'>
                    <svg  className='absolute h-[20px] w-[20px]' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.265 24.3816L24.165 23.4876C28.329 23.6236 28.393 23.4776 28.576 23.0496L29.72 20.2646L29.805 20.0006L29.712 19.7696C29.663 19.6476 29.512 19.2836 26.912 16.8046V15.5006C29.912 12.6106 29.848 12.4626 29.677 12.0396L28.538 9.22563C28.367 8.80363 28.302 8.63863 24.168 8.75163L23.268 7.82163C23.3621 6.45175 23.3148 5.07582 23.127 3.71563L23.011 3.45263L20.037 2.15263C19.599 1.95263 19.445 1.88063 16.637 4.93863L15.375 4.91963C12.484 1.83363 12.347 1.88963 11.914 2.06463L9.14901 3.18263C8.71601 3.35763 8.56301 3.41963 8.73101 7.61963L7.83801 8.50963C3.67601 8.37363 3.61201 8.52163 3.43101 8.94763L2.28501 11.7336L2.19501 12.0006L2.28901 12.2326C2.33801 12.3526 2.48301 12.7126 5.08901 15.1946V16.4946C2.08901 19.3846 2.15401 19.5326 2.32601 19.9566L3.46401 22.7736C3.63801 23.2046 3.70001 23.3576 7.83301 23.2496L8.73301 24.1846C8.63942 25.5524 8.68533 26.9261 8.87001 28.2846L8.98601 28.5496L11.979 29.8576C12.414 30.0396 12.565 30.1046 15.365 27.0576L16.627 27.0736C19.522 30.1636 19.67 30.1036 20.093 29.9326L22.852 28.8176C23.288 28.6446 23.44 28.5836 23.265 24.3816ZM11.407 17.8576C11.0581 16.9457 10.9862 15.951 11.2005 14.9984C11.4148 14.0457 11.9056 13.1776 12.6114 12.5029C13.3173 11.8282 14.2066 11.377 15.1679 11.2059C16.1293 11.0347 17.1197 11.1513 18.015 11.541C18.9103 11.9307 19.6706 12.5761 20.2004 13.3963C20.7302 14.2165 21.0061 15.1749 20.9932 16.1512C20.9804 17.1276 20.6795 18.0784 20.1284 18.8843C19.5772 19.6903 18.8002 20.3156 17.895 20.6816C16.6599 21.1646 15.2838 21.1386 14.0679 20.6093C12.8519 20.0801 11.8952 19.0907 11.407 17.8576Z" fill="#99B8C4" />
                    </svg>
                    <span className='block font-bold pl-10'>{i[0]}: <span>{i[1]}</span></span>
                </div>
            })
        }
    </div>

}








// {
//     filter.length > 1 &&
//     <div className='bg-[#fffffff8] w-screen fixed top-[60px] left-0 p-5 max-h-[50vh]'>
//          {Object.entries(glosario).map((i, index) => {
//              return i[0].toUpperCase().includes(filter.toUpperCase()) && <div className='pb-[10px]'><span className='block font-bold'>{i[0]}</span>{i[1]}<span></span>
//              </div>
//          })
//          }

//     }
