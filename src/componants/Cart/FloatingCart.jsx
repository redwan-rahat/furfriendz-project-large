import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContex } from "../AuthProvider/AuthProvider";

const FloatingCart = () => {

    const {
        cartOpen,
        setCartOpen,
        handleGetCart,
        handleCartDelete,
        handleCartQuantity,
        handleTotalCarts,
        handleCheckout,
        user
    } = useContext(AuthContex);


    const [checkoutOpen, setCheckoutOpen] = useState(false);


    const [checkoutData, setCheckoutData] = useState({
        full_name: '',
        email: user?.email || '',
        shipping_address: '',
        transaction_id: '',
        cash_on_delivery: false
    });


    const [myCart, setMyCart] = useState({
        pets: [],
        products: [],
        vaccines: []
    });


    // --------------------------------
    // LOAD CART
    // --------------------------------

    useEffect(() => {

        if (cartOpen && user) {

            handleGetCart().then(data => {

                if (data) {
                    setMyCart(data);
                }

            });

        }

    }, [cartOpen, user]);


    // --------------------------------
    // UPDATE EMAIL
    // --------------------------------

    useEffect(() => {

        if (user?.email) {

            setCheckoutData(prev => ({
                ...prev,
                email: user.email
            }));

        }

    }, [user]);


    const pets = myCart?.pets || [];
    const products = myCart?.products || [];
    const vaccines = myCart?.vaccines || [];


    const allCartItems = [
        ...pets,
        ...products,
        ...vaccines
    ];

    const hasUnavailableItems = allCartItems.some(
        item => item.stockStatus === "unavailable"
    );

    const hasInsufficientItems = allCartItems.some(
        item => item.isInsufficient
    );

    const hasStockProblem =
        hasUnavailableItems ||
        hasInsufficientItems;

    // --------------------------------
    // ITEM COUNTS
    // --------------------------------

    const totalPets = pets.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );


    const totalProducts = products.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );


    const totalVaccines = vaccines.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );


    // --------------------------------
    // PET SUBTOTAL
    // --------------------------------

    const petSubtotal = pets.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    );


    // --------------------------------
    // PRODUCT SUBTOTAL
    // --------------------------------

    const productSubtotal = products.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    );


    // --------------------------------
    // VACCINE SUBTOTAL
    // --------------------------------

    const vaccineSubtotal = vaccines.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    );


    // --------------------------------
    // COMBINED SUBTOTAL
    // --------------------------------

    const subtotal =
        petSubtotal +
        productSubtotal +
        vaccineSubtotal;


    // --------------------------------
    // CHECKOUT TOTAL
    // --------------------------------

    const checkoutTotal =
        subtotal +
        (checkoutData.cash_on_delivery ? 10 : 0);


    // --------------------------------
    // STOCK MESSAGE
    // --------------------------------

    const getStockMessage = (item) => {

        if (item.stockStatus === "unavailable") {

            return "This item is not available";

        }


        if (item.isInsufficient) {

            return `Not enough items available. Only ${item.stock_quantity} available.`;

        }


        if (item.stockStatus === "low") {

            return `Only ${item.stock_quantity} left`;

        }


        return null;
    };


    // --------------------------------
    // UPDATE ANY CART ITEM
    // --------------------------------

    const updateQuantity = async (cartId, quantity) => {

        if (quantity < 1) return;


        const success = await handleCartQuantity(
            cartId,
            quantity
        );


        if (!success) return;


        setMyCart(prev => ({
            pets: prev.pets.map(item =>
                item.cart_id === cartId
                    ? {
                        ...item,
                        quantity
                    }
                    : item
            ),

            products: prev.products.map(item =>
                item.cart_id === cartId
                    ? {
                        ...item,
                        quantity
                    }
                    : item
            ),

            vaccines: prev.vaccines.map(item =>
                item.cart_id === cartId
                    ? {
                        ...item,
                        quantity
                    }
                    : item
            )
        }));


        await handleTotalCarts();

    };


    // --------------------------------
    // DELETE ANY CART ITEM
    // --------------------------------

    const deleteItem = async (cartId) => {

        const success = await handleCartDelete(cartId);


        if (!success) return;


        setMyCart(prev => ({
            pets: prev.pets.filter(
                item => item.cart_id !== cartId
            ),

            products: prev.products.filter(
                item => item.cart_id !== cartId
            ),

            vaccines: prev.vaccines.filter(
                item => item.cart_id !== cartId
            )
        }));


        await handleTotalCarts();

    };


    // --------------------------------
    // CHECKOUT INPUT
    // --------------------------------

    const handleCheckoutChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setCheckoutData(prev => ({
            ...prev,
            [name]: value
        }));

    };


    // --------------------------------
    // COD
    // --------------------------------

    const handleCODChange = (e) => {

        setCheckoutData(prev => ({
            ...prev,
            cash_on_delivery: e.target.checked,
            transaction_id: ''
        }));

    };


    // --------------------------------
    // SUBMIT CHECKOUT
    // --------------------------------

    const submitCheckout = async (e) => {

        e.preventDefault();


        // -----------------------------
        // REFRESH STOCK BEFORE CHECKOUT
        // -----------------------------

        const updatedCart = await handleGetCart();


        if (!updatedCart) {
            return;
        }


        setMyCart(updatedCart);


        const freshPets =
            updatedCart.pets || [];

        const freshProducts =
            updatedCart.products || [];

        const freshVaccines =
            updatedCart.vaccines || [];


        const freshCart = {
            pets: freshPets,
            products: freshProducts,
            vaccines: freshVaccines
        };


        // -----------------------------
        // CHECK FOR STOCK PROBLEMS
        // -----------------------------

        const allItems = [
            ...freshPets,
            ...freshProducts,
            ...freshVaccines
        ];


        const unavailableItem =
            allItems.find(
                item =>
                    item.stockStatus === "unavailable"
            );


        if (unavailableItem) {

            return;
        }


        const insufficientItem =
            allItems.find(
                item =>
                    item.isInsufficient
            );


        if (insufficientItem) {

            return;
        }


        // -----------------------------
        // CASH ON DELIVERY
        // -----------------------------

        if (checkoutData.cash_on_delivery) {

            const success = await handleCheckout(
                checkoutData,
                freshCart
            );


            if (success) {

                setCheckoutOpen(false);
                setCartOpen(false);

                setCheckoutData({
                    full_name: '',
                    email: user?.email || '',
                    shipping_address: '',
                    transaction_id: '',
                    cash_on_delivery: false
                });

                await handleTotalCarts();

                window.location.reload();

            }


            return;
        }


        // -----------------------------
        // ONLINE PAYMENT
        // -----------------------------

        const checkoutPayload = {

            checkoutData,

            pets: freshPets,

            products: freshProducts,

            vaccines: freshVaccines,

            checkoutTotal

        };


        localStorage.setItem(
            'furfriendz_bkash_checkout',
            JSON.stringify(checkoutPayload)
        );


        window.open(
            '/bkash-checkout',
            '_blank',
            'noopener,noreferrer'
        );

    };


    // --------------------------------
    // CLOSE CART
    // --------------------------------

    const closeCart = () => {

        setCartOpen(false);
        setCheckoutOpen(false);

    };


    // --------------------------------
    // BKASH SUCCESS LISTENER
    // --------------------------------

    useEffect(() => {

        const handleBkashSuccess = async (event) => {

            if (
                event.key !== 'furfriendz_bkash_success' ||
                !event.newValue
            ) {
                return;
            }

            setCartOpen(false);
            setCheckoutOpen(false);

            await handleTotalCarts();

            localStorage.removeItem(
                'furfriendz_bkash_success'
            );

            window.location.reload();

        };

        window.addEventListener(
            'storage',
            handleBkashSuccess
        );


        return () => {

            window.removeEventListener(
                'storage',
                handleBkashSuccess
            );

        };

    }, [
        handleGetCart,
        handleTotalCarts,
        setCartOpen
    ]);


    return (
        <>

            {/* -------------------------------- */}
            {/* OVERLAY */}
            {/* -------------------------------- */}

            {cartOpen && (

                <div
                    onClick={closeCart}
                    className="
                        fixed
                        inset-0
                        bg-primary/35
                        backdrop-blur-[2px]
                        z-40
                        transition-all
                        duration-300
                    "
                ></div>

            )}


            {/* -------------------------------- */}
            {/* FLOATING CART */}
            {/* -------------------------------- */}

            <div
                className={`
                    fixed
                    top-0
                    right-0
                    h-screen
                    w-full
                    mob:w-96
                    tab:w-[420px]
                    bg-[#EAF7EE]
                    z-50
                    shadow-[-14px_0_40px_rgba(0,103,105,0.18)]
                    transition-transform
                    duration-300
                    ${cartOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                    }
                `}
            >

                {/* -------------------------------- */}
                {/* HEADER */}
                {/* -------------------------------- */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        px-6
                        py-5
                        bg-white/50
                        border-b
                        border-primary/10
                    "
                >

                    <h2 className="text-xl font-semibold text-primary">

                        {
                            checkoutOpen
                                ? "Checkout"
                                : "Your Cart"
                        }

                    </h2>


                    <button
                        onClick={closeCart}
                        className="
                            w-9
                            h-9
                            rounded-full
                            flex
                            items-center
                            justify-center
                            text-xl
                            text-primary
                            bg-white
                            border
                            border-primary/10
                            hover:bg-third
                            hover:border-third
                            transition-all
                            duration-200
                        "
                    >
                        ×
                    </button>

                </div>


                {/* -------------------------------- */}
                {/* CONTENT */}
                {/* -------------------------------- */}

                <div
                    className="
                        p-5
                        overflow-y-auto
                        h-[calc(100vh-80px)]
                        scrollbar-thin
                    "
                >

                    {!checkoutOpen ? (

                        <>

                            {/* ================================= */}
                            {/* PETS */}
                            {/* ================================= */}

                            <div className="mb-8">

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        border-b
                                        border-primary/10
                                        pb-3
                                        mb-4
                                    "
                                >

                                    <h2 className="text-lg font-semibold text-primary">
                                        Your Pets
                                    </h2>

                                    <span className="text-second font-semibold">
                                        {totalPets}
                                    </span>

                                </div>


                                {pets.length === 0 ? (

                                    <p className="text-sm text-primary/50">
                                        No pets added.
                                    </p>

                                ) : (

                                    <div className="space-y-4">

                                        {pets.map(item => (

                                            <div
                                                key={item.cart_id}
                                                className="
                                                    bg-white/55
                                                    border
                                                    border-white
                                                    rounded-xl
                                                    p-3
                                                    shadow-[0_3px_12px_rgba(0,103,105,0.05)]
                                                    hover:shadow-[0_6px_18px_rgba(0,103,105,0.09)]
                                                    transition-shadow
                                                    duration-200
                                                "
                                            >

                                                <div className="flex gap-3">

                                                    <NavLink
                                                        to={`/details/pet/${item.pet_id}`}
                                                        onClick={() =>
                                                            setCartOpen(false)
                                                        }
                                                    >

                                                        <img
                                                            src={item.photo_url}
                                                            alt={item.breed}
                                                            className="
                                                                w-16
                                                                h-16
                                                                object-cover
                                                                rounded-lg
                                                                bg-second
                                                            "
                                                        />

                                                    </NavLink>


                                                    <div className="flex-1 min-w-0">

                                                        <h3 className="font-semibold text-primary truncate">
                                                            {item.breed}
                                                        </h3>


                                                        <p className="text-sm text-primary/55">
                                                            {item.category}
                                                        </p>


                                                        <p className="text-second text-sm mt-1 font-medium">
                                                            ৳{Number(item.price || 0).toFixed(2)}
                                                        </p>


                                                        {/* STOCK MESSAGE */}

                                                        {getStockMessage(item) && (

                                                            <p
                                                                className={`
                                                                    text-xs
                                                                    mt-1
                                                                    ${item.stockStatus === "low" &&
                                                                        !item.isInsufficient
                                                                        ? "text-orange-600"
                                                                        : "text-red-500"
                                                                    }
                                                                `}
                                                            >
                                                                {getStockMessage(item)}
                                                            </p>

                                                        )}


                                                        {/* QUANTITY */}

                                                        <div className="flex items-center gap-2 mt-2">

                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    item.stockStatus === "unavailable"
                                                                }
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.cart_id,
                                                                        Math.max(
                                                                            1,
                                                                            Number(item.quantity) - 1
                                                                        )
                                                                    )
                                                                }
                                                                className="
                                                                    w-7
                                                                    h-7
                                                                    border
                                                                    border-second
                                                                    text-primary
                                                                    rounded-md
                                                                    bg-white
                                                                    hover:bg-second
                                                                    hover:text-white
                                                                    transition-all
                                                                    disabled:opacity-40
                                                                    disabled:cursor-not-allowed
                                                                    disabled:hover:bg-white
                                                                    disabled:hover:text-primary
                                                                "
                                                            >
                                                                -
                                                            </button>


                                                            <span className="text-sm text-primary min-w-4 text-center">
                                                                {item.quantity}
                                                            </span>


                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    item.stockStatus === "unavailable" ||
                                                                    Number(item.quantity) >=
                                                                    Number(item.stock_quantity || 0)
                                                                }
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.cart_id,
                                                                        Number(item.quantity) + 1
                                                                    )
                                                                }
                                                                className="
                                                                    w-7
                                                                    h-7
                                                                    border
                                                                    border-second
                                                                    text-primary
                                                                    rounded-md
                                                                    bg-white
                                                                    hover:bg-second
                                                                    hover:text-white
                                                                    transition-all
                                                                    disabled:opacity-40
                                                                    disabled:cursor-not-allowed
                                                                    disabled:hover:bg-white
                                                                    disabled:hover:text-primary
                                                                "
                                                            >
                                                                +
                                                            </button>

                                                        </div>

                                                    </div>


                                                    <div className="text-right">

                                                        <p className="text-primary font-semibold text-sm">
                                                            ৳{(
                                                                Number(item.price || 0) *
                                                                Number(item.quantity || 0)
                                                            ).toFixed(2)}
                                                        </p>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteItem(item.cart_id)
                                                            }
                                                            className="
                                                                text-red-500
                                                                text-xs
                                                                mt-3
                                                                hover:text-red-600
                                                                transition-colors
                                                            "
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </div>


                            {/* ================================= */}
                            {/* PRODUCTS */}
                            {/* ================================= */}

                            <div className="mb-8">

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        border-b
                                        border-primary/10
                                        pb-3
                                        mb-4
                                    "
                                >

                                    <h2 className="text-lg font-semibold text-primary">
                                        Your Products
                                    </h2>

                                    <span className="text-second font-semibold">
                                        {totalProducts}
                                    </span>

                                </div>


                                {products.length === 0 ? (

                                    <p className="text-sm text-primary/50">
                                        No products added.
                                    </p>

                                ) : (

                                    <div className="space-y-4">

                                        {products.map(item => (

                                            <div
                                                key={item.cart_id}
                                                className="
                                                    bg-white/55
                                                    border
                                                    border-white
                                                    rounded-xl
                                                    p-3
                                                    shadow-[0_3px_12px_rgba(0,103,105,0.05)]
                                                    hover:shadow-[0_6px_18px_rgba(0,103,105,0.09)]
                                                    transition-shadow
                                                    duration-200
                                                "
                                            >

                                                <div className="flex gap-3">

                                                    <NavLink
                                                        to={`/details/product/${item.product_id}`}
                                                        onClick={() =>
                                                            setCartOpen(false)
                                                        }
                                                    >

                                                        <img
                                                            src={item.photo_url}
                                                            alt={item.product_name}
                                                            className="
                                                                w-16
                                                                h-16
                                                                object-cover
                                                                rounded-lg
                                                                bg-second
                                                            "
                                                        />

                                                    </NavLink>


                                                    <div className="flex-1 min-w-0">

                                                        <h3 className="font-semibold text-primary truncate">
                                                            {item.product_name}
                                                        </h3>


                                                        <p className="text-sm text-primary/55">
                                                            {item.type}
                                                        </p>


                                                        <p className="text-second text-sm mt-1 font-medium">
                                                            ৳{Number(item.price || 0).toFixed(2)}
                                                        </p>


                                                        {/* STOCK MESSAGE */}

                                                        {getStockMessage(item) && (

                                                            <p
                                                                className={`
                                                                    text-xs
                                                                    mt-1
                                                                    ${item.stockStatus === "low" &&
                                                                        !item.isInsufficient
                                                                        ? "text-orange-600"
                                                                        : "text-red-500"
                                                                    }
                                                                `}
                                                            >
                                                                {getStockMessage(item)}
                                                            </p>

                                                        )}


                                                        {/* QUANTITY */}

                                                        <div className="flex items-center gap-2 mt-2">

                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    item.stockStatus === "unavailable"
                                                                }
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.cart_id,
                                                                        Math.max(
                                                                            1,
                                                                            Number(item.quantity) - 1
                                                                        )
                                                                    )
                                                                }
                                                                className="
                                                                    w-7
                                                                    h-7
                                                                    border
                                                                    border-second
                                                                    text-primary
                                                                    rounded-md
                                                                    bg-white
                                                                    hover:bg-second
                                                                    hover:text-white
                                                                    transition-all
                                                                    disabled:opacity-40
                                                                    disabled:cursor-not-allowed
                                                                    disabled:hover:bg-white
                                                                    disabled:hover:text-primary
                                                                "
                                                            >
                                                                -
                                                            </button>


                                                            <span className="text-sm text-primary min-w-4 text-center">
                                                                {item.quantity}
                                                            </span>


                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    item.stockStatus === "unavailable" ||
                                                                    Number(item.quantity) >=
                                                                    Number(item.stock_quantity || 0)
                                                                }
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.cart_id,
                                                                        Number(item.quantity) + 1
                                                                    )
                                                                }
                                                                className="
                                                                    w-7
                                                                    h-7
                                                                    border
                                                                    border-second
                                                                    text-primary
                                                                    rounded-md
                                                                    bg-white
                                                                    hover:bg-second
                                                                    hover:text-white
                                                                    transition-all
                                                                    disabled:opacity-40
                                                                    disabled:cursor-not-allowed
                                                                    disabled:hover:bg-white
                                                                    disabled:hover:text-primary
                                                                "
                                                            >
                                                                +
                                                            </button>

                                                        </div>

                                                    </div>


                                                    <div className="text-right">

                                                        <p className="text-primary font-semibold text-sm">
                                                            ৳{(
                                                                Number(item.price || 0) *
                                                                Number(item.quantity || 0)
                                                            ).toFixed(2)}
                                                        </p>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteItem(item.cart_id)
                                                            }
                                                            className="
                                                                text-red-500
                                                                text-xs
                                                                mt-3
                                                                hover:text-red-600
                                                                transition-colors
                                                            "
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </div>


                            {/* ================================= */}
                            {/* VACCINES */}
                            {/* ================================= */}

                            <div className="mb-8">

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        border-b
                                        border-primary/10
                                        pb-3
                                        mb-4
                                    "
                                >

                                    <h2 className="text-lg font-semibold text-primary">
                                        Your Vaccines
                                    </h2>

                                    <span className="text-second font-semibold">
                                        {totalVaccines}
                                    </span>

                                </div>


                                {vaccines.length === 0 ? (

                                    <p className="text-sm text-primary/50">
                                        No vaccines added.
                                    </p>

                                ) : (

                                    <div className="space-y-4">

                                        {vaccines.map(item => (

                                            <div
                                                key={item.cart_id}
                                                className="
                                                    bg-white/55
                                                    border
                                                    border-white
                                                    rounded-xl
                                                    p-3
                                                    shadow-[0_3px_12px_rgba(0,103,105,0.05)]
                                                    hover:shadow-[0_6px_18px_rgba(0,103,105,0.09)]
                                                    transition-shadow
                                                    duration-200
                                                "
                                            >

                                                <div className="flex gap-3">

                                                    <NavLink
                                                        to={`/details/vaccine/${item.vaccine_id}`}
                                                        onClick={() =>
                                                            setCartOpen(false)
                                                        }
                                                    >

                                                        <img
                                                            src={item.photo_url}
                                                            alt={item.vaccine_name}
                                                            className="
                                                                w-16
                                                                h-16
                                                                object-cover
                                                                rounded-lg
                                                                bg-second
                                                            "
                                                        />

                                                    </NavLink>


                                                    <div className="flex-1 min-w-0">

                                                        <h3 className="font-semibold text-primary truncate">
                                                            {item.vaccine_name}
                                                        </h3>


                                                        <p className="text-sm text-primary/55">
                                                            {item.type}
                                                        </p>


                                                        <p className="text-second text-sm mt-1 font-medium">
                                                            ৳{Number(item.price || 0).toFixed(2)}
                                                        </p>


                                                        {/* STOCK MESSAGE */}

                                                        {getStockMessage(item) && (

                                                            <p
                                                                className={`
                                                                    text-xs
                                                                    mt-1
                                                                    ${item.stockStatus === "low" &&
                                                                        !item.isInsufficient
                                                                        ? "text-orange-600"
                                                                        : "text-red-500"
                                                                    }
                                                                `}
                                                            >
                                                                {getStockMessage(item)}
                                                            </p>

                                                        )}


                                                        {/* QUANTITY */}

                                                        <div className="flex items-center gap-2 mt-2">

                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    item.stockStatus === "unavailable"
                                                                }
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.cart_id,
                                                                        Math.max(
                                                                            1,
                                                                            Number(item.quantity) - 1
                                                                        )
                                                                    )
                                                                }
                                                                className="
                                                                    w-7
                                                                    h-7
                                                                    border
                                                                    border-second
                                                                    text-primary
                                                                    rounded-md
                                                                    bg-white
                                                                    hover:bg-second
                                                                    hover:text-white
                                                                    transition-all
                                                                    disabled:opacity-40
                                                                    disabled:cursor-not-allowed
                                                                    disabled:hover:bg-white
                                                                    disabled:hover:text-primary
                                                                "
                                                            >
                                                                -
                                                            </button>


                                                            <span className="text-sm text-primary min-w-4 text-center">
                                                                {item.quantity}
                                                            </span>


                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    item.stockStatus === "unavailable" ||
                                                                    Number(item.quantity) >=
                                                                    Number(item.stock_quantity || 0)
                                                                }
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.cart_id,
                                                                        Number(item.quantity) + 1
                                                                    )
                                                                }
                                                                className="
                                                                    w-7
                                                                    h-7
                                                                    border
                                                                    border-second
                                                                    text-primary
                                                                    rounded-md
                                                                    bg-white
                                                                    hover:bg-second
                                                                    hover:text-white
                                                                    transition-all
                                                                    disabled:opacity-40
                                                                    disabled:cursor-not-allowed
                                                                    disabled:hover:bg-white
                                                                    disabled:hover:text-primary
                                                                "
                                                            >
                                                                +
                                                            </button>

                                                        </div>

                                                    </div>


                                                    <div className="text-right">

                                                        <p className="text-primary font-semibold text-sm">
                                                            ৳{(
                                                                Number(item.price || 0) *
                                                                Number(item.quantity || 0)
                                                            ).toFixed(2)}
                                                        </p>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteItem(item.cart_id)
                                                            }
                                                            className="
                                                                text-red-500
                                                                text-xs
                                                                mt-3
                                                                hover:text-red-600
                                                                transition-colors
                                                            "
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </div>


                            {/* ================================= */}
                            {/* TOTAL */}
                            {/* ================================= */}

                            <div
                                className="
                                    border-t
                                    border-primary/10
                                    pt-5
                                    pb-2
                                "
                            >

                                <div className="flex justify-between items-center">

                                    <span className="text-lg font-semibold text-primary">
                                        Total
                                    </span>

                                    <span className="text-2xl font-semibold text-primary">
                                        ৳{subtotal.toFixed(2)}
                                    </span>

                                </div>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setCheckoutOpen(true)
                                    }
                                    disabled={
                                        allCartItems.length === 0 ||
                                        hasStockProblem
                                    }
                                    className="
        w-full
        mt-5
        py-3
        rounded-xl
        bg-primary
        text-white
        font-semibold
        shadow-[0_5px_15px_rgba(0,103,105,0.18)]
        hover:bg-second
        hover:-translate-y-0.5
        hover:shadow-[0_8px_20px_rgba(0,103,105,0.22)]
        transition-all
        duration-200
        disabled:opacity-40
        disabled:cursor-not-allowed
        disabled:hover:bg-primary
        disabled:hover:translate-y-0
        disabled:hover:shadow-[0_5px_15px_rgba(0,103,105,0.18)]
    "
                                >
                                    {hasUnavailableItems
                                        ? "Some Items Unavailable"
                                        : hasInsufficientItems
                                            ? "Some Items Not Available"
                                            : "Checkout"
                                    }
                                </button>

                            </div>

                        </>

                    ) : (

                        /* ================================= */
                        /* CHECKOUT */
                        /* ================================= */

                        <form
                            onSubmit={submitCheckout}
                            className="space-y-5"
                        >

                            <div>

                                <label className="block text-sm font-semibold text-primary mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="full_name"
                                    value={checkoutData.full_name}
                                    onChange={handleCheckoutChange}
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2.5
                                        rounded-lg
                                        bg-white
                                        text-primary
                                        focus:outline-none
                                        focus:border-primary
                                        border-2
                                        border-transparent
                                        shadow-sm
                                    "
                                    placeholder="Enter your full name"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-semibold text-primary mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={checkoutData.email}
                                    onChange={handleCheckoutChange}
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2.5
                                        rounded-lg
                                        bg-white
                                        text-primary
                                        focus:outline-none
                                        focus:border-primary
                                        border-2
                                        border-transparent
                                        shadow-sm
                                    "
                                    placeholder="Enter your email"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-semibold text-primary mb-2">
                                    Address
                                </label>

                                <textarea
                                    name="shipping_address"
                                    value={checkoutData.shipping_address}
                                    onChange={handleCheckoutChange}
                                    required
                                    rows="3"
                                    className="
                                        w-full
                                        px-3
                                        py-2.5
                                        rounded-lg
                                        bg-white
                                        text-primary
                                        focus:outline-none
                                        focus:border-primary
                                        border-2
                                        border-transparent
                                        resize-none
                                        shadow-sm
                                    "
                                    placeholder="Enter your shipping address"
                                />

                            </div>


                            {/* ================================= */}
                            {/* COD */}
                            {/* ================================= */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    bg-white/50
                                    rounded-xl
                                    p-4
                                    border
                                    border-white
                                "
                            >

                                <div>

                                    <h3 className="text-sm font-semibold text-primary">
                                        Cash on Delivery
                                    </h3>

                                    <p className="text-xs text-primary/55 mt-1">
                                        Additional ৳10 charge
                                    </p>

                                </div>


                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input
                                        type="checkbox"
                                        checked={checkoutData.cash_on_delivery}
                                        onChange={handleCODChange}
                                        className="sr-only peer"
                                    />

                                    <div className="w-11 h-6 bg-third rounded-full peer peer-checked:bg-second transition-all duration-300"></div>

                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>

                                </label>

                            </div>


                            {/* ================================= */}
                            {/* CHECKOUT TOTAL */}
                            {/* ================================= */}

                            <div className="border-t border-primary/10 pt-5">

                                <div className="flex justify-between text-sm mb-2 text-primary">

                                    <span>
                                        Subtotal
                                    </span>

                                    <span className="text-second font-medium">
                                        ৳{subtotal.toFixed(2)}
                                    </span>

                                </div>


                                {checkoutData.cash_on_delivery && (

                                    <div className="flex justify-between text-sm mb-2 text-primary">

                                        <span>
                                            Cash on Delivery Fee
                                        </span>

                                        <span className="text-second font-medium">
                                            ৳10.00
                                        </span>

                                    </div>

                                )}


                                <div className="flex justify-between text-lg font-semibold mt-4 text-primary">

                                    <span>
                                        Total
                                    </span>

                                    <span className="text-xl text-primary">
                                        ৳{checkoutTotal.toFixed(2)}
                                    </span>

                                </div>

                            </div>


                            {/* ================================= */}
                            {/* BUTTONS */}
                            {/* ================================= */}

                            <div className="flex gap-3 pt-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setCheckoutOpen(false)
                                    }
                                    className="
                                        flex-1
                                        py-2.5
                                        rounded-xl
                                        border-2
                                        border-primary
                                        text-primary
                                        bg-white/60
                                        font-medium
                                        hover:bg-primary
                                        hover:text-white
                                        transition-all
                                        duration-200
                                    "
                                >
                                    Back
                                </button>


                                <button
                                    type="submit"
                                    className="
                                        flex-1
                                        py-2.5
                                        rounded-xl
                                        bg-primary
                                        text-white
                                        font-semibold
                                        shadow-[0_5px_15px_rgba(0,103,105,0.18)]
                                        hover:bg-second
                                        hover:-translate-y-0.5
                                        transition-all
                                        duration-200
                                    "
                                >
                                    Place Order
                                </button>

                            </div>

                        </form>

                    )}

                </div>

            </div>

        </>
    );
};

export default FloatingCart;