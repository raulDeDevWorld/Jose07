
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
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, cliente, nav, navItem, setCliente, focus, setFocus, seeMore, setSeeMore } = useUser()


    const [query, setQuery] = useState('')
    const [route, setRoute] = useState('')




    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setRoute(window.location.href.split('=')[2])
            setQuery(window.location.href.split('=')[1].split('&')[0])
        }
    })


    cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && console.log(cliente[query].tarjetas[route])


    return cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] &&
        <div class="relative flex justify-center min-h-screen pt-[70px]">
                <img src="/airplane-bg.jpg" className='fixed top-0 w-screen h-screen  object-cover ' alt="" />

            <div class="relative  py-[100px] max-w-[960px] bg-white p-[20px]  shadow-[0 4px 8px rgba(0,0,0,0.1)]">
                {/* <h1 className='font-bold text-[20px]'>Gama Completa de Contenedores - Logistics Gear</h1> */}

                <h2 className='font-bold text-[18px] text-[#333] text-center'>{cliente[query].tarjetas[route]['subtitle 1']}</h2>
                <br />
                <div className='flex justify-center'>
                    <video className='' autoPlay loop muted>
                        <source src={cliente[query].tarjetas[route].urlVideo} type="video/mp4" />
                    </video>
                </div>

                <table className='w-full mt-[20px] border-collapse	table-fixed'>
                    <caption className='    text-[1.2em] font-bold text-left m-[10px]'>{cliente[query].tarjetas[route]['subtitle 2']}</caption>
                    {cliente && cliente[query] && cliente[query].tarjetas && cliente[query].tarjetas[route] && cliente[query].tarjetas[route].especificaciones && Object.values(cliente[query].tarjetas[route].especificaciones).map((i, index) => {
                        return <tr>
                            <th className=' border-[1px]  border-[#ccc] p-[8px] text-left font-bold bg-[#f9f9f9]' >
                                {i.ic}
                            </th>
                            <td className=' border-[1px]  border-[#ccc] p-[8px] text-left break-words'>
                                {i.ip}
                            </td>
                        </tr>
                    })}
                </table>
            </div>
        </div>
}

export default Pages