'use client'

import { useUser } from "@/context/Context"
import { useState, useRef, useEffect } from 'react'




const PDFdiv = ({ dbUrl, style }) => {

    // const [dataUrl, setDataUrl] = useState('');

    // const { userDB, user, recetaDB, cart } = useUser()
    // const [isCliente, setisCliente] = useState(false);




    return (
      
            <div>
                <div  style={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    padding: '1cm',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgb(255, 255, 255)',
                    boxShadow: '0 0 5px 1px rgb(175, 175, 175)',
                }}>
                    <div>
                        <p style={{ fontSize: '12px' }}>En precio justo nos sentimos orgullosos de poder brindar nuestro apoyo a medicos de gran capacidad, asi como un amplio profesionalismo como el Dr. {user.nombre}</p>
                    </div>

                    <div style={{ display: 'flex', width: '100%', flexDirection: 'row', paddingTop: '50px' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '12px', alignp: 'center' }}>RECETA MEDICA</p>

                            <div style={{ paddingTop: '12px' }}>
                                <p style={{ fontSize: '12px' }}>Paciente: {recetaDB.paciente}</p>
                            </div>
                            <div style={{ paddingTop: '12px' }}>
                                <p style={{ fontSize: '12px' }}>Diagnostico: {recetaDB.diagnostico}</p>
                            </div>
                            <div style={{ paddingTop: '12px' }}>
                                <p style={{ fontSize: '12px' }}>Hospital o centro de salud: {recetaDB.hospital}</p>
                            </div>
                            <div style={{ paddingTop: '12px' }}>
                                <p style={{ fontSize: '12px' }}>Medico: {user.nombre}</p>
                            </div>

                            <p style={{ fontSize: '12px', alignp: 'center', paddingTop: '25px' }}>TOTAL PRODUCTOS</p>

                            {Object.values(cart).length > 0 ? Object.values(cart).map((i, index) => {
                                return <div style={{ paddingTop: '12px' }}  >

                                    <p style={{ fontSize: '12px' }}>
                                        Nombre de producto: {i['nombre de producto 1']}
                                    </p>
                                    <p style={{ fontSize: '12px' }}>
                                        Cantidad: {i['cantidad']}u
                                    </p>

                                </div>
                            }) : ''}

                        </div>
                        <div style={{ width: '50%', }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <img src="/logo-main.png" style={{ height: '130px', width: '100px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                                {dataUrl ? <img src={dataUrl} style={{ width: '200px', height: '200px', marginTop: '50px' }} />
                                    : ''}
                            </div>

                        </div>
                    </div>
                    <div style={{ width: '100%', paddingTop: '25px' }}>
                        <p style={{ fontSize: '12px' }}>

                            El médico especialista que le está atendiendo cuenta con la idoneidad necesaria para emitir esta receta de implantes de osteosíntesis.
                            Precio justo recomienda seguir siempre el criterio de su médico tratante, puesto su experiencia es invaluable.
                            Precio Justo. La mejor calidad al menor precio.

                        </p>
                    </div>
                </div>
            </div>

    )
}

export default PDFdiv