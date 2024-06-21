'use client';
import { useState } from 'react'
import { useUser } from '@/context/Context.js'

export default function Button({ theme, styled, click, children }) {

    const { user, cart, tienda, productDB, setUserProduct, setUserItem } = useUser()

    const [add, setAdd] = useState(false)
    const [showCart, setShowCart] = useState(false)





    return (<div  className={` transition-all ease-in-out duration-300  z-40`}>
        <button type="button" onClick={() => setShowCart(!showCart)} className="h-[40px] w-[40px] my-1 text-blue-700 bg-[#2A52BE] border-[2px] border-white font-medium rounded-full text-[12px] p-2.5 text-center flex justify-center items-center ">
            { tienda !== 'Recetar'
            ? <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.05136 7.61905C9.33337 7.61905 9.56993 7.52762 9.76103 7.34476C9.95213 7.16191 10.0474 6.93587 10.0467 6.66667V4.76191H12.0374C12.3194 4.76191 12.5559 4.67048 12.747 4.48762C12.9381 4.30476 13.0333 4.07873 13.0327 3.80953C13.0327 3.53968 12.9371 3.31334 12.746 3.13048C12.5549 2.94762 12.3187 2.85651 12.0374 2.85715H10.0467V0.952384C10.0467 0.682543 9.95114 0.456194 9.76003 0.273336C9.56893 0.0904794 9.33271 -0.000631625 9.05136 3.29544e-06C8.76935 3.29544e-06 8.53279 0.0914318 8.34169 0.274289C8.15058 0.457146 8.05536 0.683178 8.05603 0.952384V2.85715H6.06537C5.78336 2.85715 5.5468 2.94857 5.3557 3.13143C5.16459 3.31429 5.06937 3.54032 5.07004 3.80953C5.07004 4.07937 5.16559 4.30572 5.35669 4.48857C5.54779 4.67143 5.78402 4.76254 6.06537 4.76191H8.05603V6.66667C8.05603 6.93651 8.15158 7.16286 8.34268 7.34572C8.53379 7.52857 8.77001 7.61968 9.05136 7.61905ZM14.028 20C14.5754 20 15.0442 19.8133 15.4344 19.44C15.8246 19.0667 16.0193 18.6184 16.0187 18.0952C16.0187 17.5714 15.8236 17.1229 15.4334 16.7495C15.0432 16.3762 14.5748 16.1898 14.028 16.1905C13.4806 16.1905 13.0118 16.3771 12.6216 16.7505C12.2314 17.1238 12.0367 17.5721 12.0374 18.0952C12.0374 18.619 12.2324 19.0676 12.6226 19.441C13.0128 19.8143 13.4812 20.0006 14.028 20ZM4.0747 20C4.62214 20 5.09094 19.8133 5.48111 19.44C5.87128 19.0667 6.06603 18.6184 6.06537 18.0952C6.06537 17.5714 5.87028 17.1229 5.48011 16.7495C5.08994 16.3762 4.62147 16.1898 4.0747 16.1905C3.52727 16.1905 3.05847 16.3771 2.6683 16.7505C2.27813 17.1238 2.08338 17.5721 2.08404 18.0952C2.08404 18.619 2.27913 19.0676 2.6693 19.441C3.05947 19.8143 3.52794 20.0006 4.0747 20ZM14.028 15.2381C14.7911 15.2381 15.3677 14.9244 15.7579 14.2971C16.1481 13.6698 16.152 13.047 15.7698 12.4286L14.4261 10.0952L18.0093 2.85715H19.0047C19.2867 2.85715 19.5232 2.76572 19.7143 2.58286C19.9054 2.4 20.0007 2.17397 20 1.90476C20 1.63492 19.9044 1.40857 19.7133 1.22572C19.5222 1.04286 19.286 0.951749 19.0047 0.952384H17.3624C17.1799 0.952384 17.0057 1 16.8398 1.09524C16.6739 1.19048 16.5495 1.3254 16.4666 1.5L12.5101 9.52381H5.51793L1.93474 3.33334C1.8518 3.19048 1.73568 3.07524 1.58638 2.98762C1.43708 2.9 1.27119 2.85651 1.08871 2.85715C0.707169 2.85715 0.420845 3.01207 0.22974 3.32191C0.0386372 3.63175 0.0346584 3.94508 0.217798 4.26191L3.77611 10.4286C3.95858 10.746 4.20343 10.9921 4.51066 11.1667C4.81788 11.3413 5.15364 11.4286 5.51793 11.4286H12.9331L14.028 13.3333H3.07937C2.79736 13.3333 2.56081 13.4248 2.3697 13.6076C2.1786 13.7905 2.08338 14.0165 2.08404 14.2857C2.08404 14.5556 2.1796 14.7819 2.3707 14.9648C2.5618 15.1476 2.79803 15.2387 3.07937 15.2381H14.028Z" fill="white" />
            </svg>
            : <svg  width="18" height="18"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0C6.46957 0 5.96086 0.210714 5.58579 0.585786C5.21071 0.960859 5 1.46957 5 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0L7 0Z" fill="white" />
                    <path d="M13 20C13.5304 20 14.0391 19.7893 14.4142 19.4142C14.7893 19.0391 15 18.5304 15 18V5C15 4.46957 14.7893 3.96086 14.4142 3.58579C14.0391 3.21071 13.5304 3 13 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H13ZM9 5H13V10H9V5ZM4 5H8V6H4V5ZM4 7H8V8H4V7ZM4 9H8V10H4V9ZM4 11H13V12H4V11ZM4 13H13V14H4V13ZM4 15H13V16H4V15Z" fill="white" />
                </svg>}
            <span  className='inline-block absolute top-[10px] text-white right-[10px] bg-[#2A52BE] w-[16px] text-[12px] rounded-full border border-white'>{
                Object.values(cart).reduce((acc, i, index) => {
                    const sum = i['cantidad'] + acc
                    return sum
                }, 0)
            }</span>
            <span className="sr-only">Icon description</span>
        </button>
        {/* <div  className={`absolute items-center justify-between top-[40px] w-1/2 bg-transparent md:flex md:w-auto  transition-all	z-0 ${showCart ? 'right-0' : 'right-[-400px]'}`} >
            <ul  className="flex flex-col bg-gray-100 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                {Object.values(cart).map((i, index) => <li  className='border-b border-gray-300 py-[12px]' key={index}>
                    {i['nombre de producto 1']} <br /> {i['costo'] * i['cantidad']} BOB
                </li>)}

            <li  className='border-b border-gray-300 text-red-600 py-[6px]'>
                 TOTAL: {Object.values(cart).reduce((acc, i, index) => {
                    const sum = i['costo'] * i['cantidad']
                    return sum + acc
                }, 0)} BOB
                </li>
            </ul>
        </div> */}
    </div>)
}














{/* <div  className={`fixed right-[20px] transition-all ease-in-out duration-300 ${add ? 'bottom-[150px] lg:bottom-[73px]' : 'bottom-[-200px] lg:bottom-[73px]'} z-40`}>
    <button type="button" onClick={() => funcion('Portada')} className="h-[50px] w-[50px] my-1 text-blue-700 bg-gray-950 border border-gray-700 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-gray-500 font-medium rounded-full text-[12px] p-2.5 text-center flex justify-center items-center ">
        <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" fill="#636363"></path>
        </svg>
        <span className="sr-only">Icon description</span>
    </button>
    <button type="button" onClick={() => funcion('Servicios')} className="h-[50px] w-[50px] my-1 bg-gray-950 border border-gray-700 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-gray-500 font-medium rounded-full text-[12px] text-center flex justify-center items-center p-0">
        <svg className="w-7 h-4 mb-1 mr-0.5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4Z" fill="#636363" />
            <path d="M13.8295 12.4545C13.7784 12.0227 13.571 11.6875 13.2074 11.4489C12.8438 11.2102 12.3977 11.0909 11.8693 11.0909C11.483 11.0909 11.1449 11.1534 10.8551 11.2784C10.5682 11.4034 10.3438 11.5753 10.1818 11.794C10.0227 12.0128 9.94318 12.2614 9.94318 12.5398C9.94318 12.7727 9.99858 12.973 10.1094 13.1406C10.223 13.3054 10.3679 13.4432 10.544 13.554C10.7202 13.6619 10.9048 13.7514 11.098 13.8224C11.2912 13.8906 11.4688 13.946 11.6307 13.9886L12.517 14.2273C12.7443 14.2869 12.9972 14.3693 13.2756 14.4744C13.5568 14.5795 13.8253 14.723 14.081 14.9048C14.3395 15.0838 14.5526 15.3139 14.7202 15.5952C14.8878 15.8764 14.9716 16.2216 14.9716 16.6307C14.9716 17.1023 14.848 17.5284 14.6009 17.9091C14.3565 18.2898 13.9986 18.5923 13.527 18.8168C13.0582 19.0412 12.4886 19.1534 11.8182 19.1534C11.1932 19.1534 10.652 19.0526 10.1946 18.8509C9.74006 18.6491 9.3821 18.3679 9.12074 18.0071C8.86222 17.6463 8.71591 17.2273 8.68182 16.75H9.77273C9.80114 17.0795 9.91193 17.3523 10.1051 17.5682C10.3011 17.7812 10.5483 17.9403 10.8466 18.0455C11.1477 18.1477 11.4716 18.1989 11.8182 18.1989C12.2216 18.1989 12.5838 18.1335 12.9048 18.0028C13.2259 17.8693 13.4801 17.6847 13.6676 17.4489C13.8551 17.2102 13.9489 16.9318 13.9489 16.6136C13.9489 16.3239 13.8679 16.0881 13.706 15.9062C13.544 15.7244 13.331 15.5767 13.0668 15.4631C12.8026 15.3494 12.517 15.25 12.2102 15.1648L11.1364 14.858C10.4545 14.6619 9.91477 14.3821 9.51705 14.0185C9.11932 13.6548 8.92045 13.179 8.92045 12.5909C8.92045 12.1023 9.05256 11.6761 9.31676 11.3125C9.58381 10.946 9.94176 10.6619 10.3906 10.4602C10.8423 10.2557 11.3466 10.1534 11.9034 10.1534C12.4659 10.1534 12.9659 10.2543 13.4034 10.456C13.8409 10.6548 14.1875 10.9276 14.4432 11.2741C14.7017 11.6207 14.8381 12.0142 14.8523 12.4545H13.8295Z" fill="none" />
        </svg>
        <span className="sr-only">Icon description</span>
    </button>
    <button type="button" onClick={() => funcion('Testimonios')} className="h-[50px] w-[50px] my-1 text-blue-700 bg-gray-950 border border-gray-700 flex- hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-gray-500 font-medium rounded-full text-[12px] p-2.5 text-center flex justify-center items-center ">
        <svg className="w-4 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M7 0C6.46957 0 5.96086 0.210714 5.58579 0.585786C5.21071 0.960859 5 1.46957 5 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0L7 0Z" fill="#636363" />
            <path d="M13 20C13.5304 20 14.0391 19.7893 14.4142 19.4142C14.7893 19.0391 15 18.5304 15 18V5C15 4.46957 14.7893 3.96086 14.4142 3.58579C14.0391 3.21071 13.5304 3 13 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H13ZM9 5H13V10H9V5ZM4 5H8V6H4V5ZM4 7H8V8H4V7ZM4 9H8V10H4V9ZM4 11H13V12H4V11ZM4 13H13V14H4V13ZM4 15H13V16H4V15Z" fill="#636363" />
        </svg>
        <span className="sr-only">Icon description</span>
    </button>
</div> */}





