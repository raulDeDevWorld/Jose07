'use client'
import { useUser } from '@/context/Context'
import { getSpecificData } from '@/firebase/utils'

import { useState, useEffect } from 'react'
import { handleSignOut } from '@/firebase/utils'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BottomNavigation from '@/components/BottomNavigation'
import Navbar from '@/components/Navbar'
import { onAuth } from '@/firebase/utils'

function Home({ children }) {
  const router = useRouter()
  const { user, userDB, setUserProfile, setUserCart, setNavItem, setUserProduct, setRecetaDB, setUserDistributorPDB, setUserData, filter, setFilter, nav, setNav, modal, setModal, cart, cliente, setCliente } = useUser()
  const pathname = usePathname()


  console.log(pathname)



  const redirectHandler = (ref) => {
    router.push(ref)
  }

  const handlerFilter = (e) => {
    const data = e.target.value
    setFilter(data)
  }
  const back = () => {
    router.back()
  }
  function openNav(e) {
    e.preventDefault()
    e.stopPropagation()
    setNav(!nav)
  }

  const handleSignOutConfirm = () => {
    setUserProfile(null)
    setUserCart({})
    setUserProduct(undefined),
      setRecetaDB(undefined),
      setUserDistributorPDB(undefined)
    setUserData(null)
    router.push('/')
    setModal('')
    handleSignOut()
  }
  console.log(user)
  console.log(userDB)





  // function handlerFetch() {

  //   fetch('https://ovhweportalapim.azure-api.net/dpo/trackandtrace/v2.2/events', {
  //     method: 'GET',
  //     // Request headers
  //     headers: {
  //       'Cache-Control': 'no-cache',
  //     }
  //   })
  //     .then(response => {
  //       console.log(response.status);
  //       console.log(response.text());
  //     })
  //     .catch(err => console.error(err));

  // }

  // console.log(handlerFetch())
  useEffect(() => {
    if (user === undefined) onAuth(setUserProfile, setUserData)
    cliente === undefined && getSpecificData('/Cliente', setCliente)

  }, [user, cliente])
  return (
    <div className="relative" onClick={()=>setNavItem(false)}>
      {user !== undefined && cliente !== undefined && <main className={`relative min-w-screen  lg:pb-0  lg:min-w-auto my-[0px]   lg:min-h-screen  ${nav ? 'w-screen pl-[100vw] overflow-hidden ' : '  lg:px-[0px]'}`} onClick={() => setNav(false)} style={{ transition: 'all 0.5' }}>
        {children}
        {pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' && <BottomNavigation />}

      </main>}
    </div>
  )
}

export default Home

