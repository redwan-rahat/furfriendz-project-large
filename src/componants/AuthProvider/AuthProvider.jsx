import { createContext, useEffect, useRef, useState } from "react";
import app from "../../firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import supabase from "../../supabase.config";



export const AuthContex = createContext(null)
const auth = new getAuth(app)
const provider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loader, setloader] = useState(true)
    const [pageload, setpageload] = useState(false)
    const [fetchedData, setfetchedData] = useState(null)

    const [detailsFetch, setDetailsFetch] = useState(null)
    const [loading, setloading] = useState(false)
    const [special, setspecial] = useState(true)
    const [myCart, setmyCart] = useState({
        pets: [],
        products: []
    })
    const [totalCart, settotalCart] = useState(0)
    const [emaiUsername, setemailUsername] = useState(null)
    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("")
    const [navigating, setnavigate] = useState(false)
    const [favItem, setfavItems] = useState(null)
    const [adminOrders, setadminOrders] = useState({
        pets: [],
        products: []
    })




    const handleRegister = (email, password) => {
        setloader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleSignIn = (email, password) => {

        setloader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }



    const handleGoogleSignIn = () => {
        setloader(true)
        signInWithPopup(auth, provider)


            .then(data => {

                setuser(data.user)
                console.log(data)

                const username = data.user.displayName
                const email = data.user.email
                const user_id = data.user.uid
                const login_type = 'google'

                setVisible(true)
                setMessage('Logged in with Google')
                setType('success')
                insertGoogleDB(username, email, login_type, user_id)

                setnavigate(true)


            })
            .catch(error => {
                setVisible(true)
                setMessage('Google login failed')
                setType('error')

            }
            )
    }


    const handleSignOut = () => {
        setloader(true)
        signOut(auth)
            .then(resutl => {
                settotalCart(0)

                setVisible(true)
                setMessage('Signed Out Successfully')
                setType('error')
                setnavigate(false)

            })
    }


    const handleScrollToAllproduct = () => {

        sectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }



    // supabase codes

    // reading all pet data from database

    // const handleFetch = async (query) => {


    //     const selectFetch = 'pet_id,photo_url,breeds(breed_name),category'
    //     const selectFetch2 = 'product_id, photo_url, product_name,category'




    //     const select = query == 'pet_products' ? selectFetch2 : selectFetch
    //     const orderItem = query == 'pet_products' ? 'product_id' : 'pet_id'

    //     const { data, error } = await supabase
    //         .from(query)
    //         .select(select)
    //         .order(orderItem, { ascending: true })


    //     if (error) console.log(error)

    //     else {


    //         setfetchedData(data)

    //     }


    // }

    const handleFetch = async (query) => {
        console.log('querry', query)
        if (query === 'products') {

            const { data, error } = await supabase
                .from('products')
                .select('product_id, photo_url, product_name,type')
                .order('product_id', { ascending: true })

            if (error) {
                console.log(error)
            } else {
                setfetchedData(data)
            }

        }

        else {

            const { data, error } = await supabase
                .from('pets')
                .select('pet_id, photo_url, breed, category')
                .eq('category', query)
                .order('pet_id', { ascending: true })

            if (error) {
                console.log(error)
            } else {
                setfetchedData(data)
            }
        }
    }
    // reading data of a specific item

    // const handleDetailsData = async (type, id) => {
    //     setloading(true)
    //     let query = ''



    //     if (type == 'cat') query = 'cats'
    //     if (type == 'dog') query = 'dogs'
    //     if (type == 'bird') query = 'birds'
    //     if (type == 'product') query = 'pet_products'


    //     const selectValue = '*,breeds(breed_name,breed_location)'
    //     const selectValue2 = '*'
    //     const whereValue = type == 'product' ? 'product_id' : 'pet_id'



    //     const { data, error } = await supabase
    //         .from(query)
    //         .select(type == 'product' ? selectValue2 : selectValue)
    //         .eq(whereValue, id)

    //     setDetailsFetch(data)

    //     data ? setloading(false) : ''




    // }

    const handleDetailsData = async (type, id) => {
        setloading(true)

        const table = type === 'pet' ? 'pets' : 'products'
        const idColumn = type === 'pet' ? 'pet_id' : 'product_id'

        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq(idColumn, id)
            .single()

        if (error) {
            console.log(error)
            setDetailsFetch(null)
        } else {
            setDetailsFetch(data)
        }

        setloading(false)
    }

    // const handleSearch = async (category,searchVal)=>{

    //     const  selectFetch = 'pet_id,photo_url,breeds(breed_name),category'
    //     const selectFetch2 = 'product_id, photo_url, product_name,category'




    //   const select =   category == 'pet_products' ?  selectFetch2   :  '*' 

    //     if(category == 'pet_products'){
    //    

    //         const {data,error} = await supabase
    //         .from(category)
    //         .select(select)
    //         .ilike('product_name',`%${searchVal}%`)



    //         if(error) console.log(error)

    //     }

    //     else{

    //         const {data,error} = await supabase 
    //         .from('breeds')
    //         .select('breed_id')
    //         .ilike('breed_name',`%${searchVal}%`)


    //         if(data) {
    //            console.log(data)
    //         }

    //         if(error) console.log(error)

    //     }





    // }



    // inserting userdata logged in with email

    // old supabase 
    // const insertRegisterDB =async(email,username,login_type,password)=>{

    //     const {data,error} = await supabase
    //     .from('users')
    //     .insert([
    //         {  
    //             username:username,
    //             email:email,
    //             password:password,
    //             login_type:login_type
    //         }
    //     ])

    //     if(error) console.log(error)


    // }

    const insertRegisterDB = async (email, username, login_type, user_id) => {

        const { data, error } = await supabase
            .from('userdata')
            .insert([
                {
                    full_name: username,
                    email: email,
                    login_type: login_type,
                    user_id: user_id,
                }
            ])

        if (error) console.log(error)
    }


    //  inserting userdata logged in google
    // old supabase 
    // const  insertGoogleDB = async(username,email,login_type)=>{

    //         const {data,error} = await supabase
    //         .from('users')
    //         .select('email,user_id')
    //         .eq('email',email)
    //         .single()

    //         if(error)
    //         {

    //             const password = null
    //             const {data,error} = await supabase

    //                 .from('users')
    //                 .insert([{
    //                     username,
    //                     email,
    //                     login_type,
    //                     password,

    //                 }])

    //             if(error) console.log(error)
    //         }


    // }

    const insertGoogleDB = async (username, email, login_type, user_id) => {

        const { data, error } = await supabase
            .from('userdata')
            .select('user_id')
            .eq('user_id', user_id)
            .maybeSingle()

        if (error) {
            console.log(error)
            return
        }

        if (data) {
            return
        }

        const { data: insertData, error: insertError } = await supabase
            .from('userdata')
            .insert([
                {
                    user_id,
                    full_name: username,
                    email,
                    login_type
                }
            ])

        if (insertError) {
            console.log(insertError)
        }
    }

    // normal fetch
    const getUID = async (email) => {

        const { data, error } = await supabase
            .from('users')
            .select('user_id')
            .eq('email', email)



        if (data) {



            return data[0]?.user_id

        }
    }


    // normal fetch
    const getUsername = async (email) => {

        const { data, error } = await supabase
            .from('users')
            .select('username')
            .eq('email', email)

        if (data) {


            return data[0].username

        }

    }


    // inserting data into cart
    // const handleCartIN = async (item_id, category) => {



    //     const userData = await getUID(user.email)

    //     const pet_data = await handleDetailsData(category, item_id)


    //     if (userData && detailsFetch) {


    //         const user_id = userData
    //         const name = detailsFetch[0].category == 'product' ? detailsFetch[0].product_name : detailsFetch[0].breeds.breed_name
    //         const availability = detailsFetch[0].availability
    //         const price = detailsFetch[0].price
    //         const photo_url = detailsFetch[0].photo_url



    //         const { data, error } = await supabase
    //             .from('cart')
    //             .insert(
    //                 [{
    //                     item_id,
    //                     category,
    //                     user_id,
    //                     name,
    //                     availability,
    //                     price,
    //                     photo_url

    //                 }])
    //         if (!error) {
    //             settotalCart(totalCart + 1)


    //             setVisible(true)
    //             setMessage('Successfully Added To Cart')
    //             setType('success')
    //         }





    //     }
    // }

    const handleCartIN = async (type, id) => {

        console.log('handlecartid', type, id)

        if (!user) return

        if (type === 'pet') {

            // Check if this pet is already in the user's cart
            const { data, error } = await supabase
                .from('pet_cart')
                .select('cart_id')
                .eq('user_id', user.uid)
                .eq('pet_id', id)
                .maybeSingle()

            if (error) {
                console.log('Pet cart check error:', error)
                return
            }

            // Pet already exists
            if (data) {
                setVisible(true)
                setMessage('Pet is already in your cart')
                setType('error')
                return
            }

            // Add pet
            const { error: insertError } = await supabase
                .from('pet_cart')
                .insert([
                    {
                        user_id: user.uid,
                        pet_id: id
                    }
                ])

            if (insertError) {
                console.log('Pet cart insert error:', insertError)
                return
            }

            settotalCart(totalCart + 1)

        } else if (type === 'product') {

            // Check if product already exists
            const { data, error } = await supabase
                .from('product_cart')
                .select('cart_id, quantity')
                .eq('user_id', user.uid)
                .eq('product_id', id)
                .maybeSingle()

            if (error) {
                console.log('Product cart check error:', error)
                return
            }

            if (data) {

                // Product already exists, increase quantity
                const { error: updateError } = await supabase
                    .from('product_cart')
                    .update({
                        quantity: data.quantity + 1
                    })
                    .eq('cart_id', data.cart_id)

                if (updateError) {
                    console.log('Product quantity update error:', updateError)
                    return
                }

            } else {

                // Product doesn't exist, add it with quantity 1
                const { error: insertError } = await supabase
                    .from('product_cart')
                    .insert([
                        {
                            user_id: user.uid,
                            product_id: id,
                            quantity: 1
                        }
                    ])

                if (insertError) {
                    console.log('Product cart insert error:', insertError)
                    return
                }

                settotalCart(totalCart + 1)
            }
        }

        setVisible(true)
        setMessage('Successfully Added To Cart')
        setType('success')
    }


    // reading cart data 
    // const handleGetCart = async () => {

    //     const userData = await getUID(user.email)


    //     const { data, error } = await supabase
    //         .from('cart')
    //         .select('*')
    //         .eq('user_id', userData)

    //     setmyCart(data)
    //     return data

    // }

    const handleGetCart = async () => {

        if (!user) return

        // Get user's pet cart
        const { data: petCart, error: petCartError } = await supabase
            .from('pet_cart')
            .select('cart_id, pet_id, created_at')
            .eq('user_id', user.uid)

        if (petCartError) {
            console.log('Pet cart error:', petCartError)
            return
        }

        // Get user's product cart
        const { data: productCart, error: productCartError } = await supabase
            .from('product_cart')
            .select('cart_id, product_id, quantity, created_at')
            .eq('user_id', user.uid)

        if (productCartError) {
            console.log('Product cart error:', productCartError)
            return
        }

        // Get actual pet information
        const petIds = petCart?.map(item => item.pet_id) || []

        let pets = []

        if (petIds.length > 0) {

            const { data, error } = await supabase
                .from('pets')
                .select('*')
                .in('pet_id', petIds)

            if (error) {
                console.log('Pets fetch error:', error)
                return
            }

            pets = data || []
        }

        // Get actual product information
        const productIds = productCart?.map(item => item.product_id) || []

        let products = []

        if (productIds.length > 0) {

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .in('product_id', productIds)

            if (error) {
                console.log('Products fetch error:', error)
                return
            }

            products = data || []
        }

        // Combine cart information with actual item information
        const petCartData = petCart.map(cartItem => {

            const pet = pets.find(
                pet => pet.pet_id === cartItem.pet_id
            )

            return {
                ...cartItem,
                ...pet
            }
        })

        const productCartData = productCart.map(cartItem => {

            const product = products.find(
                product => product.product_id === cartItem.product_id
            )

            return {
                ...cartItem,
                ...product
            }
        })

        setmyCart({
            pets: petCartData,
            products: productCartData
        })

        return {
            pets: petCartData,
            products: productCartData
        }
    }


    // remove item from the cart
    // const handleCartDelete = async (cart_id) => {


    //     const { data, error } = await supabase
    //         .from('cart')
    //         .delete()
    //         .eq('cart_id', cart_id)

    //     if (!error) {
    //         totalCart >= 0 ? settotalCart(totalCart - 1) : ''
    //         setmyCart(myCart.filter(data => data.cart_id != cart_id))

    //     }

    //     if (error) console.log(error)

    // }

    const handleCartDelete = async (type, cart_id) => {

        const table = type === 'pet'
            ? 'pet_cart'
            : 'product_cart'

        const { error } = await supabase
            .from(table)
            .delete()
            .eq('cart_id', cart_id)
            .eq('user_id', user.uid)

        if (error) {
            console.log('Cart delete error:', error)
            return
        }

        setmyCart(prev => ({
            pets: type === 'pet'
                ? prev.pets.filter(item => item.cart_id !== cart_id)
                : prev.pets,

            products: type === 'product'
                ? prev.products.filter(item => item.cart_id !== cart_id)
                : prev.products
        }))

        settotalCart(prev => Math.max(0, prev - 1))

        setVisible(true)
        setMessage('Removed From Cart')
        setType('success')
    }

    //new fucntion

    const handleProductQuantity = async (cart_id, quantity) => {

        if (quantity < 1) return

        const { error } = await supabase
            .from('product_cart')
            .update({
                quantity: quantity
            })
            .eq('cart_id', cart_id)
            .eq('user_id', user.uid)

        if (error) {
            console.log('Quantity update error:', error)
            return
        }

        setmyCart(prev => ({
            ...prev,

            products: prev.products.map(item =>
                item.cart_id === cart_id
                    ? { ...item, quantity: quantity }
                    : item
            )
        }))
    }

    // counting cart items of specific user

    // use of aggregate function

    // const handleTotalCarts = async () => {


    //     const user_id = await getUID(user?.email)


    //     const { data, count, error } = await supabase
    //         .from('cart')
    //         .select('item_id', { count: 'exact' })
    //         .eq('user_id', user_id)

    //     if (data) {

    //         settotalCart(count)
    //     }
    //     if (error) console.log(error)


    // }


    const handleTotalCarts = async () => {

        if (!user) return

        const { count: petCount, error: petError } = await supabase
            .from('pet_cart')
            .select('cart_id', { count: 'exact', head: true })
            .eq('user_id', user.uid)

        if (petError) {
            console.log('Pet cart count error:', petError)
            return
        }

        const { count: productCount, error: productError } = await supabase
            .from('product_cart')
            .select('cart_id', { count: 'exact', head: true })
            .eq('user_id', user.uid)

        if (productError) {
            console.log('Product cart count error:', productError)
            return
        }

        settotalCart((petCount || 0) + (productCount || 0))
    }

    const handleCheckout = async (checkoutData, type, cartData) => {

        if (!user) return false

        const {
            full_name,
            email,
            shipping_address,
            transaction_id,
            cash_on_delivery
        } = checkoutData

        if (!full_name || !email || !shipping_address) {
            return false
        }

        if (!cash_on_delivery && !transaction_id) {
            return false
        }

        const payment_method = cash_on_delivery
            ? 'cod'
            : 'online'

        const extraCharge = cash_on_delivery ? 10 : 0

        if (type === 'pet') {

            for (const pet of cartData) {

                const finalPrice =
                    Number(pet.price) + extraCharge

                const { error } = await supabase
                    .from('pet_orders')
                    .insert([
                        {
                            user_id: user.uid,
                            pet_id: pet.pet_id,
                            full_name,
                            email,
                            shipping_address,
                            transaction_id: cash_on_delivery
                                ? null
                                : transaction_id,
                            payment_method,
                            price: finalPrice,
                            status: 'pending'
                        }
                    ])

                if (error) {
                    console.log('Pet order error:', error)
                    return false
                }

                await supabase
                    .from('pet_cart')
                    .delete()
                    .eq('cart_id', pet.cart_id)
                    .eq('user_id', user.uid)
            }

        } else if (type === 'product') {

            const totalAmount =
                cartData.reduce(
                    (total, item) =>
                        total +
                        Number(item.price) *
                        Number(item.quantity),
                    0
                ) + extraCharge

            const { data: order, error: orderError } = await supabase
                .from('product_orders')
                .insert([
                    {
                        user_id: user.uid,
                        full_name,
                        email,
                        shipping_address,
                        transaction_id: cash_on_delivery
                            ? null
                            : transaction_id,
                        payment_method,
                        total_amount: totalAmount,
                        status: 'pending'
                    }
                ])
                .select('order_id')
                .single()

            if (orderError) {
                console.log('Product order error:', orderError)
                return false
            }

            const orderItems = cartData.map(item => ({
                order_id: order.order_id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            }))

            const { error: itemError } = await supabase
                .from('product_order_items')
                .insert(orderItems)

            if (itemError) {
                console.log('Product order items error:', itemError)
                return false
            }

            const cartIds = cartData.map(item => item.cart_id)

            const { error: deleteError } = await supabase
                .from('product_cart')
                .delete()
                .in('cart_id', cartIds)
                .eq('user_id', user.uid)

            if (deleteError) {
                console.log('Product cart delete error:', deleteError)
                return false
            }
        }

        await handleGetCart()

        const { data: petCart } = await supabase
            .from('pet_cart')
            .select('cart_id')
            .eq('user_id', user.uid)

        const { data: productCart } = await supabase
            .from('product_cart')
            .select('cart_id')
            .eq('user_id', user.uid)

        settotalCart(
            (petCart?.length || 0) +
            (productCart?.length || 0)
        )

        setVisible(true)
        setMessage('Order placed successfully')
        setType('success')

        return true
    }

    // updating the username in supabase
    const handlenameUpdate = async (newUsername) => {



        const { data, error } = await supabase
            .from('users')
            .update({ username: newUsername })
            .eq('email', user.email)

        if (!error) {
            setVisible(true)
            setMessage('Username Changed Successfully')
            setType('success')
        }
        if (error) console.log(error)
    }



    // const handleObjectToArray = async (user_id) => {
    //     const { data, error } = await supabase
    //       .from('cart')
    //       .select('item_id')
    //       .eq('user_id', user_id);

    //     if (error) return [];
    //     if(data)
    //     {
    //      return data.map(item => item.item_id);

    //     }
    //   }

    //   const handleFavourite = async () => {
    //     const user_id = await getUID(user?.email);
    //     const itemIds = await handleObjectToArray(user_id);

    //     const { data, error } = await supabase
    //       .from('pet_products')
    //       .select('*')
    //       .in('product_id', itemIds);


    //     if (error) console.log(error);
    //   }

    const handleCheckAdmin = async () => {

        if (!user) return false

        const { data, error } = await supabase
            .from('userdata')
            .select('is_admin')
            .eq('user_id', user.uid)
            .maybeSingle()

        if (error) {
            console.log('Admin check error:', error)
            return false
        }

        return data?.is_admin === true
    }


    const handleGetOrders = async () => {

        const { data: petOrders, error: petError } = await supabase
            .from('pet_orders')
            .select('*')
            .order('created_at', { ascending: false })

        if (petError) {
            console.log('Pet orders error:', petError)
            return
        }


        const { data: productOrders, error: productError } = await supabase
            .from('product_orders')
            .select('*')
            .order('created_at', { ascending: false })

        if (productError) {
            console.log('Product orders error:', productError)
            return
        }


        const petIds = petOrders?.map(order => order.pet_id) || []

        let pets = []

        if (petIds.length > 0) {

            const { data, error } = await supabase
                .from('pets')
                .select('pet_id, name, breed, category, photo_url, price')
                .in('pet_id', petIds)

            if (error) {
                console.log('Order pets error:', error)
                return
            }

            pets = data || []
        }


        const productOrderIds =
            productOrders?.map(order => order.order_id) || []


        let productItems = []

        if (productOrderIds.length > 0) {

            const { data, error } = await supabase
                .from('product_order_items')
                .select('*')
                .in('order_id', productOrderIds)

            if (error) {
                console.log('Product order items error:', error)
                return
            }

            productItems = data || []
        }


        const productIds =
            productItems.map(item => item.product_id) || []


        let products = []

        if (productIds.length > 0) {

            const { data, error } = await supabase
                .from('products')
                .select('product_id, product_name, type, photo_url, price, weight')
                .in('product_id', productIds)

            if (error) {
                console.log('Order products error:', error)
                return
            }

            products = data || []
        }


        const formattedPetOrders = petOrders.map(order => {

            const pet = pets.find(
                pet => pet.pet_id === order.pet_id
            )

            return {
                ...order,
                pet
            }
        })


        const formattedProductOrders = productOrders.map(order => {

            const items = productItems
                .filter(item => item.order_id === order.order_id)
                .map(item => {

                    const product = products.find(
                        product => product.product_id === item.product_id
                    )

                    return {
                        ...item,
                        product
                    }
                })

            return {
                ...order,
                items
            }
        })


        setadminOrders({
            pets: formattedPetOrders,
            products: formattedProductOrders
        })
    }

    const handleUpdateOrder = async (type, order_id, status) => {

        const table =
            type === 'pet'
                ? 'pet_orders'
                : 'product_orders'


        const { error } = await supabase
            .from(table)
            .update({
                status: status,
                updated_at: new Date().toISOString()
            })
            .eq('order_id', order_id)


        if (error) {

            console.log('Update order error:', error)

            setVisible(true)
            setMessage('Failed to update order')
            setType('error')

            return false
        }


        setadminOrders(prev => {

            if (type === 'pet') {

                return {
                    ...prev,

                    pets: prev.pets.map(order =>
                        order.order_id === order_id
                            ? {
                                ...order,
                                status
                            }
                            : order
                    )
                }

            }


            return {
                ...prev,

                products: prev.products.map(order =>
                    order.order_id === order_id
                        ? {
                            ...order,
                            status
                        }
                        : order
                )
            }

        })


        setVisible(true)
        setMessage('Order status updated')
        setType('success')

        return true
    }

    const handleAdminDeleteOrder = async (type, order_id) => {

        const table =
            type === 'pet'
                ? 'pet_orders'
                : 'product_orders'


        const { error } = await supabase
            .from(table)
            .delete()
            .eq('order_id', order_id)


        if (error) {

            console.log('Delete order error:', error)

            setVisible(true)
            setMessage('Failed to delete order')
            setType('error')

            return false
        }


        if (type === 'pet') {

            setadminOrders(prev => ({
                ...prev,
                pets: prev.pets.filter(
                    order => order.order_id !== order_id
                )
            }))

        } else {

            setadminOrders(prev => ({
                ...prev,
                products: prev.products.filter(
                    order => order.order_id !== order_id
                )
            }))
        }


        setVisible(true)
        setMessage('Order deleted')
        setType('success')

        return true
    }

    // use of subquery in supabase

    const handleFavourite = async () => {

        const user_id = await getUID(user?.email);

        const cartData = await handleGetCart()

        const itemIds = cartData ? cartData.map(item => item.item_id) : [];

        const { data, error } = await supabase
            .from('pet_products')
            .select('*')
            .in('product_id', itemIds);

        if (data) {

            setfavItems(data)
        }

        if (error) {
            console.log(error);
        }
    };



    // unscubsribe

    useEffect(() => {
        const unsubsribe = onAuthStateChanged(auth, (user) => {
            setuser(user)

            setloader(false)

        })


        return () => unsubsribe()
    }, [])


    const UserInfo = {
        user, handleRegister, handleSignIn, loader, setloader, setpageload, pageload, handleFetch,
        fetchedData, detailsFetch, handleDetailsData, handleSignOut, handleGoogleSignIn, loading,
        special, setspecial, insertRegisterDB, myCart, setmyCart, handleCartIN, handleGetCart,
        handleCartDelete, handleProductQuantity, handleTotalCarts, totalCart, emaiUsername, getUID, getUsername,
        handlenameUpdate, handleFavourite, sectionRef, handleScrollToAllproduct,
        setVisible, visible, setType, type, message, setMessage, navigating, favItem, handleCheckout, handleCheckAdmin,

        handleGetOrders,
        handleUpdateOrder,
        handleAdminDeleteOrder,
        adminOrders,
    }

    return (
        <div>
            <AuthContex.Provider value={UserInfo}>{children}</AuthContex.Provider>
        </div>
    );
};

export default AuthProvider;