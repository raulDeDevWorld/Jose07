'use client';

import { useUser } from '@/context/Context.js'
// import { useEffect, useState, useRef } from 'react'


export default function Button({ theme, click, children }) {

  const { videoRef, introVideo, setIntroVideo, play, setPlay, sound, setSound, user, userDB, setUserData, setUserSuccess, success } = useUser()
  // const videoRef = useRef();
  // const [play, setPlay] = useState(true)
  // const [sound, setSound] = useState(false)
  // const [introVideo, setIntroVideo] = useState(true)

  const handlerPlay = () => {
    if (play) {
      videoRef.current.pause()
      setIntroVideo(!introVideo)
      setPlay(false)
    } else {
      videoRef.current.play()
      setIntroVideo(!introVideo)
      setPlay(true)
      setSound(true)
    }
    videoRef.current.muted = false
  };

  const handlerSound = () => {
    videoRef.current.play()
    setPlay(true)
    setSound(true)
    videoRef.current.muted = false
  };
  return (
    <div>

      <div  className='z-30 absolute top-0 p-5 h-[50px] w-full'>
        {introVideo && <div  className='flex'>
          <span  className='flex  items-center justify-center z-50 bg-[#ffffff70] w-[50px] text-[white]  text-center text-[16px] py-3 rounded-full' onClick={handlerSound}>
            <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.2734 10C15.2734 8.61328 14.4258 7.42578 13.2227 6.92578L12.582 8.46484C13.1836 8.71484 13.6055 9.30859 13.6055 10.0039C13.6055 10.6953 13.1836 11.2891 12.582 11.543L13.2227 13.082C14.4258 12.5742 15.2734 11.3867 15.2734 10ZM14.5039 3.84766L13.8633 5.38672C15.6719 6.14062 16.9414 7.92187 16.9414 10C16.9414 12.082 15.6719 13.8594 13.8633 14.6133L14.5039 16.1523C16.9141 15.1484 18.6055 12.7734 18.6055 10C18.6055 7.22656 16.9141 4.85156 14.5039 3.84766ZM1.94141 5.83203V14.1641H5.27344L11.1055 20V0L5.27344 5.83203H1.94141Z" fill="white" />
            </svg>
            {sound == false && <span  className='absolute bg-gray-400 transform rotate-45 w-[4px] h-[50px]'></span>}
          </span>
          {/* {play
            ? <span  className='flex items-center justify-center z-50 bg-[#ffffff70] w-[50px] h-[50px] text-[white]  text-center text-[16px] py-3 rounded-full' onClick={handlePause}>

              <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.92996 17.0698C1.97486 16.1474 1.21303 15.0439 0.688943 13.8239C0.164853 12.6038 -0.111009 11.2916 -0.122547 9.96385C-0.134085 8.63605 0.118932 7.31926 0.62174 6.09029C1.12455 4.86133 1.86708 3.74481 2.80601 2.80589C3.74493 1.86696 4.86145 1.12443 6.09042 0.621618C7.31938 0.11881 8.63618 -0.134207 9.96397 -0.122669C11.2918 -0.111131 12.604 0.164731 13.824 0.688821C15.044 1.21291 16.1475 1.97473 17.07 2.92984C18.8915 4.81586 19.8995 7.34188 19.8767 9.96385C19.8539 12.5858 18.8022 15.0939 16.9481 16.948C15.0941 18.8021 12.5859 19.8538 9.96397 19.8766C7.342 19.8994 4.81598 18.8914 2.92996 17.0698ZM15.66 15.6598C17.1611 14.1587 18.0044 12.1227 18.0044 9.99984C18.0044 7.87692 17.1611 5.84096 15.66 4.33984C14.1588 2.83871 12.1229 1.99539 9.99996 1.99539C7.87705 1.99539 5.84108 2.83871 4.33996 4.33984C2.83883 5.84096 1.99551 7.87692 1.99551 9.99984C1.99551 12.1227 2.83883 14.1587 4.33996 15.6598C5.84108 17.161 7.87705 18.0043 9.99996 18.0043C12.1229 18.0043 14.1588 17.161 15.66 15.6598ZM6.99996 5.99984H8.99996V13.9998H6.99996V5.99984ZM11 5.99984H13V13.9998H11V5.99984Z" fill="white" />
              </svg>
            </span>
            : <span  className='flex items-center justify-center z-50 bg-[#ffffff70] w-[50px] h-[50px] text-[white]  text-center text-[16px] py-3 rounded-full' onClick={handlePlay}>
              <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.92996 17.0698C1.97486 16.1474 1.21303 15.0439 0.688943 13.8239C0.164853 12.6038 -0.111009 11.2916 -0.122547 9.96385C-0.134085 8.63605 0.118932 7.31926 0.62174 6.09029C1.12455 4.86133 1.86708 3.74481 2.80601 2.80589C3.74493 1.86696 4.86145 1.12443 6.09042 0.621618C7.31938 0.11881 8.63618 -0.134207 9.96397 -0.122669C11.2918 -0.111131 12.604 0.164731 13.824 0.688821C15.044 1.21291 16.1475 1.97473 17.07 2.92984C18.8915 4.81586 19.8995 7.34188 19.8767 9.96385C19.8539 12.5858 18.8022 15.0939 16.9481 16.948C15.0941 18.8021 12.5859 19.8538 9.96397 19.8766C7.342 19.8994 4.81598 18.8914 2.92996 17.0698ZM15.66 15.6598C17.1611 14.1587 18.0044 12.1227 18.0044 9.99984C18.0044 7.87692 17.1611 5.84096 15.66 4.33984C14.1588 2.83871 12.1229 1.99539 9.99996 1.99539C7.87705 1.99539 5.84108 2.83871 4.33996 4.33984C2.83883 5.84096 1.99551 7.87692 1.99551 9.99984C1.99551 12.1227 2.83883 14.1587 4.33996 15.6598C5.84108 17.161 7.87705 18.0043 9.99996 18.0043C12.1229 18.0043 14.1588 17.161 15.66 15.6598ZM6.99996 5.99984L15 9.99984L6.99996 13.9998V5.99984Z" fill="white" />
              </svg>
            </span>} */}
        </div>}
        <span  className='z-50 absolute flex justify-center items-center top-[15px] right-[15px] bg-gray-800 border-[2px] border-gray-50 w-[150px] text-[white] text-center text-[16px] py-3 rounded-full' onClick={handlerPlay}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4531 2.72656L12.7266 0H10.4531L13.1797 2.72656H15.4531ZM0.910156 0H0V2.72656H3.63672L0.910156 0ZM9.54687 2.72656L6.81641 0H4.54297L7.26953 2.72656H9.54687ZM16.3633 6.36328H12.7266L15.4531 3.63672H13.1797L10.4531 6.36328H6.81641L9.54297 3.63672H7.26953L4.54297 6.36328H0.910156L3.63672 3.63672H0V18.1836C0 19.1836 0.816406 20 1.81641 20H18.1797C19.1836 20 19.9961 19.1836 19.9961 18.1836V3.63672H19.0859L16.3633 6.36328ZM7.27344 17.2734V9.08984L14.5469 13.1797L7.27344 17.2734ZM16.3633 0L19.0898 2.72656H20V0H16.3633Z" fill="white" />
          </svg>
          <span  className='pl-5 text-medium'>{introVideo ? 'Cerrar' : 'Ver video'}</span>
        </span>
      </div>
      <div  className={`video-player absolute w-screen lg:w-[300px]  flex items-center h-screen my-auto ${introVideo == false ? 'left-[-200vw]' : 'left-0 right-0 mx-auto'}`} >
        <video ref={videoRef} autoPlay muted onClick={handlerSound}>
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}



