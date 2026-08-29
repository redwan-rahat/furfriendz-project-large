import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContex } from "../AuthProvider/AuthProvider";

const BkashCheckout = () => {

    const navigate = useNavigate();


    const {
        handleCheckout,
        handleGetCart
    } = useContext(AuthContex);


    const [checkoutInfo, setCheckoutInfo] = useState(null);

    const [paymentAmount, setPaymentAmount] = useState("");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);


    // --------------------------------
    // GET CHECKOUT DATA
    // --------------------------------

    useEffect(() => {

        const storedData = localStorage.getItem(
            'furfriendz_bkash_checkout'
        );


        if (!storedData) {

            navigate("/");

            return;
        }


        try {

            const parsedData =
                JSON.parse(storedData);


            setCheckoutInfo(parsedData);

        } catch (error) {

            console.log(
                "bKash checkout data error:",
                error
            );


            navigate("/");

        }

    }, [navigate]);


    // --------------------------------
    // PAYMENT AMOUNT
    // --------------------------------

    const totalAmount = Number(
        checkoutInfo?.checkoutTotal || 0
    );


    const enteredAmount = Number(
        paymentAmount || 0
    );


    const amountIsCorrect =
        paymentAmount !== "" &&
        enteredAmount.toFixed(2) ===
        totalAmount.toFixed(2);


    // --------------------------------
    // CONFIRM PAYMENT
    // --------------------------------

    const handleConfirm = async () => {

        if (!amountIsCorrect || loading) {

            return;
        }


        if (!checkoutInfo) {

            return;
        }


        setLoading(true);


        // --------------------------------
        // REFRESH CART
        // --------------------------------

        const freshCart =
            await handleGetCart();


        if (!freshCart) {

            setLoading(false);

            return;
        }


        const freshPets =
            freshCart.pets || [];


        const freshProducts =
            freshCart.products || [];


        const freshVaccines =
            freshCart.vaccines || [];


        const allItems = [
            ...freshPets,
            ...freshProducts,
            ...freshVaccines
        ];


        // --------------------------------
        // CHECK UNAVAILABLE ITEMS
        // --------------------------------

        const unavailableItem =
            allItems.find(
                item =>
                    item.stockStatus === "unavailable"
            );


        if (unavailableItem) {

            setLoading(false);

            return;
        }


        // --------------------------------
        // CHECK INSUFFICIENT ITEMS
        // --------------------------------

        const insufficientItem =
            allItems.find(
                item =>
                    item.isInsufficient
            );


        if (insufficientItem) {

            setLoading(false);

            return;
        }


        // --------------------------------
        // PAYMENT DATA
        // --------------------------------

        const paymentData = {

            ...checkoutInfo.checkoutData,

            cash_on_delivery: false,

            transaction_id:
                `BKASH-${Date.now()}`
        };


        const paymentCart = {

            pets: freshPets,

            products: freshProducts,

            vaccines: freshVaccines

        };


        // --------------------------------
        // FINAL CHECK + CREATE ORDER
        // --------------------------------

        const orderSuccess =
            await handleCheckout(
                paymentData,
                paymentCart
            );


        setLoading(false);


        if (!orderSuccess) {

            return;
        }


        // --------------------------------
        // REMOVE STORED CHECKOUT DATA
        // --------------------------------

        localStorage.removeItem(
            'furfriendz_bkash_checkout'
        );


        // --------------------------------
        // TELL ORIGINAL TAB PAYMENT
        // WAS SUCCESSFUL
        // --------------------------------

        localStorage.setItem(
            'furfriendz_bkash_success',
            Date.now().toString()
        );


        // --------------------------------
        // SHOW SUCCESS MESSAGE
        // --------------------------------

        setSuccess(true);


        // --------------------------------
        // CLOSE THIS TAB AFTER 2 SECONDS
        // --------------------------------

        setTimeout(() => {

            window.close();

        }, 2000);

    };


    // --------------------------------
    // CLOSE BUTTON
    // --------------------------------

    const handleClose = () => {

        localStorage.removeItem(
            'furfriendz_bkash_checkout'
        );


        window.close();

    };


    // --------------------------------
    // LOADING
    // --------------------------------

    if (!checkoutInfo) {

        return (

            <div className="min-h-screen bg-white flex items-center justify-center">

                <p className="text-gray-600">
                    Loading payment...
                </p>

            </div>

        );

    }


    // --------------------------------
    // SUCCESS SCREEN
    // --------------------------------

    if (success) {

        return (

            <div className="min-h-screen bg-white flex items-center justify-center">

                <div className="w-full max-w-[480px] text-center px-8">

                    <img
                        src="/bkashcheck.png"
                        alt="bKash Payment"
                        className="w-64 mx-auto mb-8"
                    />


                    <div className="text-[#e2136e] text-3xl font-semibold">
                        Order placed successfully
                    </div>


                    <p className="text-gray-500 mt-4">
                        Your payment was successful.
                    </p>


                    <p className="text-gray-400 text-sm mt-2">
                        This window will close automatically.
                    </p>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-white flex items-center justify-center">

            <div className="w-full max-w-[480px] bg-white">


                {/* -------------------------------- */}
                {/* BKASH HEADER */}
                {/* -------------------------------- */}

                <div className="pt-4 px-10">

                    <div className="h-[82px] flex items-center justify-center">

                        <img
                            src="/bkashcheck.png"
                            alt="bKash Payment"
                            className="max-w-[280px] max-h-[70px] object-contain"
                        />

                    </div>

                </div>


                {/* PINK LINE */}

                <div className="mx-10 h-[5px] bg-[#e2136e]">
                </div>


                {/* -------------------------------- */}
                {/* INVOICE */}
                {/* -------------------------------- */}

                <div className="h-[110px] flex items-center justify-between px-12">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center">

                            <div className="text-[#e2136e] text-xl font-bold">
                                F
                            </div>

                        </div>


                        <div>

                            <p className="text-gray-700 font-semibold text-[15px]">
                                User #4856
                            </p>

                            <p className="text-gray-400 text-xs">
                                Invoice: 38
                            </p>

                        </div>

                    </div>


                    {/* PRICE */}

                    <div className="text-gray-700 text-2xl font-medium">

                        ৳{totalAmount.toFixed(2)}

                    </div>

                </div>


                {/* -------------------------------- */}
                {/* PAYMENT SECTION */}
                {/* -------------------------------- */}

                <div className="bg-[#e2136e]">

                    <div className="px-10 pt-8 pb-7">

                        <p className="text-white text-center text-[16px] mb-7">

                            Enter payment amount

                            <br />

                            <span className="font-medium">
                                Enter the exact amount shown above
                            </span>

                        </p>


                        {/* PAYMENT AMOUNT */}

                        <input
                            type="text"
                            inputMode="decimal"
                            value={paymentAmount}
                            onChange={(e) => {

                                const value =
                                    e.target.value
                                        .replace(/[^0-9.]/g, "")
                                        .replace(
                                            /^(\d*\.\d{0,2}).*$/,
                                            "$1"
                                        );


                                setPaymentAmount(value);

                            }}
                            placeholder="0.00"
                            className="w-full h-[54px] bg-white text-gray-700 text-center text-xl outline-none border-none"
                        />


                        {/* MESSAGE */}

                        <div className="text-center mt-4 text-white text-sm">

                            {paymentAmount !== "" &&
                                !amountIsCorrect && (

                                    <p className="font-medium">
                                        Amount does not match
                                    </p>

                                )
                            }


                            {amountIsCorrect && (

                                <p className="font-medium">
                                    Amount verified
                                </p>

                            )}

                        </div>

                    </div>


                    {/* -------------------------------- */}
                    {/* BUTTONS */}
                    {/* -------------------------------- */}

                    <div className="grid grid-cols-2 h-[55px]">

                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="bg-gray-300 text-gray-600 font-medium hover:bg-gray-400 transition disabled:opacity-50"
                        >
                            CLOSE
                        </button>


                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={
                                loading ||
                                !amountIsCorrect
                            }
                            className="bg-gray-300 text-[#9b2857] font-medium hover:bg-gray-400 transition disabled:opacity-50"
                        >

                            {loading
                                ? "PROCESSING..."
                                : "CONFIRM"
                            }

                        </button>

                    </div>

                </div>


                {/* -------------------------------- */}
                {/* BKASH SUPPORT */}
                {/* -------------------------------- */}

                <div className="h-[90px] flex items-center justify-center">

                    <div className="flex items-center gap-2 text-[#e2136e]">

                        <span className="text-2xl">
                            ☎
                        </span>

                        <span className="font-semibold">
                            16247
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default BkashCheckout;