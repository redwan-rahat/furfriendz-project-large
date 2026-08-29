import { createContext, useEffect, useRef, useState } from "react";
import app from "../../firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import supabase from "../../supabase.config";
import Admin from "./Admin";



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
        products: [],
        vaccines: []
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
        orders: []
    })
    const [myOrders, setMyOrders] = useState([])
    const [deliveryUsers, setDeliveryUsers] = useState([])
    const [adminPets, setAdminPets] = useState([])
    const [adminProducts, setAdminProducts] = useState([])
    const [adminVaccines, setAdminVaccines] = useState([])
    const [adminUsers, setAdminUsers] = useState([])
    const [cartOpen, setCartOpen] = useState(false);




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


    const getUserData = async () => {

        if (!user) return null;

        const { data, error } = await supabase
            .from('userdata')
            .select('*')
            .eq('user_id', user.uid)
            .maybeSingle();

        if (error) {
            console.log('Get user data error:', error);
            return null;
        }

        return data;
    };


    const handleFetch = async (query) => {
        console.log('querry', query)

        if (query === 'products') {

            const { data, error } = await supabase
                .from('products')
                .select('product_id, photo_url, product_name, type')
                .order('product_id', { ascending: true })

            if (error) {
                console.log(error)
            } else {
                setfetchedData(data)
            }

        }

        else if (query === 'vaccine') {

            const { data, error } = await supabase
                .from('vaccines')
                .select('vaccine_id, photo_url, vaccine_name, type, price, dose_count')
                .order('vaccine_id', { ascending: true })

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


    const handleDetailsData = async (type, id) => {

        setloading(true)

        let table
        let idColumn

        if (type === 'pet') {
            table = 'pets'
            idColumn = 'pet_id'
        } else if (type === 'product') {
            table = 'products'
            idColumn = 'product_id'
        } else if (type === 'vaccine') {
            table = 'vaccines'
            idColumn = 'vaccine_id'
        } else {
            console.log('Invalid item type:', type)
            setDetailsFetch(null)
            setloading(false)
            return
        }

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

    const getStockStatus = (stockQuantity) => {

        const stock = Number(stockQuantity || 0)

        if (stock <= 0) {
            return "unavailable"
        }

        if (stock < 3) {
            return "low"
        }

        return "available"
    }


    const handleCartIN = async (type, id) => {

        console.log('handlecartid', type, id)

        if (!user) return false


        // -------------------------
        // GET CURRENT ITEM STOCK
        // -------------------------

        let table
        let idColumn

        if (type === 'pet') {

            table = 'pets'
            idColumn = 'pet_id'

        } else if (type === 'product') {

            table = 'products'
            idColumn = 'product_id'

        } else if (type === 'vaccine') {

            table = 'vaccines'
            idColumn = 'vaccine_id'

        } else {

            return false
        }


        const { data: item, error: itemError } = await supabase
            .from(table)
            .select(`${idColumn}, stock_quantity`)
            .eq(idColumn, id)
            .single()


        if (itemError || !item) {

            console.log('Stock check error:', itemError)

            setVisible(true)
            setMessage('Item is not available')
            setType('error')

            return false
        }


        const stock = Number(item.stock_quantity || 0)


        if (stock <= 0) {

            setVisible(true)
            setMessage('Item is not available')
            setType('error')

            return false
        }


        // -------------------------
        // CHECK EXISTING CART ITEM
        // -------------------------

        const { data, error } = await supabase
            .from('unified_cart')
            .select('cart_id, quantity')
            .eq('user_id', user.uid)
            .eq('item_type', type)
            .eq('item_id', id)
            .maybeSingle()


        if (error) {

            console.log('Cart check error:', error)

            return false
        }


        if (data) {

            const newQuantity =
                Number(data.quantity) + 1


            if (newQuantity > stock) {

                setVisible(true)
                setMessage(
                    `Not enough items available. Only ${stock} available.`
                )
                setType('error')

                return false
            }


            const { error: updateError } = await supabase
                .from('unified_cart')
                .update({
                    quantity: newQuantity
                })
                .eq('cart_id', data.cart_id)
                .eq('user_id', user.uid)


            if (updateError) {

                console.log(
                    'Cart quantity update error:',
                    updateError
                )

                return false
            }

        } else {

            const { error: insertError } = await supabase
                .from('unified_cart')
                .insert([
                    {
                        user_id: user.uid,
                        item_type: type,
                        item_id: id,
                        quantity: 1
                    }
                ])


            if (insertError) {

                console.log(
                    'Cart insert error:',
                    insertError
                )

                return false
            }
        }


        await handleGetCart()
        await handleTotalCarts()


        setVisible(true)
        setMessage('Successfully Added To Cart')
        setType('success')


        return true
    }




    const handleGetCart = async () => {

        if (!user) {

            return {
                pets: [],
                products: [],
                vaccines: []
            }
        }


        // -------------------------
        // GET CART
        // -------------------------

        const { data: cart, error: cartError } = await supabase
            .from('unified_cart')
            .select('*')
            .eq('user_id', user.uid)
            .order('created_at', { ascending: true })


        if (cartError) {

            console.log(
                'Unified cart error:',
                cartError
            )

            return
        }


        const petsCart = (cart || []).filter(
            item => item.item_type === 'pet'
        )

        const productsCart = (cart || []).filter(
            item => item.item_type === 'product'
        )

        const vaccinesCart = (cart || []).filter(
            item => item.item_type === 'vaccine'
        )


        // -------------------------
        // PETS
        // -------------------------

        const petIds = petsCart.map(
            item => item.item_id
        )

        let pets = []


        if (petIds.length > 0) {

            const { data, error } = await supabase
                .from('pets')
                .select('*')
                .in('pet_id', petIds)


            if (error) {

                console.log(
                    'Pets fetch error:',
                    error
                )

                return
            }


            pets = data || []
        }


        // -------------------------
        // PRODUCTS
        // -------------------------

        const productIds = productsCart.map(
            item => item.item_id
        )

        let products = []


        if (productIds.length > 0) {

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .in('product_id', productIds)


            if (error) {

                console.log(
                    'Products fetch error:',
                    error
                )

                return
            }


            products = data || []
        }


        // -------------------------
        // VACCINES
        // -------------------------

        const vaccineIds = vaccinesCart.map(
            item => item.item_id
        )

        let vaccines = []


        if (vaccineIds.length > 0) {

            const { data, error } = await supabase
                .from('vaccines')
                .select('*')
                .in('vaccine_id', vaccineIds)


            if (error) {

                console.log(
                    'Vaccines fetch error:',
                    error
                )

                return
            }


            vaccines = data || []
        }


        // -------------------------
        // MERGE PET CART
        // -------------------------

        const petCartData = petsCart.map(cartItem => {

            const pet = pets.find(
                pet => pet.pet_id === cartItem.item_id
            )


            const stock = Number(
                pet?.stock_quantity || 0
            )


            return {
                ...cartItem,
                ...pet,

                stockStatus:
                    getStockStatus(stock),

                isInsufficient:
                    Number(cartItem.quantity || 0) > stock
            }
        })


        // -------------------------
        // MERGE PRODUCT CART
        // -------------------------

        const productCartData = productsCart.map(cartItem => {

            const product = products.find(
                product =>
                    product.product_id === cartItem.item_id
            )


            const stock = Number(
                product?.stock_quantity || 0
            )


            return {
                ...cartItem,
                ...product,

                stockStatus:
                    getStockStatus(stock),

                isInsufficient:
                    Number(cartItem.quantity || 0) > stock
            }
        })


        // -------------------------
        // MERGE VACCINE CART
        // -------------------------

        const vaccineCartData = vaccinesCart.map(cartItem => {

            const vaccine = vaccines.find(
                vaccine =>
                    vaccine.vaccine_id === cartItem.item_id
            )


            const stock = Number(
                vaccine?.stock_quantity || 0
            )


            return {
                ...cartItem,
                ...vaccine,

                stockStatus:
                    getStockStatus(stock),

                isInsufficient:
                    Number(cartItem.quantity || 0) > stock
            }
        })


        // -------------------------
        // FINAL CART
        // -------------------------

        const result = {
            pets: petCartData,
            products: productCartData,
            vaccines: vaccineCartData
        }


        setmyCart(result)


        return result
    }





    const handleCartDelete = async (cart_id) => {

        if (!user) return false

        const { error } = await supabase
            .from('unified_cart')
            .delete()
            .eq('cart_id', cart_id)
            .eq('user_id', user.uid)

        if (error) {
            console.log('Cart delete error:', error)
            return false
        }

        await handleGetCart()
        await handleTotalCarts()

        setVisible(true)
        setMessage('Removed From Cart')
        setType('success')

        return true
    }

    //new fucntion

    const handleCartQuantity = async (cart_id, quantity) => {

        if (!user) return false

        if (quantity < 1) return false


        // -------------------------
        // GET CART ITEM
        // -------------------------

        const { data: cartItem, error: cartError } = await supabase
            .from('unified_cart')
            .select('item_type, item_id')
            .eq('cart_id', cart_id)
            .eq('user_id', user.uid)
            .single()


        if (cartError || !cartItem) {

            console.log(
                'Cart item fetch error:',
                cartError
            )

            return false
        }


        // -------------------------
        // DETERMINE TABLE
        // -------------------------

        let table
        let idColumn

        if (cartItem.item_type === 'pet') {

            table = 'pets'
            idColumn = 'pet_id'

        } else if (cartItem.item_type === 'product') {

            table = 'products'
            idColumn = 'product_id'

        } else if (cartItem.item_type === 'vaccine') {

            table = 'vaccines'
            idColumn = 'vaccine_id'

        } else {

            return false
        }


        // -------------------------
        // GET CURRENT STOCK
        // -------------------------

        const { data: item, error: itemError } = await supabase
            .from(table)
            .select('stock_quantity')
            .eq(idColumn, cartItem.item_id)
            .single()


        if (itemError || !item) {

            console.log(
                'Stock check error:',
                itemError
            )

            return false
        }


        const stock = Number(
            item.stock_quantity || 0
        )


        // -------------------------
        // UNAVAILABLE
        // -------------------------

        if (stock <= 0) {

            setVisible(true)
            setMessage('Item is not available')
            setType('error')

            return false
        }


        // -------------------------
        // TOO MANY
        // -------------------------

        if (quantity > stock) {

            setVisible(true)
            setMessage(
                `Not enough items available. Only ${stock} available.`
            )
            setType('error')

            return false
        }


        // -------------------------
        // UPDATE CART
        // -------------------------

        const { error } = await supabase
            .from('unified_cart')
            .update({
                quantity: quantity
            })
            .eq('cart_id', cart_id)
            .eq('user_id', user.uid)


        if (error) {

            console.log(
                'Cart quantity update error:',
                error
            )

            return false
        }


        await handleGetCart()
        await handleTotalCarts()


        return true
    }

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

    const handlePetQuantity = async (cart_id, quantity) => {

        if (!user) return false;

        if (quantity < 1) return false;

        const { data, error } = await supabase
            .from('pet_cart')
            .update({
                quantity: quantity
            })
            .eq('cart_id', cart_id)
            .eq('user_id', user.uid)
            .select();

        if (error) {
            console.log('Pet quantity update error:', error);
            return false;
        }

        console.log('Updated pet cart:', data);

        setmyCart(prev => ({
            ...prev,

            pets: prev.pets.map(item =>
                item.cart_id === cart_id
                    ? {
                        ...item,
                        quantity: quantity
                    }
                    : item
            )
        }));

        return true;
    };




    const handleTotalCarts = async () => {

        if (!user) {
            settotalCart(0)
            return
        }

        const { data, error } = await supabase
            .from('unified_cart')
            .select('quantity')
            .eq('user_id', user.uid)

        if (error) {
            console.log('Unified cart count error:', error)
            return
        }

        const total = (data || []).reduce(
            (sum, item) => sum + Number(item.quantity || 0),
            0
        )

        settotalCart(total)
    }

    const handleCheckout = async (checkoutData, { pets, products, vaccines }) => {

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


        const allItems = [

            ...(pets || []).map(item => ({
                item_type: 'pet',
                item_id: item.pet_id,
                quantity: Number(item.quantity || 1),
                price: Number(item.price || 0),
                cart_id: item.cart_id
            })),

            ...(products || []).map(item => ({
                item_type: 'product',
                item_id: item.product_id,
                quantity: Number(item.quantity || 1),
                price: Number(item.price || 0),
                cart_id: item.cart_id
            })),

            ...(vaccines || []).map(item => ({
                item_type: 'vaccine',
                item_id: item.vaccine_id,
                quantity: Number(item.quantity || 1),
                price: Number(item.price || 0),
                cart_id: item.cart_id
            }))

        ]


        if (allItems.length === 0) {
            return false
        }


        // ==========================================
        // FINAL STOCK CHECK
        // ==========================================

        const stockItems = []


        for (const item of allItems) {

            let table
            let idColumn
            let nameColumn


            if (item.item_type === 'pet') {

                table = 'pets'
                idColumn = 'pet_id'
                nameColumn = 'breed'

            }

            else if (item.item_type === 'product') {

                table = 'products'
                idColumn = 'product_id'
                nameColumn = 'product_name'

            }

            else if (item.item_type === 'vaccine') {

                table = 'vaccines'
                idColumn = 'vaccine_id'
                nameColumn = 'vaccine_name'

            }

            else {

                setVisible(true)
                setMessage('Invalid item type')
                setType('error')

                return false
            }


            const { data: stockItem, error: stockError } =
                await supabase
                    .from(table)
                    .select(`${idColumn}, ${nameColumn}, stock_quantity`)
                    .eq(idColumn, item.item_id)
                    .single()


            if (stockError || !stockItem) {

                console.log(
                    'Stock check error:',
                    stockError
                )

                setVisible(true)
                setMessage(
                    'An item in your cart is no longer available.'
                )
                setType('error')

                return false
            }


            const stock = Number(
                stockItem.stock_quantity || 0
            )


            if (stock <= 0) {

                setVisible(true)
                setMessage(
                    `${stockItem[nameColumn]} is not available.`
                )
                setType('error')

                return false
            }


            if (item.quantity > stock) {

                setVisible(true)
                setMessage(
                    `${stockItem[nameColumn]}: only ${stock} available.`
                )
                setType('error')

                return false
            }


            // Save the CURRENT stock.
            // We use this later when decreasing it.

            stockItems.push({
                ...item,
                table,
                idColumn,
                currentStock: stock
            })

        }


        // ==========================================
        // CALCULATE TOTAL
        // ==========================================

        const subtotal = allItems.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        )


        const codFee = cash_on_delivery
            ? 10
            : 0


        const totalAmount =
            subtotal + codFee


        const payment_method =
            cash_on_delivery
                ? 'cod'
                : 'online'


        // ==========================================
        // CREATE ORDER
        // ==========================================

        const { data: order, error: orderError } =
            await supabase
                .from('unified_orders')
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
                        subtotal,
                        cod_fee: codFee,
                        total_amount: totalAmount,
                        status: 'confirmed'
                    }
                ])
                .select('order_id')
                .single()


        if (orderError) {

            console.log(
                'Unified order error:',
                orderError
            )

            setVisible(true)
            setMessage('Failed to place order')
            setType('error')

            return false
        }


        // ==========================================
        // CREATE ORDER ITEMS
        // ==========================================

        const orderItems = allItems.map(item => ({
            order_id: order.order_id,
            item_type: item.item_type,
            item_id: item.item_id,
            quantity: item.quantity,
            price: item.price
        }))


        const { error: itemError } =
            await supabase
                .from('unified_order_items')
                .insert(orderItems)


        if (itemError) {

            console.log(
                'Unified order items error:',
                itemError
            )


            // Remove incomplete order

            await supabase
                .from('unified_orders')
                .delete()
                .eq('order_id', order.order_id)


            setVisible(true)
            setMessage('Failed to place order')
            setType('error')

            return false
        }


        // ==========================================
        // DECREASE STOCK
        // ==========================================

        for (const item of stockItems) {

            const newStock =
                item.currentStock - item.quantity


            const { error: stockUpdateError } =
                await supabase
                    .from(item.table)
                    .update({
                        stock_quantity: newStock
                    })
                    .eq(item.idColumn, item.item_id)


            if (stockUpdateError) {

                console.log(
                    'Stock update error:',
                    stockUpdateError
                )


                // ----------------------------------
                // REMOVE ORDER ITEMS
                // ----------------------------------

                await supabase
                    .from('unified_order_items')
                    .delete()
                    .eq('order_id', order.order_id)


                // ----------------------------------
                // REMOVE ORDER
                // ----------------------------------

                await supabase
                    .from('unified_orders')
                    .delete()
                    .eq('order_id', order.order_id)


                setVisible(true)
                setMessage(
                    'Failed to update item stock. Order was not placed.'
                )
                setType('error')

                return false
            }

        }


        // ==========================================
        // DELETE CART ITEMS
        // ==========================================

        const cartIds = allItems.map(
            item => item.cart_id
        )


        const { error: cartDeleteError } =
            await supabase
                .from('unified_cart')
                .delete()
                .in('cart_id', cartIds)
                .eq('user_id', user.uid)


        if (cartDeleteError) {

            console.log(
                'Unified cart delete error:',
                cartDeleteError
            )

            setVisible(true)
            setMessage(
                'Order placed, but cart cleanup failed.'
            )
            setType('error')

            return false
        }


        // ==========================================
        // REFRESH CART
        // ==========================================

        await handleGetCart()
        await handleTotalCarts()


        // ==========================================
        // SUCCESS
        // ==========================================

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








    const fetchFormattedOrders = async (userId = null) => {

        let query = supabase
            .from('unified_orders')
            .select('*')
            .order('created_at', { ascending: false })

        if (userId) {
            query = query.eq('user_id', userId)
        }

        const { data: orders, error: orderError } = await query

        if (orderError) {
            console.log('Unified orders error:', orderError)
            return []
        }

        if (!orders || orders.length === 0) {
            return []
        }


        // -------------------------
        // GET ORDER ITEMS
        // -------------------------

        const orderIds = orders.map(
            order => order.order_id
        )

        const { data: orderItems, error: itemError } = await supabase
            .from('unified_order_items')
            .select('*')
            .in('order_id', orderIds)

        if (itemError) {
            console.log('Unified order items error:', itemError)
            return []
        }


        const items = orderItems || []


        // -------------------------
        // SEPARATE ITEM IDS
        // -------------------------

        const petIds = [
            ...new Set(
                items
                    .filter(item => item.item_type === 'pet')
                    .map(item => item.item_id)
            )
        ]

        const productIds = [
            ...new Set(
                items
                    .filter(item => item.item_type === 'product')
                    .map(item => item.item_id)
            )
        ]

        const vaccineIds = [
            ...new Set(
                items
                    .filter(item => item.item_type === 'vaccine')
                    .map(item => item.item_id)
            )
        ]


        // -------------------------
        // GET PETS
        // -------------------------

        let pets = []

        if (petIds.length > 0) {

            const { data, error } = await supabase
                .from('pets')
                .select(`
                pet_id,
                breed,
                category,
                photo_url,
                price
            `)
                .in('pet_id', petIds)

            if (error) {
                console.log('Order pets error:', error)
                return []
            }

            pets = data || []
        }


        // -------------------------
        // GET PRODUCTS
        // -------------------------

        let products = []

        if (productIds.length > 0) {

            const { data, error } = await supabase
                .from('products')
                .select(`
                product_id,
                product_name,
                type,
                photo_url,
                price,
                weight
            `)
                .in('product_id', productIds)

            if (error) {
                console.log('Order products error:', error)
                return []
            }

            products = data || []
        }


        // -------------------------
        // GET VACCINES
        // -------------------------

        let vaccines = []

        if (vaccineIds.length > 0) {

            const { data, error } = await supabase
                .from('vaccines')
                .select(`
                vaccine_id,
                vaccine_name,
                type,
                price,
                dose_count,
                photo_url
            `)
                .in('vaccine_id', vaccineIds)

            if (error) {
                console.log('Order vaccines error:', error)
                return []
            }

            vaccines = data || []
        }


        // -------------------------
        // ATTACH ITEM DATA
        // -------------------------

        const formattedItems = items.map(orderItem => {

            let item = null

            if (orderItem.item_type === 'pet') {
                item = pets.find(
                    pet => pet.pet_id === orderItem.item_id
                )
            }

            if (orderItem.item_type === 'product') {
                item = products.find(
                    product => product.product_id === orderItem.item_id
                )
            }

            if (orderItem.item_type === 'vaccine') {
                item = vaccines.find(
                    vaccine => vaccine.vaccine_id === orderItem.item_id
                )
            }

            return {
                ...orderItem,
                item
            }
        })


        // -------------------------
        // ATTACH ITEMS TO ORDERS
        // -------------------------

        return orders.map(order => {

            const orderItemsForOrder = formattedItems.filter(
                item => item.order_id === order.order_id
            )

            return {
                ...order,
                items: orderItemsForOrder
            }
        })
    }


    const handleGetOrders = async () => {

        const formattedOrders = await fetchFormattedOrders()

        setadminOrders({
            orders: formattedOrders
        })

        return formattedOrders
    }


    const handleGetMyOrders = async () => {

        if (!user) {
            setMyOrders([])
            return []
        }

        const formattedOrders = await fetchFormattedOrders(user.uid)

        setMyOrders(formattedOrders)

        return formattedOrders
    }


    const handleUpdateOrder = async (order_id, status) => {

        const allowedStatuses = [
            "confirmed",
            "completed",
            "cancelled"
        ];


        if (!allowedStatuses.includes(status)) {

            console.log("Invalid order status:", status);

            return false;
        }


        const { error } = await supabase
            .from("unified_orders")
            .update({
                status: status,
                updated_at: new Date().toISOString()
            })
            .eq("order_id", order_id);


        if (error) {

            console.log("Order status update error:", error);

            setVisible(true);
            setMessage("Failed to update order status");
            setType("error");

            return false;
        }


        // Update the local admin order immediately

        setadminOrders(prev => ({
            ...prev,

            orders: prev.orders.map(order =>
                order.order_id === order_id
                    ? {
                        ...order,
                        status: status
                    }
                    : order
            )
        }));


        setVisible(true);
        setMessage("Order status updated");
        setType("success");


        return true;
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

    const handleCheckDelivery = async () => {
        if (!user) return false;

        const { data, error } = await supabase
            .from("userdata")
            .select("is_delivery")
            .eq("user_id", user.uid)
            .single();

        if (error) {
            console.error(error);
            return false;
        }

        return data?.is_delivery === true;
    };

    // use of subquery in supabase

    const handleGetDeliveryUsers = async () => {

        const { data, error } = await supabase
            .from('userdata')
            .select('user_id, full_name, email')
            .eq('is_delivery', true)
            .order('full_name', { ascending: true })

        if (error) {

            console.log('Delivery users error:', error)

            return false
        }

        setDeliveryUsers(data || [])

        return true
    }


    const handleAssignDelivery = async (order_id, deliveryUserId) => {

        const { error } = await supabase
            .from('unified_orders')
            .update({
                delivered_by: deliveryUserId || null,
                updated_at: new Date().toISOString()
            })
            .eq('order_id', order_id)


        if (error) {

            console.log('Delivery assignment error:', error)

            setVisible(true)
            setMessage('Failed to assign delivery')
            setType('error')

            return false
        }


        setadminOrders(prev => ({
            ...prev,

            orders: prev.orders.map(order =>
                order.order_id === order_id
                    ? {
                        ...order,
                        delivered_by: deliveryUserId || null
                    }
                    : order
            )
        }))


        setVisible(true)
        setMessage(
            deliveryUserId
                ? 'Delivery person assigned'
                : 'Delivery person removed'
        )
        setType('success')

        return true
    }


    // Admin

    const handleGetPets = async () => {

        const { data, error } = await supabase
            .from("pets")
            .select("*")
            .order("pet_id", { ascending: true })

        if (error) {

            console.log("Pets fetch error:", error)

            return false
        }

        setAdminPets(data || [])

        return true
    }

    const handleUpdatePet = async (petId, updatedPet) => {

        const { data, error } = await supabase
            .from("pets")
            .update(updatedPet)
            .eq("pet_id", petId)
            .select()
            .single();

        if (error) {

            console.log("Pet update error:", error);

            setVisible(true);
            setMessage("Failed to update pet");
            setType("error");

            return false;
        }

        setAdminPets(prev =>
            prev.map(pet =>
                pet.pet_id === petId
                    ? data
                    : pet
            )
        );

        setVisible(true);
        setMessage("Pet updated successfully");
        setType("success");

        return data;
    };


    const handleDeletePet = async (petId) => {

        const { error } = await supabase
            .from("pets")
            .delete()
            .eq("pet_id", petId);


        if (error) {

            console.log("Pet delete error:", error);

            setVisible(true);
            setMessage("Failed to delete pet");
            setType("error");

            return false;
        }


        setAdminPets(prev =>
            prev.filter(pet => pet.pet_id !== petId)
        );


        setVisible(true);
        setMessage("Pet deleted successfully");
        setType("success");

        return true;
    };

    const handleCreatePet = async (newPet) => {

        const { data, error } = await supabase
            .from("pets")
            .insert(newPet)
            .select()
            .single();


        if (error) {

            console.log("Pet create error:", error);

            setVisible(true);
            setMessage("Failed to add pet");
            setType("error");

            return false;
        }


        setAdminPets(prev => [
            ...prev,
            data
        ]);


        setVisible(true);
        setMessage("Pet added successfully");
        setType("success");

        return data;
    };




    const handleGetProducts = async () => {

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("product_id", { ascending: true })

        if (error) {

            console.log("Products fetch error:", error)

            return false
        }

        setAdminProducts(data || [])

        return true
    }

    const handleUpdateProduct = async (productId, updatedProduct) => {

        const { data, error } = await supabase
            .from("products")
            .update(updatedProduct)
            .eq("product_id", productId)
            .select()
            .single()

        if (error) {

            console.log("Product update error:", error)

            setVisible(true)
            setMessage("Failed to update product")
            setType("error")

            return false
        }

        setAdminProducts(prev =>
            prev.map(product =>
                product.product_id === productId
                    ? data
                    : product
            )
        )

        setVisible(true)
        setMessage("Product updated successfully")
        setType("success")

        return data
    }

    const handleDeleteProduct = async (productId) => {

        const { error } = await supabase
            .from("products")
            .delete()
            .eq("product_id", productId)

        if (error) {

            console.log("Product delete error:", error)

            setVisible(true)
            setMessage("Failed to delete product")
            setType("error")

            return false
        }

        setAdminProducts(prev =>
            prev.filter(product =>
                product.product_id !== productId
            )
        )

        setVisible(true)
        setMessage("Product deleted successfully")
        setType("success")

        return true
    }

    const handleCreateProduct = async (newProduct) => {

        const { data, error } = await supabase
            .from("products")
            .insert(newProduct)
            .select()
            .single()

        if (error) {

            console.log("Product create error:", error)

            setVisible(true)
            setMessage("Failed to add product")
            setType("error")

            return false
        }

        setAdminProducts(prev => [
            ...prev,
            data
        ])

        setVisible(true)
        setMessage("Product added successfully")
        setType("success")

        return data
    }



    const handleGetVaccines = async () => {

        const { data, error } = await supabase
            .from("vaccines")
            .select("*")
            .order("vaccine_id", { ascending: true })

        if (error) {

            console.log("Vaccines fetch error:", error)

            return false
        }

        setAdminVaccines(data || [])

        return true
    }


    const handleUpdateVaccine = async (vaccineId, updatedVaccine) => {

        const { data, error } = await supabase
            .from("vaccines")
            .update(updatedVaccine)
            .eq("vaccine_id", vaccineId)
            .select()
            .single()

        if (error) {

            console.log("Vaccine update error:", error)

            setVisible(true)
            setMessage("Failed to update vaccine")
            setType("error")

            return false
        }

        setAdminVaccines(prev =>
            prev.map(vaccine =>
                vaccine.vaccine_id === vaccineId
                    ? data
                    : vaccine
            )
        )

        setVisible(true)
        setMessage("Vaccine updated successfully")
        setType("success")

        return data
    }


    const handleDeleteVaccine = async (vaccineId) => {

        const { error } = await supabase
            .from("vaccines")
            .delete()
            .eq("vaccine_id", vaccineId)

        if (error) {

            console.log("Vaccine delete error:", error)

            setVisible(true)
            setMessage("Failed to delete vaccine")
            setType("error")

            return false
        }

        setAdminVaccines(prev =>
            prev.filter(vaccine =>
                vaccine.vaccine_id !== vaccineId
            )
        )

        setVisible(true)
        setMessage("Vaccine deleted successfully")
        setType("success")

        return true
    }


    const handleCreateVaccine = async (newVaccine) => {

        const { data, error } = await supabase
            .from("vaccines")
            .insert(newVaccine)
            .select()
            .single()

        if (error) {

            console.log("Vaccine create error:", error)

            setVisible(true)
            setMessage("Failed to add vaccine")
            setType("error")

            return false
        }

        setAdminVaccines(prev => [
            ...prev,
            data
        ])

        setVisible(true)
        setMessage("Vaccine added successfully")
        setType("success")

        return data
    }

    const handleGetUsers = async () => {

        const { data, error } = await supabase
            .from("userdata")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {

            console.log("Users fetch error:", error)

            return false
        }

        setAdminUsers(data || [])

        return true
    }


    const handleMakeDelivery = async (userId) => {

        const { data, error } = await supabase
            .from("userdata")
            .update({
                is_delivery: true,
                updated_at: new Date().toISOString()
            })
            .eq("user_id", userId)
            .select()
            .single()

        if (error) {

            console.log("Make delivery error:", error)

            setVisible(true)
            setMessage("Failed to make user a delivery person")
            setType("error")

            return false
        }

        setAdminUsers(prev =>
            prev.map(user =>
                user.user_id === userId
                    ? data
                    : user
            )
        )

        setVisible(true)
        setMessage("User is now a delivery person")
        setType("success")

        return data
    }

    const handleRemoveDelivery = async (userId) => {

        const { data, error } = await supabase
            .from("userdata")
            .update({
                is_delivery: false,
                updated_at: new Date().toISOString()
            })
            .eq("user_id", userId)
            .select()
            .single()

        if (error) {

            console.log("Remove delivery error:", error)

            setVisible(true)
            setMessage("Failed to remove delivery status")
            setType("error")

            return false
        }

        setAdminUsers(prev =>
            prev.map(user =>
                user.user_id === userId
                    ? data
                    : user
            )
        )

        setVisible(true)
        setMessage("Delivery status removed")
        setType("success")

        return data
    }

    const handleGetUserDetails = async (userId) => {

        // -------------------------
        // USER
        // -------------------------

        const { data: userData, error: userError } = await supabase
            .from("userdata")
            .select("*")
            .eq("user_id", userId)
            .single()

        if (userError) {

            console.log("User details error:", userError)

            return null
        }


        // -------------------------
        // CART
        // -------------------------

        const { data: cart, error: cartError } = await supabase
            .from("unified_cart")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: true })

        if (cartError) {

            console.log("User cart error:", cartError)

            return null
        }


        const cartItems = cart || []


        // -------------------------
        // SEPARATE CART IDS
        // -------------------------

        const petIds = [
            ...new Set(
                cartItems
                    .filter(item => item.item_type === "pet")
                    .map(item => item.item_id)
            )
        ]

        const productIds = [
            ...new Set(
                cartItems
                    .filter(item => item.item_type === "product")
                    .map(item => item.item_id)
            )
        ]

        const vaccineIds = [
            ...new Set(
                cartItems
                    .filter(item => item.item_type === "vaccine")
                    .map(item => item.item_id)
            )
        ]


        // -------------------------
        // FETCH CART PETS
        // -------------------------

        let pets = []

        if (petIds.length > 0) {

            const { data, error } = await supabase
                .from("pets")
                .select("*")
                .in("pet_id", petIds)

            if (error) {

                console.log("User cart pets error:", error)

            } else {

                pets = data || []
            }
        }


        // -------------------------
        // FETCH CART PRODUCTS
        // -------------------------

        let products = []

        if (productIds.length > 0) {

            const { data, error } = await supabase
                .from("products")
                .select("*")
                .in("product_id", productIds)

            if (error) {

                console.log("User cart products error:", error)

            } else {

                products = data || []
            }
        }


        // -------------------------
        // FETCH CART VACCINES
        // -------------------------

        let vaccines = []

        if (vaccineIds.length > 0) {

            const { data, error } = await supabase
                .from("vaccines")
                .select("*")
                .in("vaccine_id", vaccineIds)

            if (error) {

                console.log("User cart vaccines error:", error)

            } else {

                vaccines = data || []
            }
        }


        // -------------------------
        // ATTACH CART ITEM DATA
        // -------------------------

        const formattedCart = cartItems.map(cartItem => {

            let item = null


            if (cartItem.item_type === "pet") {

                item = pets.find(
                    pet => pet.pet_id === cartItem.item_id
                )

            }


            if (cartItem.item_type === "product") {

                item = products.find(
                    product => product.product_id === cartItem.item_id
                )

            }


            if (cartItem.item_type === "vaccine") {

                item = vaccines.find(
                    vaccine => vaccine.vaccine_id === cartItem.item_id
                )

            }


            return {
                ...cartItem,
                item
            }
        })


        // -------------------------
        // ORDERS
        // -------------------------

        const orders = await fetchFormattedOrders(userId)


        return {
            user: userData,
            cart: formattedCart,
            orders
        }
    }


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
        handleCartDelete,
        handleProductQuantity,
        handlePetQuantity,
        handleCartQuantity,
        handleTotalCarts,
        totalCart, emaiUsername, getUID, getUsername,
        handlenameUpdate, handleFavourite, sectionRef, handleScrollToAllproduct,
        setVisible, visible, setType, type, message, setMessage, navigating, favItem, handleCheckout, handleCheckAdmin,

        handleGetOrders,
        handleGetMyOrders,
        handleUpdateOrder,
        handleAdminDeleteOrder,
        adminOrders,
        myOrders,

        handleGetDeliveryUsers,
        handleCheckDelivery,
        handleAssignDelivery,
        deliveryUsers,

        cartOpen,
        setCartOpen,

        adminPets,
        handleGetPets,
        handleUpdatePet,
        handleDeletePet,
        handleCreatePet,

        adminProducts,
        handleGetProducts,
        handleUpdateProduct,
        handleDeleteProduct,
        handleCreateProduct,

        adminVaccines,
        handleGetVaccines,
        handleUpdateVaccine,
        handleDeleteVaccine,
        handleCreateVaccine,

        adminUsers,
        handleGetUsers,
        handleGetUserDetails,
        handleMakeDelivery,
        handleRemoveDelivery,
        getUserData,

    }

    return (
        <div>
            <AuthContex.Provider value={UserInfo}>{children}</AuthContex.Provider>
        </div>
    );
};

export default AuthProvider;