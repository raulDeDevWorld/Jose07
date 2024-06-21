'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail } from '@/firebase/utils'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
// import Button from '@/components/Button'
import Error from '@/components/Error'
import Video from '@/components/Video'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import Input from '@/components/Input'
import { useRouter } from 'next/navigation';
import Subtitle from '@/components/Subtitle'








const Button = ({ url, children, src }) => {
  return <button className='bg-[#ffbd2f] w-[150px] sm:w-[200px] lg:w-[250px] flex flex-col justify-self-center justify-center items-center  p-2 rounded-[5px]  m-3'>
    <img src={src} className='w-[100px]' alt="" />
    <Link href={`/Admin/Edit/Section?item=${url}`} className='font-medium'> {children}</Link>
  </button>
}
export default function Home() {

  const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
  const router = useRouter()


  const signUpHandler = (e) => {

  }

  useEffect(() => {

  }, [user, success]);


  console.log(user)
  return (

    <div className="relative min-h-full"
      style={{
        backgroundImage: 'url(/gif.gif)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}>






      {/* <video  className='absolute top-0  w-full min-h-[100vh] object-cover z-10' autoPlay loop muted>
      <source src='underwater.mp4' type="video/mp4" />
    </video>  */}
      {/* <img src="/truck.png" className='absolute  w-screen h-screen bg-[#01A7EB] object-cover lg:hidden' alt="" /> */}

      <img src="/airplane-bg.jpg" className='fixed top-0 w-screen h-screen  object-cover ' alt="" />

      <div className='relative  py-[100px]  lg:pb-[100px] h-screen flex flex-col justify-center z-10 '>
        <div className='hidden lg:flex justify-center'>
          <img src="/logo.svg" className='w-[20vw]' alt="User" />
        </div>

        <div className='relative   z-10  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>

          <Button url='terrestre' src="/icons/TERRESTRE.png" >Transporte Terrestre  </Button>
          <Button url='maritimo' src="/icons/MARITIMO.png" > Transporte Maritimo  </Button>
          <Button url='aereo' src="/icons/AEREO.png" > Transporte Aereo</Button>
          <Button url='despachos' src="/icons/DESPACHO ADUANERO.png" > Despachos Aduaneros  </Button>
          <Button url='proyecto' src="/icons/CARGA REFRIGERADA.png" >Carga Proyecto</Button>
          <Button url='exportaciones' src="/icons/TERRESTRE.png" >Exportaciones</Button>
          <Button url='farmaceutico' src="/icons/DESPACHO ADUANERO.png" >Farmaceuticos y sanitario </Button>
          <Button url='contactos' src="/icons/CARGA REFRIGERADA.png" > Contactos  </Button>
          <Button url='maritimos' src="/icons/DESPACHO ADUANERO.png" >Contenedores Maritimos </Button>
          <Button url='aereos' src="/icons/DESPACHO ADUANERO.png" >Contenedores Aereos </Button>


        </div>

      </div>





      {/* <Section subtitle='TRANSPORTE TERRESTRE' video='/highway2.mp4' degrade='#00000067' id="terrestre"></Section>
      <Section subtitle='TRANSPORTE AEREO' video='/avion.mp4' degrade='#00000018' id="aereo"></Section>
      <Section subtitle='TRANSPORTE MARITIMO' video='/barco.mp4' degrade='#00529657' id="maritimo"></Section> */}


    </div>
  )
}
