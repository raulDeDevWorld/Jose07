
'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import { useEffect, useState, useRef } from 'react'
import Subtitle from '@/components/Subtitle'
import { useRouter } from 'next/navigation';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import priceFTL from '@/db/priceFTL.json'
import 'react-awesome-slider/dist/styles.css';
import Footer from '@/components/footer'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/Button'
import InputFlotante from '@/components/InputFlotante'

// body {
//     font-family: Arial, sans-serif;
//     margin: 0;
//     padding: 20px;
//     background: #f3f3f3;
// }
// .container {
// max-width: 960px;
// background: white;
// padding: 20px;
// margin: 20px auto;
// box-shadow: 0 4px 8px rgba(0,0,0,0.1);
// }
// video {
//     width: 100%;
//     max-width: 640px;
//     height: auto;
//     display: block;
//     margin: 20px auto;
// }
// table {
//     width: 100%;
//     margin-top: 20px;
//     border-collapse: collapse;
//     table-layout: fixed;
// }
// th, td {
// border: 1px solid #ccc;
// padding: 8px;
// text-align: left;
// word-wrap: break-word;
// }
// th {
//     background-color: #f9f9f9;
// }
// caption {
// font-size: 1.2em;
// font-weight: bold;
// text-align: left;
// margin: 10px 0;
// }
// h2 {
//     text-align: center;
//     color: #333;
// }






function Pages() {
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, nav, navItem, setuserDB, focus, setFocus, seeMore, setSeeMore } = useUser()


    const [query, setQuery] = useState('')
    const [route, setRoute] = useState('')




    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [userDB])

    console.log(userDB)
    userDB && userDB.tracking && console.log(userDB.tracking)


    return userDB && userDB.tracking && userDB.tracking[query] &&
        <div class="relative flex justify-center min-h-screen pt-[70px]">
            <img src="/airplane-bg.jpg" className='fixed top-0 w-screen h-screen  object-cover ' alt="" />

            <div class="relative  py-[100px] max-w-[960px] w-[80vw] bg-white p-[20px]  shadow-[0 4px 8px rgba(0,0,0,0.1)]">




                <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] "  >
                    <div className='relative p-5 my-5 mt-10 bg-white space-y-5'>
                        <h5 className='text-center font-medium text-[16px]'>Informacion de Carga<br /> </h5>

                        < InputFlotante type="text" id="floating_5" disabled={true}  disabled={true} value={userDB.tracking[query]['data']} required label={'data'} shadow='shadow-white' />
                        < InputFlotante type="text" id="floating_5"   disabled={true} value={userDB.tracking[query]['data1']} required label={'data1'} shadow='shadow-white' />
                        < InputFlotante type="number" id="floating_5"   disabled={true} value={userDB.tracking[query]['data2']} required label={'data2'} shadow='shadow-white' />
                        < InputFlotante type="number" id="floating_5"   disabled={true} value={userDB.tracking[query]['data3']} required label={'data3'} shadow='shadow-white' />
                        < InputFlotante type="text" id="floating_5"   disabled={true} value={userDB.tracking[query]['data4']} required label={'data4'} shadow='shadow-white' />
                        < InputFlotante type="text" id="floating_5"   disabled={true} value={userDB.tracking[query]['data5']} required label={'data5'} shadow='shadow-white' />
                        < InputFlotante type="text" id="floating_5"   disabled={true} value={userDB.tracking[query]['data6']} required label={'data6'} shadow='shadow-white' />
                        < InputFlotante type="number" id="floating_5"   disabled={true} value={userDB.tracking[query]['data7']} required label={'data7'} shadow='shadow-white' />
                        < InputFlotante type="number" id="floating_5"   disabled={true} value={userDB.tracking[query]['data8']} required label={'data8'} shadow='shadow-white' />

                        <div className='flex justify-center'>
                            <Button theme="Primary" click={(e) => { saveFrontPage(e,) }}>Guardar</Button>
                        </div>
                    </div>
                </form>





            </div>
        </div>
}

export default Pages