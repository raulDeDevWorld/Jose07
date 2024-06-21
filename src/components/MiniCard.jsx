'use client';

import Button from '@/components/Button'
import { useUser } from '@/context/Context.js'
import { useRouter } from 'next/navigation';

export default function Card({ nombre1, nombre2, nombre3, costo, url, empresa, descripcion, i }) {

    const { user, userDB, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, cart, setUserCart } = useUser()
    const router = useRouter()

    function seeMore(e) {
        setUserItem(i)
        router.push('/Producto')
    }

    const addCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: 1 } })
    }

    const addPlussCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: cart[i.uuid].cantidad + 1 } })
    }
    const addLessCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const obj = { ...cart }
        delete obj[i.uuid]
        console.log(obj)

        cart[i.uuid].cantidad - 1 == 0
            ? setUserCart(obj)
            : setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: cart[i.uuid].cantidad - 1 } })
    }
    console.log(item)
    return (
        <div className="relative w-full max-w-[500px] py-4" onClick={(e) => seeMore(e, i)} style={{ display: 'grid', gridTemplateColumns: 'auto 80px' }}>
            <div className=" flex  flex-col justify-between ">
                <div className=" font-bold text-[16px]  text-gray-950">
                    {i['nombre de producto 1']}
                </div>
                <div className="flex items-baseline text-gray-900">
                    <span className="text-[12px]  text-gray-700  font-semibold">BOB</span>
                    <span className="text-[18px]  text-gray-700 font-extrabold tracking-tight">{i.costo}</span>
                </div>
            </div>
            <div>
                <div  className='flex justify-center items-start'>
                    {cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined && cart[i.uuid].cantidad !== 0
                        ? <div  className='flex w-full'>
                            <Button theme='MiniSecondary' click={(e) => addPlussCart(e, i)}>+</Button>
                            <Button theme='MiniPrimary' click={(e) => addLessCart(e, i)}>-</Button>
                        </div>
                        : <Button theme='MiniPrimary' click={(e) => addCart(e, i)}>Comprar</Button>
                    }
                </div>
                {cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined && cart[i.uuid].cantidad !== 0 && <span  className='block text-[16px] text-center '>{cart[i.uuid].cantidad}u</span>}
            </div>
        </div>
    )
}




