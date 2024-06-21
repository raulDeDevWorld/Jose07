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
import InputEspecial from '@/components/InputEspecial'
import mercancias from '@/db/mercancias.json'
import { useRouter } from 'next/navigation';
import SelectSimple from '@/components/SelectSimple'
import InputFlotante from '@/components/InputFlotante.jsx'

export default function Home() {
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
    const [res, setRes] = useState(false)
    const router = useRouter()
    const [data, setData] = useState({})
    const [selectValue, setSelectValue] = useState('Seleccionar')
    const inputRef = useRef('')
    const inputRef2 = useRef('')
    const inputRef3 = useRef('')
    const inputRef4 = useRef('')
    const inputRef5 = useRef('')


    function onChangeHandler(e, db) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function formHandler(e) {
        e.preventDefault()
        if (data.mercancia && data.transporte && data[`Valor FOB`] && data[`Costo Transporte ${data.transporte}`] && data['Seguro']) {
            setRes(true)
        }
    }
    function limpiar(e) {
        e.preventDefault()
        setSelectValue('Seleccionar')
        if(inputRef.current)inputRef.current.value = ''
        if(inputRef2.current)inputRef2.current.value = ''
        if(inputRef3.current)inputRef3.current.value = ''
        if(inputRef4.current)inputRef4.current.value = ''
        if(inputRef5.current)inputRef5.current.value = ''
        setData({})
        setRes(false)
    }
    function handlerClickSelect(name, i, uuid) {
        setSelectValue(i)
        let db = {...data, mercancia: inputRef.current ? inputRef.current.value: 'MERCANCIA', transporte: i }
        setData(db)
        if (inputRef3.current) {
            inputRef3.current.value = ''
        }

    }
    function handlerSelect(i) {
        inputRef.current.value = i
        setData({ ...data, mercancia: i })
    }
    console.log(data)

    useEffect(() => {
        user === undefined && onAuth(setUserProfile)
        if (user !== undefined && user !== null) router.replace('/')
    }, [user, selectValue])

    function CIF() {
        if (data.transporte === 'Maritimo') {
            return (data[`Valor FOB`] * 1 + data[`Costo Transporte ${data.transporte}`] * 1 + data[`Costo Transporte Terrestre Puerto`] * (30 / 100) + data['Seguro'] * 1).toFixed(2)
        }
        if (data.transporte === 'Aereo') {
            return (data[`Valor FOB`] * 1 + data[`Costo Transporte ${data.transporte}`] * (25 / 100) + data['Seguro'] * 1).toFixed(2)
        }
        if (data.transporte === 'Terrestre') {
            return (data[`Valor FOB`] * 1 + data[`Costo Transporte ${data.transporte}`] * (30 / 100) + data['Seguro'] * 1).toFixed(2)
        }
        return 0
    }

    function GA() {
        if (data.mercancia && data[`Valor FOB`] && data.transporte === 'Maritimo' && data[`Costo Transporte Terrestre Puerto`]) {
            return ((data[`Valor FOB`] * 1 + data[`Costo Transporte ${data.transporte}`] * 1 + data[`Costo Transporte Terrestre Puerto`] * (30 / 100) + data['Seguro'] * 1) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100) * 1).toFixed(2)
        }
        if (data.mercancia && data[`Valor FOB`] && data.transporte === 'Aereo') {
            return ((data[`Valor FOB`] * 1 + data[`Costo Transporte ${data.transporte}`] * (25 / 100) + data['Seguro'] * 1) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100) * 1).toFixed(2)
        }
        if (data.mercancia && data[`Valor FOB`] && data.transporte === 'Terrestre') {
            return ((data[`Valor FOB`] * 1 + data[`Costo Transporte ${data.transporte}`] * (30 / 100) + data['Seguro'] * 1) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100) * 1).toFixed(2)
        }
        return 0
    }
    function baseImponible() {
        if (CIF() && GA()) {
            return ((CIF() * 1 + GA() * 1) * 1).toFixed(2)
        }
    }
    function IVA() {
        if (data.mercancia) {
            return (baseImponible() * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)).toFixed(2)
        }
    }
    function totalImpuestos() {
        if (data.mercancia) {
            return ((IVA() * 1 + GA() * 1 + 15) * 1).toFixed(2)
        }
    }
    function almacenaje() {
        return (CIF() * (.57 / 100)).toFixed(2)
    }
    function comisionAgencia() {
        if (CIF() > 0 && CIF() < 1001) { return '20 USD' }
        if (CIF() > 1000 && CIF() < 10001) { return (CIF() * (2 / 100)).toFixed(2) }
        if (CIF() > 10000 && CIF() < 20001) { return (CIF() * (1.5 / 100)).toFixed(2) }
        if (CIF() > 20000 && CIF() < 30001) { return (CIF() * (1.25 / 100)).toFixed(2) }
        if (CIF() > 30000 && CIF() < 50001) { return (CIF() * (1 / 100)).toFixed(2) }
        if (CIF() > 50000 && CIF() < 100001) { return (CIF() * (0.75 / 100)).toFixed(2) }
        if (CIF() > 100000 && CIF() < 1000000000000) { return (CIF() * (0.5 / 100)).toFixed(2) }
    }
    function totalDespachoAduanero() {
        return (comisionAgencia() * 1 + 50).toFixed(2)
    }
    function totalCostosImportacion() {
        return (totalDespachoAduanero() * 1 + almacenaje() * 1 + totalImpuestos() * 1).toFixed(2)
    }
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

                <div className='relative bg-[#ffffff] rounded-[10px] p-10 m-[10px] '>

                    <form className={`relative space-y-6   z-10   w-[80vw] md:min-w-[400px] max-w-[400px]`} >
                        <h5 className="text-[16px] text-center font-bold text-[#636363] z-[50]">IMPUESTOS DE IMPORTACION</h5>
                        <SelectSimple arr={['Terrestre', 'Maritimo', 'Aereo']} name='transporte' click={handlerClickSelect} defaultValue={selectValue} uuid='8768798' label='Tipo de transporte'></SelectSimple>
                        <InputEspecial data={mercancias} node={'MERCANCIA'} inputRef={inputRef} focusTxt='MERCANCIA' id='floating_1' select={handlerSelect}></InputEspecial>
                        <InputFlotante type="number" id="floating_3" onChange={onChangeHandler} inputRef={inputRef2} defaultValue={data['Valor FOB']} required label={'Valor FOB'} />
                        {
                            data.transporte && <>
                                <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} inputRef={inputRef3} defaultValue={data[`Costo Transporte ${data.transporte}`]} required label={`Costo Transporte ${data.transporte}`} />
                            </>
                        }
                        {
                            data.transporte === 'Maritimo' && <>
                                <InputFlotante type="number" id="floating_5" onChange={onChangeHandler} inputRef={inputRef4} defaultValue={data['Costo Transporte Terrestre Puerto']} required label={`Costo Transporte Terrestre Puerto`} />
                            </>
                        }
                        <InputFlotante type="number" id="floating_6" onChange={onChangeHandler} inputRef={inputRef5} defaultValue={data['Seguro']} required label={'Seguro'} />

                        {res && <table className='relative'>
                            <tbody>
                                {/* <tr>
                                    <td>MERCANCIA</td>
                                    <td>{data.mercancia}</td>
                                </tr>
                                <tr>
                                    <td>TIPO DE TRANSPORTE</td>
                                    <td>{data.transporte}</td>
                                </tr>
                                <tr>
                                    <td>VALOR FOB</td>
                                    <td>{data['Valor FOB']}</td>
                                </tr>
                                <tr>
                                    <td>{(`Costo Transporte ${data.transporte}`).toUpperCase()}</td>
                                    <td>{data[`Transporte ${data.transporte} valor`]}</td>
                                </tr>
                                <tr>
                                    <td>{(`Valor Transporte ${data.transporte} %`).toUpperCase()}</td>
                                    <td>{data[`Transporte ${data.transporte} valor`] * (25 / 100)}</td>
                                </tr>
                                <tr>
                                    <td>SEGURO</td>
                                    <td>{data['Seguro']}</td>
                                </tr> */}
                                <tr>
                                    <td>CIF FRONTERA</td>
                                    <td>
                                        {CIF()} USD
                                    </td>
                                </tr>
                                <tr>
                                    <td>GA</td>
                                    <td>
                                        {GA()} USD
                                    </td>
                                </tr>
                                <tr>
                                    <td>BASE IMPONIBLE IVA</td>
                                    <td>
                                        {baseImponible()} USD
                                    </td>
                                </tr>
                                <tr>
                                    <td>IVA</td>
                                    <td>
                                        {IVA()} USD
                                        {/* {data.mercancia && (CIF() + (CIF() * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)} */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>USO DE SISTEMA</td>
                                    <td>15 USD</td>
                                </tr>
                                <tr>
                                    <td>TOTAL IMPUESTOS</td>
                                    <td>{totalImpuestos()} USD</td>
                                </tr>
                                <tr>
                                    <td>ALMACENAJE 0,57%CIF</td>
                                    <td>{almacenaje()} USD</td>
                                </tr>
                                <tr>
                                    <td>COMISION AGENCIA</td>
                                    <td>
                                        {comisionAgencia()} USD

                                    </td>
                                </tr>
                                <tr>
                                    <td>GASTOS DE DESPACHO</td>
                                    <td>50 USD</td>
                                </tr>
                                <tr>
                                    <td>TOTAL DESPACHO ADUANERO</td>
                                    <td>
                                        {totalDespachoAduanero()} USD
                                    </td>
                                </tr>
                                <tr>
                                    <td>TOTAL COSTOS IMPORTACION</td>
                                    <td>
                                        {totalCostosImportacion()}  USD
                                    </td>
                                </tr>
                            </tbody>
                        </table>}
                        <div className='flex justify-center'>
                            {res && <Button theme="Success" click={limpiar} >LIMPIAR</Button>}
                            <Button theme="Primary" click={formHandler} >CALCULAR</Button>
                        </div>
                    </form>
                </div>


            </div>

            {success == 'AccountNonExist' && <Error>Cuenta inexistente</Error>}
            {success == 'Complete' && <Error>Complete el formulario</Error>}
        </div >
    )
}





