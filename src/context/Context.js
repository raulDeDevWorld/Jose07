'use client'


import React, { useState, useMemo, useRef, useContext } from 'react'

const UserContext = React.createContext()

export function UserProvider({ children }) {

	const [user, setUser] = useState(undefined)

	const [userDB, setUserDB] = useState(undefined)
	const [cliente, setCliente] = useState(undefined)
	const [focus, setFocus] = useState('')
	const [select, setSelect] = useState('')
	const [seeMore, setSeeMore] = useState('')
	const [distributorPDB, setDistributorPDB] = useState(undefined)
	const [productDB, setProduct] = useState(undefined)
	const [item, setItem] = useState(undefined)
	const [cart, setCart] = useState({})
	const [success, setSuccess] = useState('')
	const [pedidos, setPedidos] = useState([])
	const [qr, setQr] = useState('');
	const [QRurl, setQRurl] = useState('');
	const [recetaDB, setRecetaDB] = useState({});
	const [filter, setFilter] = useState('');
	const [filterQR, setFilterQR] = useState('');
	const [recetaDBP, setRecetaDBP] = useState(undefined);
	const [nav, setNav] = useState(false)
	const [navItem, setNavItem] = useState(false)
	const [temporal, setTemporal] = useState(undefined)
	const [userUuid, setUserUuid] = useState(undefined)
    const [modal, setModal] = useState('')
    const [msg, setMsg] = useState('')
    const [tienda, setTienda] = useState('Comprar')

	const videoRef = useRef();
	const [play, setPlay] = useState(true)
	const [sound, setSound] = useState(false)
	const [introVideo, setIntroVideo] = useState(true)
	const [webScann, setWebScann] = useState(false)



	const setUserProfile = (data) => {
		setUser(data)
	}
	const setUserData = (data) => {
		setUserDB(data)
	}
	const setUserDistributorPDB = (data) => {
		setDistributorPDB(data)
	}
	const setUserProduct = (data) => {
		setProduct(data)
	}
	const setUserPedidos = (data) => {
		setPedidos(data)
	}
	const setUserCart = (data) => {
		setCart(data)
	}
	const setUserItem = (data) => {
		setItem(data)
	}
	const setUserSuccess = (data) => {
		setSuccess(data)
	}

	const value = useMemo(() => {
		return ({
			user,
			userDB,
			distributorPDB,
			productDB,
			pedidos,
			item,
			cart,
			success,
			qr,
			QRurl,
			recetaDB,
			filter,
			filterQR,
			recetaDBP,
			nav,
			userUuid, 
			modal, 
			msg, 
			tienda, 
			introVideo,
			play,
			sound,
			videoRef, 
			navItem, 
			webScann,
			focus, 
			seeMore, 
			setSeeMore,
			setFocus, 
			setWebScann,
			setNavItem,
			setSound, 
			setPlay, 
			setIntroVideo,
			setTienda,
			setMsg,
			setModal,
			setUserUuid,
			temporal,
			setTemporal,
			setNav,
			setRecetaDBP,
			setFilterQR,
			setFilter,
			setRecetaDB,
			setQRurl,
			setQr,
			cliente, setCliente,
			select, setSelect,
			setUserProfile,
			setUserData,
			setUserCart,
			setUserDistributorPDB,
			setUserProduct,
			setUserPedidos,
			setUserSuccess,
			setUserItem
		})
	}, [user, userDB, distributorPDB, focus, productDB, pedidos, item, cart, success, qr, QRurl, recetaDB, cliente, filter, filterQR, recetaDBP, select, nav, temporal, userUuid, modal, msg, tienda, introVideo, play, sound, navItem, webScann, seeMore,])

	return (
		<UserContext.Provider value={value} >
			{children}
		</UserContext.Provider>
	)
}

export function useUser() {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('error')
	}
	return context
}


