import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider";


const AdminUsers = () => {

    const {
        adminUsers,
        handleGetUsers,
        handleGetUserDetails,
        handleMakeDelivery,
        handleRemoveDelivery
    } = useContext(AuthContex);


    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const [loadingDetails, setLoadingDetails] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [makingDelivery, setMakingDelivery] = useState(false);
    const [removingDelivery, setRemovingDelivery] = useState(false);


    useEffect(() => {

        handleGetUsers();

    }, []);



    const handleRefresh = async () => {

        setRefreshing(true);

        await handleGetUsers();

        setRefreshing(false);
    };



    const handleOpenUser = async (user) => {

        setSelectedUser(user);
        setUserDetails(null);
        setLoadingDetails(true);


        const details = await handleGetUserDetails(
            user.user_id
        );


        setUserDetails(details);
        setLoadingDetails(false);
    };



    const handleClose = () => {

        setSelectedUser(null);
        setUserDetails(null);
    };




    const handleDelivery = async () => {

        if (!selectedUser) return;

        if (selectedUser.is_delivery) return;


        setMakingDelivery(true);


        const updated = await handleMakeDelivery(
            selectedUser.user_id
        );


        if (updated) {

            setSelectedUser(updated);

            setUserDetails(prev => {

                if (!prev) return prev;

                return {
                    ...prev,
                    user: updated
                };
            });
        }


        setMakingDelivery(false);
    };


    const handleRemoveDeliveryStatus = async () => {

        if (!selectedUser) return;

        if (!selectedUser.is_delivery) return;


        const confirmed = window.confirm(
            `Remove delivery status from ${selectedUser.full_name || "this user"}?`
        );

        if (!confirmed) return;


        setRemovingDelivery(true);


        const updated = await handleRemoveDelivery(
            selectedUser.user_id
        );


        if (updated) {

            setSelectedUser(updated);

            setUserDetails(prev => {

                if (!prev) return prev;

                return {
                    ...prev,
                    user: updated
                };
            });
        }


        setRemovingDelivery(false);
    };


    const formatDate = (date) => {

        if (!date) return "Not available";


        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );
    };




    const formatDateTime = (date) => {

        if (!date) return "Not available";


        return new Date(date).toLocaleString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            }
        );
    };




    const getCartItemName = (cartItem) => {

        if (!cartItem.item) {
            return "Item unavailable";
        }


        if (cartItem.item_type === "pet") {

            return cartItem.item.breed || "Pet";
        }


        if (cartItem.item_type === "product") {

            return cartItem.item.product_name || "Product";
        }


        if (cartItem.item_type === "vaccine") {

            return cartItem.item.vaccine_name || "Vaccine";
        }


        return "Unknown item";
    };




    const getOrderItemName = (item) => {

        if (!item.item) {
            return "Item unavailable";
        }


        if (item.item_type === "pet") {

            return item.item.breed || "Pet";
        }


        if (item.item_type === "product") {

            return item.item.product_name || "Product";
        }


        if (item.item_type === "vaccine") {

            return item.item.vaccine_name || "Vaccine";
        }


        return "Unknown item";
    };


    const getStatusStyle = (status) => {

        if (status === "pending") {

            return "bg-amber-50 text-amber-700 border-amber-200";
        }


        if (status === "confirmed") {

            return "bg-blue-50 text-blue-700 border-blue-200";
        }


        if (status === "completed") {

            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        }


        if (status === "cancelled") {

            return "bg-red-50 text-red-700 border-red-200";
        }


        return "bg-slate-50 text-slate-600 border-slate-200";
    };


    return (

        <div>


            <div className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">

                <div>

                    <h1 className="
                        text-2xl
                        md:text-3xl
                        font-semibold
                        text-slate-900
                    ">
                        Furfriendz Users
                    </h1>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                    ">
                        View customer accounts and activity
                    </p>

                </div>


                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="
                        self-start
                        sm:self-auto
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2.5
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        text-sm
                        font-medium
                        text-slate-700
                        hover:bg-slate-50
                        transition
                        disabled:opacity-50
                    "
                >

                    <svg
                        className={`
                            w-4
                            h-4
                            ${refreshing ? "animate-spin" : ""}
                        `}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M20 11a8 8 0 0 0-14.9-4M4 5v4h4" />
                        <path d="M4 13a8 8 0 0 0 14.9 4M20 19v-4h-4" />
                    </svg>

                    {refreshing
                        ? "Refreshing..."
                        : "Refresh"
                    }

                </button>

            </div>




            <div className="mt-8 mb-4">

                <p className="text-sm text-slate-500">

                    {adminUsers.length}{" "}

                    {adminUsers.length === 1
                        ? "user"
                        : "users"
                    }

                </p>

            </div>


            <div className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                overflow-hidden
            ">

                {adminUsers.length === 0 ? (

                    <div className="
                        py-16
                        text-center
                    ">

                        <p className="text-sm text-slate-500">
                            No users found.
                        </p>

                    </div>

                ) : (

                    <div className="divide-y divide-slate-100">

                        {adminUsers.map(user => (

                            <div
                                key={user.user_id}
                                className="
                                    p-5
                                    md:px-6
                                    flex
                                    flex-col
                                    gap-4
                                    lg:flex-row
                                    lg:items-center
                                    lg:justify-between
                                    hover:bg-slate-50/70
                                    transition
                                "
                            >



                                <div className="
                                    flex
                                    items-start
                                    gap-4
                                    min-w-0
                                ">

                                    <div className="
                                        w-11
                                        h-11
                                        rounded-full
                                        bg-emerald-50
                                        text-emerald-600
                                        flex
                                        items-center
                                        justify-center
                                        font-semibold
                                        shrink-0
                                    ">
                                        {user.full_name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "U"
                                        }
                                    </div>


                                    <div className="min-w-0">

                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                            flex-wrap
                                        ">

                                            <h2 className="
                                                font-semibold
                                                text-slate-900
                                            ">
                                                {user.full_name || "Unnamed User"}
                                            </h2>


                                            {user.is_admin && (

                                                <span className="
                                                    px-2
                                                    py-0.5
                                                    rounded-full
                                                    bg-purple-50
                                                    text-purple-700
                                                    border
                                                    border-purple-200
                                                    text-[11px]
                                                    font-medium
                                                ">
                                                    Admin
                                                </span>

                                            )}


                                            {user.is_delivery && (

                                                <span className="
                                                    px-2
                                                    py-0.5
                                                    rounded-full
                                                    bg-emerald-50
                                                    text-emerald-700
                                                    border
                                                    border-emerald-200
                                                    text-[11px]
                                                    font-medium
                                                ">
                                                    Delivery
                                                </span>

                                            )}

                                        </div>


                                        <p className="
                                            text-sm
                                            text-slate-500
                                            mt-1
                                            break-all
                                        ">
                                            {user.email}
                                        </p>


                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                            mt-2
                                            text-xs
                                            text-slate-400
                                            flex-wrap
                                        ">

                                            <span className="capitalize">
                                                {user.login_type}
                                            </span>

                                            <span>•</span>

                                            <span>
                                                Joined {formatDate(user.created_at)}
                                            </span>

                                        </div>

                                    </div>

                                </div>




                                <button
                                    onClick={() =>
                                        handleOpenUser(user)
                                    }
                                    className="
                                        self-start
                                        lg:self-auto
                                        px-4
                                        py-2.5
                                        rounded-xl
                                        border
                                        border-slate-200
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        hover:bg-white
                                        hover:border-slate-300
                                        transition
                                    "
                                >
                                    View Details
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>




            {selectedUser && (

                <div className="
                    fixed
                    inset-0
                    z-[100]
                ">



                    <div
                        onClick={handleClose}
                        className="
                            absolute
                            inset-0
                            bg-slate-950/40
                            backdrop-blur-sm
                        "
                    />



                    <div className="
                        absolute
                        right-0
                        top-0
                        h-full
                        w-full
                        sm:w-[560px]
                        bg-white
                        shadow-2xl
                        flex
                        flex-col
                    ">



                        <div className="
                            px-5
                            md:px-6
                            py-5
                            border-b
                            border-slate-200
                            flex
                            items-start
                            justify-between
                            gap-4
                        ">

                            <div className="min-w-0">

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    flex-wrap
                                ">

                                    <h2 className="
                                        text-xl
                                        font-semibold
                                        text-slate-900
                                    ">
                                        {selectedUser.full_name}
                                    </h2>


                                    {selectedUser.is_admin && (

                                        <span className="
                                            px-2
                                            py-1
                                            rounded-full
                                            bg-purple-50
                                            text-purple-700
                                            border
                                            border-purple-200
                                            text-xs
                                            font-medium
                                        ">
                                            Admin
                                        </span>

                                    )}


                                    {selectedUser.is_delivery && (

                                        <span className="
                                            px-2
                                            py-1
                                            rounded-full
                                            bg-emerald-50
                                            text-emerald-700
                                            border
                                            border-emerald-200
                                            text-xs
                                            font-medium
                                        ">
                                            Delivery
                                        </span>

                                    )}

                                </div>


                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                    break-all
                                ">
                                    {selectedUser.email}
                                </p>

                            </div>


                            <button
                                onClick={handleClose}
                                className="
                                    w-9
                                    h-9
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-slate-400
                                    hover:bg-slate-100
                                    hover:text-slate-700
                                    transition
                                    shrink-0
                                "
                            >

                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>

                            </button>

                        </div>




                        <div className="
                            flex-1
                            overflow-y-auto
                            px-5
                            md:px-6
                            py-6
                            space-y-7
                        ">

                            {loadingDetails ? (

                                <div className="
                                    py-20
                                    text-center
                                    text-sm
                                    text-slate-500
                                ">
                                    Loading user details...
                                </div>

                            ) : userDetails ? (

                                <>



                                    <section>

                                        <h3 className="
                                            text-sm
                                            font-semibold
                                            text-slate-900
                                            mb-3
                                        ">
                                            Account
                                        </h3>


                                        <div className="
                                            border
                                            border-slate-200
                                            rounded-xl
                                            p-4
                                            space-y-3
                                        ">

                                            <div>

                                                <p className="
                                                    text-xs
                                                    text-slate-400
                                                ">
                                                    User ID
                                                </p>

                                                <p className="
                                                    text-xs
                                                    text-slate-700
                                                    mt-1
                                                    break-all
                                                ">
                                                    {userDetails.user.user_id}
                                                </p>

                                            </div>


                                            <div className="
                                                grid
                                                grid-cols-2
                                                gap-4
                                            ">

                                                <div>

                                                    <p className="text-xs text-slate-400">
                                                        Login Type
                                                    </p>

                                                    <p className="
                                                        text-sm
                                                        text-slate-800
                                                        mt-1
                                                        capitalize
                                                    ">
                                                        {userDetails.user.login_type}
                                                    </p>

                                                </div>


                                                <div>

                                                    <p className="text-xs text-slate-400">
                                                        Joined
                                                    </p>

                                                    <p className="
                                                        text-sm
                                                        text-slate-800
                                                        mt-1
                                                    ">
                                                        {formatDate(
                                                            userDetails.user.created_at
                                                        )}
                                                    </p>

                                                </div>

                                            </div>


                                            <div>

                                                <p className="text-xs text-slate-400">
                                                    Last Updated
                                                </p>

                                                <p className="
                                                    text-sm
                                                    text-slate-800
                                                    mt-1
                                                ">
                                                    {formatDateTime(
                                                        userDetails.user.updated_at
                                                    )}
                                                </p>

                                            </div>

                                        </div>

                                    </section>




                                    <section>

                                        <h3 className="
                                            text-sm
                                            font-semibold
                                            text-slate-900
                                            mb-3
                                        ">
                                            Roles
                                        </h3>


                                        <div className="
                                            border
                                            border-slate-200
                                            rounded-xl
                                            p-4
                                        ">

                                            <div className="
                                                flex
                                                flex-wrap
                                                gap-2
                                            ">

                                                <span className={`
                                                    px-2.5
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-medium
                                                    border
                                                    ${userDetails.user.is_admin
                                                        ? "bg-purple-50 text-purple-700 border-purple-200"
                                                        : "bg-slate-50 text-slate-500 border-slate-200"
                                                    }
                                                `}>
                                                    {userDetails.user.is_admin
                                                        ? "Admin"
                                                        : "Customer"
                                                    }
                                                </span>


                                                <span className={`
                                                    px-2.5
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-medium
                                                    border
                                                    ${userDetails.user.is_delivery
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                        : "bg-slate-50 text-slate-500 border-slate-200"
                                                    }
                                                `}>
                                                    {userDetails.user.is_delivery
                                                        ? "Delivery"
                                                        : "Not Delivery"
                                                    }
                                                </span>

                                            </div>


                                            {!userDetails.user.is_delivery ? (

                                                <button
                                                    onClick={handleDelivery}
                                                    disabled={makingDelivery || removingDelivery}
                                                    className="
                                                        w-full
                                                        mt-4
                                                        px-4
                                                        py-2.5
                                                        rounded-xl
                                                        bg-emerald-500
                                                        text-white
                                                        text-sm
                                                        font-medium
                                                        hover:bg-emerald-600
                                                        transition
                                                        disabled:opacity-50
                                                    "
                                                >
                                                    {makingDelivery
                                                        ? "Making Delivery..."
                                                        : "Make Delivery"
                                                    }
                                                </button>

                                            ) : (

                                                <button
                                                    onClick={handleRemoveDeliveryStatus}
                                                    disabled={makingDelivery || removingDelivery}
                                                    className="
                                                        w-full
                                                        mt-4
                                                        px-4
                                                        py-2.5
                                                        rounded-xl
                                                        border
                                                        border-red-200
                                                        bg-red-50
                                                        text-red-600
                                                        text-sm
                                                        font-medium
                                                        hover:bg-red-100
                                                        transition
                                                        disabled:opacity-50
                                                    "
                                                >
                                                    {removingDelivery
                                                        ? "Removing Delivery..."
                                                        : "Remove Delivery"
                                                    }
                                                </button>

                                            )}

                                        </div>

                                    </section>


                                    <section>

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            mb-3
                                        ">

                                            <h3 className="
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                            ">
                                                Current Cart
                                            </h3>


                                            <span className="
                                                text-xs
                                                text-slate-400
                                            ">
                                                {userDetails.cart.length}{" "}
                                                {userDetails.cart.length === 1
                                                    ? "item"
                                                    : "items"
                                                }
                                            </span>

                                        </div>


                                        {userDetails.cart.length === 0 ? (

                                            <div className="
                                                border
                                                border-slate-200
                                                rounded-xl
                                                p-5
                                                text-center
                                            ">

                                                <p className="
                                                    text-sm
                                                    text-slate-500
                                                ">
                                                    Cart is empty
                                                </p>

                                            </div>

                                        ) : (

                                            <div className="space-y-3">

                                                {userDetails.cart.map(cartItem => (

                                                    <div
                                                        key={cartItem.cart_id}
                                                        className="
                                                            flex
                                                            gap-3
                                                            p-3
                                                            border
                                                            border-slate-200
                                                            rounded-xl
                                                        "
                                                    >

                                                        {cartItem.item?.photo_url ? (

                                                            <img
                                                                src={cartItem.item.photo_url}
                                                                alt={getCartItemName(cartItem)}
                                                                className="
                                                                    w-14
                                                                    h-14
                                                                    rounded-lg
                                                                    object-cover
                                                                    bg-slate-100
                                                                    shrink-0
                                                                "
                                                            />

                                                        ) : (

                                                            <div className="
                                                                w-14
                                                                h-14
                                                                rounded-lg
                                                                bg-slate-100
                                                                shrink-0
                                                            " />

                                                        )}


                                                        <div className="
                                                            min-w-0
                                                            flex-1
                                                        ">

                                                            <p className="
                                                                text-sm
                                                                font-medium
                                                                text-slate-900
                                                            ">
                                                                {getCartItemName(cartItem)}
                                                            </p>


                                                            <p className="
                                                                text-xs
                                                                text-slate-400
                                                                capitalize
                                                                mt-1
                                                            ">
                                                                {cartItem.item_type}
                                                            </p>


                                                            <div className="
                                                                flex
                                                                items-center
                                                                justify-between
                                                                gap-3
                                                                mt-2
                                                            ">

                                                                <span className="
                                                                    text-xs
                                                                    text-slate-500
                                                                ">
                                                                    Quantity: {cartItem.quantity}
                                                                </span>


                                                                {cartItem.item?.price !== undefined && (

                                                                    <span className="
                                                                        text-sm
                                                                        font-medium
                                                                        text-slate-800
                                                                    ">
                                                                        ৳{(
                                                                            Number(cartItem.item.price) *
                                                                            Number(cartItem.quantity)
                                                                        ).toFixed(2)}
                                                                    </span>

                                                                )}

                                                            </div>

                                                        </div>

                                                    </div>

                                                ))}

                                            </div>

                                        )}

                                    </section>



                                    <section>

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            mb-3
                                        ">

                                            <h3 className="
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                            ">
                                                Order History
                                            </h3>


                                            <span className="
                                                text-xs
                                                text-slate-400
                                            ">
                                                {userDetails.orders.length}{" "}
                                                {userDetails.orders.length === 1
                                                    ? "order"
                                                    : "orders"
                                                }
                                            </span>

                                        </div>


                                        {userDetails.orders.length === 0 ? (

                                            <div className="
                                                border
                                                border-slate-200
                                                rounded-xl
                                                p-5
                                                text-center
                                            ">

                                                <p className="
                                                    text-sm
                                                    text-slate-500
                                                ">
                                                    No orders yet
                                                </p>

                                            </div>

                                        ) : (

                                            <div className="space-y-4">

                                                {userDetails.orders.map(order => (

                                                    <div
                                                        key={order.order_id}
                                                        className="
                                                            border
                                                            border-slate-200
                                                            rounded-xl
                                                            overflow-hidden
                                                        "
                                                    >


                                                        <div className="
                                                            p-4
                                                            bg-slate-50
                                                            border-b
                                                            border-slate-200
                                                        ">

                                                            <div className="
                                                                flex
                                                                items-center
                                                                justify-between
                                                                gap-3
                                                            ">

                                                                <div>

                                                                    <p className="
                                                                        text-sm
                                                                        font-semibold
                                                                        text-slate-900
                                                                    ">
                                                                        Order #{order.order_id}
                                                                    </p>


                                                                    <p className="
                                                                        text-xs
                                                                        text-slate-400
                                                                        mt-1
                                                                    ">
                                                                        {formatDateTime(order.created_at)}
                                                                    </p>

                                                                </div>


                                                                <span
                                                                    className={`
                                                                        px-2.5
                                                                        py-1
                                                                        rounded-full
                                                                        border
                                                                        text-xs
                                                                        font-medium
                                                                        capitalize
                                                                        ${getStatusStyle(order.status)}
                                                                    `}
                                                                >
                                                                    {order.status}
                                                                </span>

                                                            </div>


                                                            <div className="
                                                                flex
                                                                items-center
                                                                justify-between
                                                                mt-3
                                                            ">

                                                                <span className="
                                                                    text-xs
                                                                    text-slate-500
                                                                ">
                                                                    {order.payment_method === "online"
                                                                        ? "bKash"
                                                                        : "COD"
                                                                    }
                                                                </span>


                                                                <span className="
                                                                    text-sm
                                                                    font-semibold
                                                                    text-slate-900
                                                                ">
                                                                    ৳{Number(order.total_amount).toFixed(2)}
                                                                </span>

                                                            </div>

                                                        </div>




                                                        <div className="
                                                            p-4
                                                            space-y-3
                                                        ">

                                                            {order.items?.map(item => (

                                                                <div
                                                                    key={item.order_item_id}
                                                                    className="
                                                                        flex
                                                                        gap-3
                                                                    "
                                                                >

                                                                    {item.item?.photo_url ? (

                                                                        <img
                                                                            src={item.item.photo_url}
                                                                            alt={getOrderItemName(item)}
                                                                            className="
                                                                                w-12
                                                                                h-12
                                                                                rounded-lg
                                                                                object-cover
                                                                                bg-slate-100
                                                                                shrink-0
                                                                            "
                                                                        />

                                                                    ) : (

                                                                        <div className="
                                                                            w-12
                                                                            h-12
                                                                            rounded-lg
                                                                            bg-slate-100
                                                                            shrink-0
                                                                        " />

                                                                    )}


                                                                    <div className="
                                                                        min-w-0
                                                                        flex-1
                                                                    ">

                                                                        <p className="
                                                                            text-sm
                                                                            font-medium
                                                                            text-slate-800
                                                                        ">
                                                                            {getOrderItemName(item)}
                                                                        </p>


                                                                        <p className="
                                                                            text-xs
                                                                            text-slate-400
                                                                            capitalize
                                                                            mt-1
                                                                        ">
                                                                            {item.item_type}
                                                                            {" "}×{" "}
                                                                            {item.quantity}
                                                                        </p>

                                                                    </div>


                                                                    <p className="
                                                                        text-sm
                                                                        font-medium
                                                                        text-slate-800
                                                                        whitespace-nowrap
                                                                    ">
                                                                        ৳{(
                                                                            Number(item.price) *
                                                                            Number(item.quantity)
                                                                        ).toFixed(2)}
                                                                    </p>

                                                                </div>

                                                            ))}

                                                        </div>

                                                        <div className="
                                                            px-4
                                                            py-3
                                                            border-t
                                                            border-slate-100
                                                            flex
                                                            justify-between
                                                            text-sm
                                                        ">

                                                            <span className="text-slate-500">
                                                                Total
                                                            </span>

                                                            <span className="
                                                                font-semibold
                                                                text-slate-900
                                                            ">
                                                                ৳{Number(order.total_amount).toFixed(2)}
                                                            </span>

                                                        </div>

                                                    </div>

                                                ))}

                                            </div>

                                        )}

                                    </section>

                                </>

                            ) : (

                                <div className="
                                    py-20
                                    text-center
                                    text-sm
                                    text-slate-500
                                ">
                                    Failed to load user details.
                                </div>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};


export default AdminUsers;