'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail } from '@/firebase/utils'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Error from '@/components/Error'
import Video from '@/components/Video'

import Input from '@/components/Input'
import { useRouter } from 'next/navigation';



export default function Home() {

  const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
  const router = useRouter()


  const signUpHandler = (e) => {
    e.preventDefault()
    let email = e.target[0].value
    let password = e.target[1].value
    signUpWithEmail(email, password, setUserProfile)
  }

  useEffect(() => {
    user == undefined && onAuth(setUserProfile)
    user && router.push('/Register')
  }, [user, success]);


  console.log(user)
  return (

    <div  className="min-h-full"
      style={{
        backgroundImage: 'url(/gif.gif)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}>





      <div  className='w-screen h-screen bg-gradient-to-t from-[#00061860] to-[#000618d1] flex flex-col justify-center items-center p-5 z-[50]'>

        {/* <video  className='absolute top-0  w-full min-h-[100vh] object-cover z-10' autoPlay loop muted>
      <source src='underwater.mp4' type="video/mp4" />
    </video>  */}
        {/* <img src="/truck.png"  className='absolute  w-screen h-screen bg-[#01A7EB] object-cover lg:hidden' alt="" /> */}

        <img src="/airplane-bg.jpg"  className='absolute  w-screen h-screen bg-[#01A7EB] object-cover' alt="" />


        <form  className={`space-y-6 lg:space-y-3 w-[100%] rounded-[30px] max-w-[350px] z-10 lg:scale-110`} onSubmit={signUpHandler} >
          <div  className='w-full text-center flex justify-center'>
            <img src="/logo.svg"  className='w-[300px] z-[30]' alt="User" />
          </div>

          <br />
          <div  className='space-y-4 bg-[#00061860] p-5  rounded-[10px] lg:space-y-3'>
            <h5  className="text-[22px] font-bold text-center text-white">Registrate</h5>

            <div>
              <label htmlFor="email"  className="block mb-2 text-[16px] text-left font-medium text-[#F1BA06]">Email</label>
              <Input type="email" name="email" id="email"  className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
            </div>
            <div>
              <label htmlFor="password"  className="block mb-2 text-[16px] text-left  font-medium text-[#F1BA06]">Contraseña</label>
              <Input type="password" name="password" id="password" placeholder="••••••••"  className="bg-gray-50 border border-gray-300 text-gray-100 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div  className="flex items-start">
              <a href="#"  className="ml-auto text-[14px] text-gray-100 hover:underline">Olvidaste tu contraseña?</a>
            </div>
            <Button type="submit" theme="Primary">Continuar</Button>
            <div  className="text-[14px] text-center font-medium text-white">Ya tienes una cuenta? <Link href="/Login"  className="text-gray-100 hover:underline">Inicia Sessión</Link >
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}
