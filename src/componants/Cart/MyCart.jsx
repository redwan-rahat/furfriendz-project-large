// import { useContext, useEffect, useState } from "react";
// import { AuthContex } from "../AuthProvider/AuthProvider";
// import MyCartPet from "./MyCartPet";
// import MyCartProducts from "./MyCartProducts";

// const MyCart = () => {

//     const { handleGetCart,user,myCart,handleFavourite,setVisible,setType,setMessage} = useContext(AuthContex)
//     const [cartType,setcartType] = useState(true)

//     useEffect(()=>{
//       handleGetCart()
//       handleFavourite()
//     },[user])

   

//     const handlePaid =()=>{
       

        
//         myCart.length == 0 ? 
            
//         (   ()=> {
//             setVisible(true)
//             setMessage('Bruh!!😒 Add something first')
//             setType('error')
         
//         })() :
//       (  ()=>{
//             setVisible(true)
//             setMessage("All Your's 😋. Enjoy 🎉")
//             setType('success')
           
//         })()
        
//     }
    

//     return (
//         <div className="font-page mb-24">
            
//             <div className="w-11/12 m-auto ">

//             <h1 className="text-2xl tab:text-4xl lap:text-5xl des:text-6xl  text-center mt-6 text-primary font-semibold">My Cart </h1>
//             <hr className=" w-11/12 m-auto my-12 border border-primary border-dashed" />
        
//         <div className="w-11/12  tab:w-11/12 des:w-9/12 bg-second rounded-tl-lg rounded-br-lg tab:rounded-tl-xl tab:rounded-br-xl lap:rounded-tl-3xl lap:rounded-br-3xl  text-white py-12 m-auto">


//         <div className="grid tab:grid-cols-3 w-11/12 m-auto">
//         <div className=" col-span-2 ">

//             <div className="  grid z-0 relative grid-cols-2 group text-center font-page  text-primary  font-semibold tab:text-xl lap:text-2xl ">
//             <h1 onClick={()=>setcartType(true)} className={`cursor-pointer  w-11/12  m-auto col-span-1 z-10 py-1 tab:py-2 lap:py-3 tracking-wider rounded-md tab:rounded-lg duration-100  shadow-primary ${cartType ? 'border-2 border-white text-white bg-primary shadow-lg' : 'border-2 text-white hover:bg-third/50'}`}>Pet Cart</h1>
//             <h2 onClick={()=>setcartType(false)} className={`cursor-pointer  w-11/12 m-auto col-span-1 z-10 py-1 tab:py-2 lap:py-3 tracking-wider rounded-md tab:rounded-lg duration-100  shadow-primary ${cartType ? 'border-2 text-white hover:bg-third/50' : 'border-2border-white text-white bg-primary shadow-lg'}`}>Items Cart</h2>
//             {/* <div className={`bg-third absolute   transition-transform   duration-300 h-full -z-10 rounded-lg col-span-1 w-[405px] ${cartType ?'  ' : 'translate-x-[434px]' }  `}></div> */}
//             </div>
           
//             <div className="m-auto mt-12 ">
//                 {
//                     cartType && myCart != null ? <MyCartPet myCart = {myCart}></MyCartPet> : <MyCartProducts myCart = {myCart}></MyCartProducts>
//                 }
//             </div>
//         </div>

//         <div className="flex col-span-1">    

//         <div className="hidden tab:inline border mx-8 ">

//            </div>


//         <div className=" mt-2 w-full text-xl tab:text-2xl lap:text-3xl font-medium tab:font-semibold tab:text-center border-white ">
//                     <h1 className="">Price</h1>
//                     <hr className="border border-dotted w-4/5 tab:m-auto  mt-4" />


//                     <div className="mt-6 tab:mt-16 space-y-3 des:space-y-6 w-full tab:w-11/12 mx-auto">
//                         {
//                             myCart && myCart.map(data => 
//                                 <>
//                                 <div className="text-base  tab:text-sm lap:text-base text-left des:text-lg flex tab:inline items-center des:flex  space-x-2 tab:space-x-0 des:space-x-4">
//                                     <h2 className=" tab:mt-4 des:mt-0">{data.name} :</h2>
//                                     <h1 className=" text-orange-300">{data.price}$</h1>
//                                 </div>
//                                 </>
//                             )
//                         }
//                     </div>


//                     <hr className="border   mt-8" />
//                     <div className="text-lg tab:text-lg lap:text-xl space-x-2 tab:space-x-0 des:space-x-2 des:ml-3  mt-4 flex tab:inline des:flex">
//                         <h1 className="">Total Price : </h1>
//                     <span className="text-orange-400">{myCart && myCart.reduce((total,item)=> total + item.price ,0)}$</span>
//                     </div>

//                     <div>
//                         <button onClick={()=>handlePaid()} className="text-base tab:text-base lap:text-lg   mt-12 px-4 py-1 rounded-md hover:border-white border-2 hover:bg-primary hover:text-white duration-300 transition-all transform bg-white border-orange-500 text-orange-500 ">Pay Now</button>
                        
//                     </div>
//         </div>


//         </div>

//        </div>

       
//         </div>


//         </div>

//         </div>
//     );
// };

// export default MyCart;


// import { useContext, useEffect, useState } from "react";
// import { AuthContex } from "../AuthProvider/AuthProvider";
// import { NavLink } from "react-router-dom";
// import DeleteModal from "../OtherPages/DeleteModal";

// const MyCart = () => {

//     const {
//         handleGetCart,
//         handleCartDelete,
//         handleProductQuantity,
//         user,
//         myCart,
//         setVisible,
//         setType,
//         setMessage
//     } = useContext(AuthContex)

//     const [cartType, setcartType] = useState(true)
//     const [modalOpen, setmodalOpen] = useState(false)
//     const [selectedDelete, setSelectedDelete] = useState(null)

//     useEffect(() => {

//         if (user) {
//             handleGetCart()
//         }

//     }, [user])


//     const pets = myCart?.pets || []
//     const products = myCart?.products || []

//     const activeCart = cartType ? pets : products


//     const petSubtotal = pets.reduce(
//         (total, item) => total + Number(item.price || 0),
//         0
//     )

//     const productSubtotal = products.reduce(
//         (total, item) =>
//             total + (Number(item.price || 0) * Number(item.quantity || 0)),
//         0
//     )

//     const subtotal = cartType
//         ? petSubtotal
//         : productSubtotal


//     const handleDelete = async () => {

//         setmodalOpen(false)

//         await handleCartDelete(
//             selectedDelete.type,
//             selectedDelete.cart_id
//         )

//         setSelectedDelete(null)
//     }


//     const handleCheckout = () => {

//         if (activeCart.length === 0) {

//             setVisible(true)
//             setMessage('Bruh!!😒 Add something first')
//             setType('error')

//             return
//         }

//         setVisible(true)
//         setMessage("All Yours 😋. Enjoy 🎉")
//         setType('success')
//     }


//     return (

//         <div className="font-page mb-24">

//             <div className="w-11/12 m-auto">

//                 <h1 className="text-2xl tab:text-4xl lap:text-5xl des:text-6xl text-center mt-6 text-primary font-semibold">
//                     My Cart
//                 </h1>

//                 <hr className="w-11/12 m-auto my-12 border border-primary border-dashed" />


//                 <div className="w-11/12 tab:w-11/12 des:w-9/12 bg-second rounded-tl-lg rounded-br-lg tab:rounded-tl-xl tab:rounded-br-xl lap:rounded-tl-3xl lap:rounded-br-3xl text-white py-12 m-auto">


//                     {/* CART SWITCH */}

//                     <div className="grid grid-cols-2 w-11/12 tab:w-9/12 lap:w-7/12 m-auto text-center font-page text-primary font-semibold tab:text-xl lap:text-2xl">

//                         <h1
//                             onClick={() => setcartType(true)}
//                             className={`cursor-pointer w-11/12 m-auto py-2 tab:py-3 tracking-wider rounded-md tab:rounded-lg duration-200 shadow-primary ${
//                                 cartType
//                                     ? 'border-2 border-white text-white bg-primary shadow-lg'
//                                     : 'border-2 text-white hover:bg-third/50'
//                             }`}
//                         >
//                             Pet Cart
//                         </h1>

//                         <h2
//                             onClick={() => setcartType(false)}
//                             className={`cursor-pointer w-11/12 m-auto py-2 tab:py-3 tracking-wider rounded-md tab:rounded-lg duration-200 shadow-primary ${
//                                 !cartType
//                                     ? 'border-2 border-white text-white bg-primary shadow-lg'
//                                     : 'border-2 text-white hover:bg-third/50'
//                             }`}
//                         >
//                             Product Cart
//                         </h2>

//                     </div>


//                     {/* CART CONTENT */}

//                     <div className="w-11/12 m-auto mt-12">


//                         {/* EMPTY CART */}

//                         {activeCart.length === 0 && (

//                             <div className="text-center py-12 text-sm tab:text-xl lap:text-2xl font-medium">
//                                 <h1>
//                                     You Haven't Added Anything Yet
//                                 </h1>
//                             </div>

//                         )}


//                         {/* PET CART */}

//                         {cartType && pets.map(item => (

//                             <div
//                                 key={item.cart_id}
//                                 className="border-2 mb-5 border-fifth rounded-lg overflow-hidden"
//                             >

//                                 <div className="grid grid-cols-3 bg-third tab:m-2 rounded-lg">

//                                     <NavLink
//                                         to={`/details/pet/${item.pet_id}`}
//                                         className="col-span-1 border-primary border-r-2"
//                                     >

//                                         <div className="h-full flex items-center">

//                                             <img
//                                                 className="w-24 tab:w-36 lap:w-44 m-auto object-cover"
//                                                 src={item.photo_url}
//                                                 alt={item.name}
//                                             />

//                                         </div>

//                                     </NavLink>


//                                     <div className="col-span-2 flex justify-between w-11/12 m-auto text-[12px] tab:text-xs lap:text-base">

//                                         <div>

//                                             <h1 className="font-medium text-primary mt-2">
//                                                 <span className="font-semibold">
//                                                     Name :
//                                                 </span>{' '}
//                                                 {item.name}
//                                             </h1>

//                                             <h1 className="font-medium text-primary">
//                                                 <span className="font-semibold">
//                                                     Breed :
//                                                 </span>{' '}
//                                                 {item.breed}
//                                             </h1>

//                                             <h1 className="font-medium text-primary">
//                                                 <span className="font-semibold">
//                                                     Category :
//                                                 </span>{' '}
//                                                 {item.category}
//                                             </h1>

//                                         </div>


//                                         <div className="text-right">

//                                             <h2 className="font-medium text-orange-500 mt-2">
//                                                 <span className="text-primary font-semibold">
//                                                     Price :
//                                                 </span>{' '}
//                                                 {item.price}$
//                                             </h2>

//                                             <div
//                                                 onClick={() => {
//                                                     setSelectedDelete({
//                                                         type: 'pet',
//                                                         cart_id: item.cart_id
//                                                     })
//                                                     setmodalOpen(true)
//                                                 }}
//                                                 className="tab:w-16 tab:h-8 lap:w-24 lap:h-10 mt-4 tab:mt-7 lap:mt-12 flex items-center justify-center text-red-500 font-medium border-red-500 border tab:border-2 tab:rounded-md cursor-pointer hover:bg-red-600 duration-300 hover:text-white hover:border-white bg-fifth"
//                                             >
//                                                 Delete
//                                             </div>

//                                         </div>

//                                     </div>

//                                 </div>

//                             </div>

//                         ))}


//                         {/* PRODUCT CART */}

//                         {!cartType && products.map(item => (

//                             <div
//                                 key={item.cart_id}
//                                 className="border-2 mb-5 border-fifth rounded-lg overflow-hidden"
//                             >

//                                 <div className="grid grid-cols-3 bg-third tab:m-2 rounded-lg">

//                                     <NavLink
//                                         to={`/details/product/${item.product_id}`}
//                                         className="col-span-1 border-primary border-r-2"
//                                     >

//                                         <div className="h-full flex items-center">

//                                             <img
//                                                 className="w-24 tab:w-36 lap:w-44 m-auto object-cover"
//                                                 src={item.photo_url}
//                                                 alt={item.product_name}
//                                             />

//                                         </div>

//                                     </NavLink>


//                                     <div className="col-span-2 flex justify-between w-11/12 m-auto text-[12px] tab:text-xs lap:text-base">

//                                         <div>

//                                             <h1 className="font-medium text-primary mt-2">
//                                                 <span className="font-semibold">
//                                                     Product :
//                                                 </span>{' '}
//                                                 {item.product_name}
//                                             </h1>

//                                             <h1 className="font-medium text-primary">
//                                                 <span className="font-semibold">
//                                                     Type :
//                                                 </span>{' '}
//                                                 {item.type}
//                                             </h1>

//                                             <h1 className="font-medium text-primary">
//                                                 <span className="font-semibold">
//                                                     Weight :
//                                                 </span>{' '}
//                                                 {item.weight}g
//                                             </h1>


//                                             {/* QUANTITY */}

//                                             <div className="flex items-center mt-3 space-x-2">

//                                                 <span className="font-semibold">
//                                                     Quantity :
//                                                 </span>

//                                                 <button
//                                                     onClick={() =>
//                                                         handleProductQuantity(
//                                                             item.cart_id,
//                                                             Math.max(1, item.quantity - 1)
//                                                         )
//                                                     }
//                                                     className="w-6 h-6 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-300 rounded"
//                                                 >
//                                                     -
//                                                 </button>

//                                                 <span>
//                                                     {item.quantity}
//                                                 </span>

//                                                 <button
//                                                     onClick={() =>
//                                                         handleProductQuantity(
//                                                             item.cart_id,
//                                                             item.quantity + 1
//                                                         )
//                                                     }
//                                                     className="w-6 h-6 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-300 rounded"
//                                                 >
//                                                     +
//                                                 </button>

//                                             </div>

//                                         </div>


//                                         <div className="text-right">

//                                             <h2 className="font-medium text-orange-500 mt-2">
//                                                 <span className="text-primary font-semibold">
//                                                     Price :
//                                                 </span>{' '}
//                                                 {item.price}$
//                                             </h2>

//                                             <h2 className="font-medium text-orange-500 mt-2">
//                                                 <span className="text-primary font-semibold">
//                                                     Total :
//                                                 </span>{' '}
//                                                 {(Number(item.price) * Number(item.quantity)).toFixed(2)}$
//                                             </h2>

//                                             <div
//                                                 onClick={() => {
//                                                     setSelectedDelete({
//                                                         type: 'product',
//                                                         cart_id: item.cart_id
//                                                     })
//                                                     setmodalOpen(true)
//                                                 }}
//                                                 className="tab:w-16 tab:h-8 lap:w-24 lap:h-10 mt-4 tab:mt-7 lap:mt-12 flex items-center justify-center text-red-500 font-medium border-red-500 border tab:border-2 tab:rounded-md cursor-pointer hover:bg-red-600 duration-300 hover:text-white hover:border-white bg-fifth"
//                                             >
//                                                 Delete
//                                             </div>

//                                         </div>

//                                     </div>

//                                 </div>

//                             </div>

//                         ))}


//                         {/* SUBTOTAL */}

//                         <div className="border-t border-white mt-10 pt-8 text-center">

//                             <h2 className="text-lg tab:text-xl lap:text-2xl font-semibold">
//                                 Subtotal
//                             </h2>

//                             <h1 className="text-2xl tab:text-3xl lap:text-4xl text-orange-400 font-semibold mt-3">
//                                 {subtotal.toFixed(2)}$
//                             </h1>


//                             {/* CHECKOUT */}

//                             <button
//                                 onClick={handleCheckout}
//                                 className="mt-8 text-base tab:text-lg px-8 py-2 rounded-md border-2 border-orange-500 bg-white text-orange-500 font-semibold transition-all duration-300 hover:bg-primary hover:text-white hover:border-white hover:scale-105"
//                             >
//                                 Checkout
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             </div>


//             <DeleteModal
//                 isOpen={modalOpen}
//                 onClose={() => {
//                     setmodalOpen(false)
//                     setSelectedDelete(null)
//                 }}
//                 onConfirm={handleDelete}
//             />

//         </div>
//     )
// }

// export default MyCart;


import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";
import DeleteModal from "../OtherPages/DeleteModal";

const MyCart = () => {

    const {
        handleGetCart,
        handleCartDelete,
        handleProductQuantity,
        handleCheckout,
        user,
        myCart,
        setVisible,
        setType,
        setMessage
    } = useContext(AuthContex)

    const [cartType, setcartType] = useState(true)

    const [modalOpen, setmodalOpen] = useState(false)
    const [selectedDelete, setSelectedDelete] = useState(null)

    const [checkoutOpen, setCheckoutOpen] = useState(false)

    const [checkoutData, setCheckoutData] = useState({
        full_name: '',
        email: user?.email || '',
        shipping_address: '',
        transaction_id: '',
        cash_on_delivery: false
    })


    useEffect(() => {

        if (user) {
            handleGetCart()
        }

    }, [user])


    useEffect(() => {

        if (user?.email) {
            setCheckoutData(prev => ({
                ...prev,
                email: user.email
            }))
        }

    }, [user])


    const pets = myCart?.pets || []
    const products = myCart?.products || []

    const activeCart = cartType ? pets : products


    const petSubtotal = pets.reduce(
        (total, item) => total + Number(item.price || 0),
        0
    )

    const productSubtotal = products.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    )

    const subtotal = cartType
        ? petSubtotal
        : productSubtotal


    const checkoutTotal =
        subtotal + (checkoutData.cash_on_delivery ? 10 : 0)


    const handleDelete = async () => {

        setmodalOpen(false)

        await handleCartDelete(
            selectedDelete.type,
            selectedDelete.cart_id
        )

        setSelectedDelete(null)
    }


    const openCheckout = () => {

        if (activeCart.length === 0) {

            setVisible(true)
            setMessage('Bruh!!😒 Add something first')
            setType('error')

            return
        }

        setCheckoutOpen(true)
    }


    const handleCheckoutChange = (e) => {

        const { name, value } = e.target

        setCheckoutData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const handleCODChange = (e) => {

        setCheckoutData(prev => ({
            ...prev,
            cash_on_delivery: e.target.checked,
            transaction_id: ''
        }))
    }


    const submitCheckout = async (e) => {

        e.preventDefault()

        const success = await handleCheckout(
            checkoutData,
            cartType ? 'pet' : 'product',
            activeCart
        )

        if (success) {

            setCheckoutOpen(false)

            setCheckoutData({
                full_name: '',
                email: user?.email || '',
                shipping_address: '',
                transaction_id: '',
                cash_on_delivery: false
            })
        }
    }


    return (

        <div className="font-page mb-24">

            <div className="w-11/12 m-auto">

                <h1 className="text-2xl tab:text-4xl lap:text-5xl des:text-6xl text-center mt-6 text-primary font-semibold">
                    My Cart
                </h1>

                <hr className="w-11/12 m-auto my-12 border border-primary border-dashed" />


                <div className="w-11/12 tab:w-11/12 des:w-9/12 bg-second rounded-tl-lg rounded-br-lg tab:rounded-tl-xl tab:rounded-br-xl lap:rounded-tl-3xl lap:rounded-br-3xl text-white py-12 m-auto">


                    {/* CART SWITCH */}

                    <div className="grid grid-cols-2 w-11/12 tab:w-9/12 lap:w-7/12 m-auto text-center font-page text-primary font-semibold tab:text-xl lap:text-2xl">

                        <h1
                            onClick={() => setcartType(true)}
                            className={`cursor-pointer w-11/12 m-auto py-2 tab:py-3 tracking-wider rounded-md tab:rounded-lg duration-200 shadow-primary ${
                                cartType
                                    ? 'border-2 border-white text-white bg-primary shadow-lg'
                                    : 'border-2 text-white hover:bg-third/50'
                            }`}
                        >
                            Pet Cart
                        </h1>

                        <h2
                            onClick={() => setcartType(false)}
                            className={`cursor-pointer w-11/12 m-auto py-2 tab:py-3 tracking-wider rounded-md tab:rounded-lg duration-200 shadow-primary ${
                                !cartType
                                    ? 'border-2 border-white text-white bg-primary shadow-lg'
                                    : 'border-2 text-white hover:bg-third/50'
                            }`}
                        >
                            Product Cart
                        </h2>

                    </div>


                    {/* CART CONTENT */}

                    <div className="w-11/12 m-auto mt-12">


                        {/* EMPTY CART */}

                        {activeCart.length === 0 && (

                            <div className="text-center py-12 text-sm tab:text-xl lap:text-2xl font-medium">
                                <h1>
                                    You Haven't Added Anything Yet
                                </h1>
                            </div>

                        )}


                        {/* PET CART */}

                        {cartType && pets.map(item => (

                            <div
                                key={item.cart_id}
                                className="border-2 mb-5 border-fifth rounded-lg overflow-hidden"
                            >

                                <div className="grid grid-cols-3 bg-third tab:m-2 rounded-lg">

                                    <NavLink
                                        to={`/details/pet/${item.pet_id}`}
                                        className="col-span-1 border-primary border-r-2"
                                    >

                                        <div className="h-full flex items-center">

                                            <img
                                                className="w-24 tab:w-36 lap:w-44 m-auto object-cover"
                                                src={item.photo_url}
                                                alt={item.name}
                                            />

                                        </div>

                                    </NavLink>


                                    <div className="col-span-2 flex justify-between w-11/12 m-auto text-[12px] tab:text-xs lap:text-base">

                                        <div>

                                            <h1 className="font-medium text-primary mt-2">
                                                <span className="font-semibold">
                                                    Name :
                                                </span>{' '}
                                                {item.name}
                                            </h1>

                                            <h1 className="font-medium text-primary">
                                                <span className="font-semibold">
                                                    Breed :
                                                </span>{' '}
                                                {item.breed}
                                            </h1>

                                            <h1 className="font-medium text-primary">
                                                <span className="font-semibold">
                                                    Category :
                                                </span>{' '}
                                                {item.category}
                                            </h1>

                                        </div>


                                        <div className="text-right">

                                            <h2 className="font-medium text-orange-500 mt-2">
                                                <span className="text-primary font-semibold">
                                                    Price :
                                                </span>{' '}
                                                {item.price}$
                                            </h2>

                                            <div
                                                onClick={() => {
                                                    setSelectedDelete({
                                                        type: 'pet',
                                                        cart_id: item.cart_id
                                                    })
                                                    setmodalOpen(true)
                                                }}
                                                className="tab:w-16 tab:h-8 lap:w-24 lap:h-10 mt-4 tab:mt-7 lap:mt-12 flex items-center justify-center text-red-500 font-medium border-red-500 border tab:border-2 tab:rounded-md cursor-pointer hover:bg-red-600 duration-300 hover:text-white hover:border-white bg-fifth"
                                            >
                                                Delete
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}


                        {/* PRODUCT CART */}

                        {!cartType && products.map(item => (

                            <div
                                key={item.cart_id}
                                className="border-2 mb-5 border-fifth rounded-lg overflow-hidden"
                            >

                                <div className="grid grid-cols-3 bg-third tab:m-2 rounded-lg">

                                    <NavLink
                                        to={`/details/product/${item.product_id}`}
                                        className="col-span-1 border-primary border-r-2"
                                    >

                                        <div className="h-full flex items-center">

                                            <img
                                                className="w-24 tab:w-36 lap:w-44 m-auto object-cover"
                                                src={item.photo_url}
                                                alt={item.product_name}
                                            />

                                        </div>

                                    </NavLink>


                                    <div className="col-span-2 flex justify-between w-11/12 m-auto text-[12px] tab:text-xs lap:text-base">

                                        <div>

                                            <h1 className="font-medium text-primary mt-2">
                                                <span className="font-semibold">
                                                    Product :
                                                </span>{' '}
                                                {item.product_name}
                                            </h1>

                                            <h1 className="font-medium text-primary">
                                                <span className="font-semibold">
                                                    Type :
                                                </span>{' '}
                                                {item.type}
                                            </h1>

                                            <h1 className="font-medium text-primary">
                                                <span className="font-semibold">
                                                    Weight :
                                                </span>{' '}
                                                {item.weight}g
                                            </h1>


                                            {/* QUANTITY */}

                                            <div className="flex items-center mt-3 space-x-2">

                                                <span className="font-semibold">
                                                    Quantity :
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleProductQuantity(
                                                            item.cart_id,
                                                            Math.max(1, item.quantity - 1)
                                                        )
                                                    }
                                                    className="w-6 h-6 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-300 rounded"
                                                >
                                                    -
                                                </button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleProductQuantity(
                                                            item.cart_id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="w-6 h-6 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-300 rounded"
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>


                                        <div className="text-right">

                                            <h2 className="font-medium text-orange-500 mt-2">
                                                <span className="text-primary font-semibold">
                                                    Price :
                                                </span>{' '}
                                                {item.price}$
                                            </h2>

                                            <h2 className="font-medium text-orange-500 mt-2">
                                                <span className="text-primary font-semibold">
                                                    Total :
                                                </span>{' '}
                                                {(Number(item.price) * Number(item.quantity)).toFixed(2)}$
                                            </h2>

                                            <div
                                                onClick={() => {
                                                    setSelectedDelete({
                                                        type: 'product',
                                                        cart_id: item.cart_id
                                                    })
                                                    setmodalOpen(true)
                                                }}
                                                className="tab:w-16 tab:h-8 lap:w-24 lap:h-10 mt-4 tab:mt-7 lap:mt-12 flex items-center justify-center text-red-500 font-medium border-red-500 border tab:border-2 tab:rounded-md cursor-pointer hover:bg-red-600 duration-300 hover:text-white hover:border-white bg-fifth"
                                            >
                                                Delete
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}


                        {/* CHECKOUT SECTION */}

                        <div className="border-t border-white mt-10 pt-8">

                            {!checkoutOpen ? (

                                <div className="text-center">

                                    <h2 className="text-lg tab:text-xl lap:text-2xl font-semibold">
                                        Subtotal
                                    </h2>

                                    <h1 className="text-2xl tab:text-3xl lap:text-4xl text-orange-400 font-semibold mt-3">
                                        {subtotal.toFixed(2)}$
                                    </h1>

                                    <button
                                        onClick={openCheckout}
                                        className="mt-8 text-base tab:text-lg px-8 py-2 rounded-md border-2 border-orange-500 bg-white text-orange-500 font-semibold transition-all duration-300 hover:bg-primary hover:text-white hover:border-white hover:scale-105"
                                    >
                                        Checkout
                                    </button>

                                </div>

                            ) : (

                                <form
                                    onSubmit={submitCheckout}
                                    className="w-11/12 tab:w-4/5 lap:w-3/5 m-auto"
                                >

                                    <h2 className="text-lg tab:text-xl lap:text-2xl font-semibold text-center mb-8">
                                        Checkout
                                    </h2>


                                    {/* FULL NAME */}

                                    <div className="mb-5">

                                        <label className="block text-sm tab:text-base font-semibold mb-2">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="full_name"
                                            value={checkoutData.full_name}
                                            onChange={handleCheckoutChange}
                                            required
                                            className="w-full px-3 py-2 rounded-md bg-white text-second focus:outline-none border-2 border-transparent focus:border-orange-500"
                                            placeholder="Enter your full name"
                                        />

                                    </div>


                                    {/* EMAIL */}

                                    <div className="mb-5">

                                        <label className="block text-sm tab:text-base font-semibold mb-2">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={checkoutData.email}
                                            onChange={handleCheckoutChange}
                                            required
                                            className="w-full px-3 py-2 rounded-md bg-white text-second focus:outline-none border-2 border-transparent focus:border-orange-500"
                                            placeholder="Enter your email"
                                        />

                                    </div>


                                    {/* ADDRESS */}

                                    <div className="mb-5">

                                        <label className="block text-sm tab:text-base font-semibold mb-2">
                                            Address
                                        </label>

                                        <textarea
                                            name="shipping_address"
                                            value={checkoutData.shipping_address}
                                            onChange={handleCheckoutChange}
                                            required
                                            rows="3"
                                            className="w-full px-3 py-2 rounded-md bg-white text-second focus:outline-none border-2 border-transparent focus:border-orange-500 resize-none"
                                            placeholder="Enter your shipping address"
                                        />

                                    </div>


                                    {/* TRANSACTION ID */}

                                    {!checkoutData.cash_on_delivery && (

                                        <div className="mb-5">

                                            <label className="block text-sm tab:text-base font-semibold mb-2">
                                                Transaction ID
                                            </label>

                                            <input
                                                type="text"
                                                name="transaction_id"
                                                value={checkoutData.transaction_id}
                                                onChange={handleCheckoutChange}
                                                required={!checkoutData.cash_on_delivery}
                                                className="w-full px-3 py-2 rounded-md bg-white text-second focus:outline-none border-2 border-transparent focus:border-orange-500"
                                                placeholder="Enter transaction ID"
                                            />

                                        </div>

                                    )}


                                    {/* COD */}

                                    <div className="flex items-center justify-between mb-6">

                                        <div>

                                            <h3 className="text-sm tab:text-base font-semibold">
                                                Cash on Delivery
                                            </h3>

                                            <p className="text-xs tab:text-sm text-white/70">
                                                Additional $10 charge
                                            </p>

                                        </div>


                                        <label className="relative inline-flex items-center cursor-pointer">

                                            <input
                                                type="checkbox"
                                                checked={checkoutData.cash_on_delivery}
                                                onChange={handleCODChange}
                                                className="sr-only peer"
                                            />

                                            <div className="w-11 h-6 bg-third rounded-full peer peer-checked:bg-orange-500 transition-all duration-300">

                                            </div>

                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5">

                                            </div>

                                        </label>

                                    </div>


                                    {/* PRICE */}

                                    <div className="border-t border-white pt-6 mt-6">

                                        <div className="flex justify-between text-sm tab:text-base mb-2">

                                            <span>
                                                Subtotal
                                            </span>

                                            <span className="text-orange-300">
                                                {subtotal.toFixed(2)}$
                                            </span>

                                        </div>


                                        {checkoutData.cash_on_delivery && (

                                            <div className="flex justify-between text-sm tab:text-base mb-2">

                                                <span>
                                                    Cash on Delivery Fee
                                                </span>

                                                <span className="text-orange-300">
                                                    10.00$
                                                </span>

                                            </div>

                                        )}


                                        <div className="flex justify-between text-lg tab:text-xl font-semibold mt-4">

                                            <span>
                                                Total
                                            </span>

                                            <span className="text-orange-400">
                                                {checkoutTotal.toFixed(2)}$
                                            </span>

                                        </div>

                                    </div>


                                    {/* BUTTONS */}

                                    <div className="flex justify-center gap-3 mt-8">

                                        <button
                                            type="button"
                                            onClick={() => setCheckoutOpen(false)}
                                            className="text-sm tab:text-base px-5 py-2 rounded-md border-2 border-white text-white hover:bg-white hover:text-second transition-all duration-300"
                                        >
                                            Cancel
                                        </button>


                                        <button
                                            type="submit"
                                            className="text-sm tab:text-base px-6 py-2 rounded-md border-2 border-orange-500 bg-white text-orange-500 font-semibold transition-all duration-300 hover:bg-primary hover:text-white hover:border-white hover:scale-105"
                                        >
                                            Place Order
                                        </button>

                                    </div>

                                </form>

                            )}

                        </div>

                    </div>

                </div>

            </div>


            <DeleteModal
                isOpen={modalOpen}
                onClose={() => {
                    setmodalOpen(false)
                    setSelectedDelete(null)
                }}
                onConfirm={handleDelete}
            />

        </div>
    )
}

export default MyCart