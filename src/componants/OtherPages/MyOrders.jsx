import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";
import DogSitting from "../Animations/DogSitting";

const MyOrders = () => {

    const {
        user,
        myOrders,
        handleGetMyOrders
    } = useContext(AuthContex);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadOrders = async () => {

            setLoading(true);

            await handleGetMyOrders();

            setLoading(false);
        };

        if (user) {
            loadOrders();
        }

    }, [user]);


    const formatDate = (date) => {

        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };


    const getItemName = (orderItem) => {

        const item = orderItem?.item;

        if (!item) {
            return "Item unavailable";
        }

        if (orderItem.item_type === "pet") {
            return item.breed;
        }

        if (orderItem.item_type === "product") {
            return item.product_name;
        }

        if (orderItem.item_type === "vaccine") {
            return item.vaccine_name;
        }

        return "Item";
    };


    const getItemImage = (orderItem) => {

        return orderItem?.item?.photo_url || "";
    };


    const getItemSubtitle = (orderItem) => {

        const item = orderItem?.item;

        if (!item) return "";

        if (orderItem.item_type === "pet") {
            return item.category;
        }

        if (orderItem.item_type === "product") {
            return item.type;
        }

        if (orderItem.item_type === "vaccine") {
            return item.type;
        }

        return "";
    };


    const getStatusStyle = (status) => {

        switch (status) {

            case "completed":
                return "bg-green-100 text-green-700";

            case "confirmed":
                return "bg-blue-100 text-blue-700";

            case "cancelled":
                return "bg-red-100 text-red-600";

            default:
                return "bg-slate-100 text-slate-600";
        }
    };


    if (loading) {

        return (
            <div className="min-h-[70vh] flex items-center justify-center">

                <div className="w-64">
                    <DogSitting />
                </div>

            </div>
        );
    }


    return (

        <div className="font-page mt-12 mb-20">

            {/* Heading */}

            <div className="mb-16">

                <h1 className="
                    text-center
                    text-primary
                    font-semibold
                    text-3xl
                    mob:text-4xl
                    tab:text-5xl
                    lap:text-6xl
                ">
                    My Orders
                </h1>

                <p className="
                    text-center
                    text-primary/60
                    mt-4
                    text-sm
                    tab:text-base
                ">
                    View your orders, items and order status
                </p>

            </div>


            {/* Orders */}

            <div className="
                w-11/12
                lap:w-10/12
                des:w-9/12
                mx-auto
                space-y-8
            ">

                {myOrders.length === 0 ? (

                    <div className="
                        bg-[#EAF7EE]
                        rounded-2xl
                        py-16
                        flex
                        flex-col
                        items-center
                        justify-center
                    ">

                        <div className="w-56 tab:w-64">
                            <DogSitting />
                        </div>

                        <h2 className="
                            text-primary
                            text-xl
                            tab:text-2xl
                            font-medium
                            mt-4
                        ">
                            No Orders Yet
                        </h2>

                        <p className="
                            text-primary/60
                            text-sm
                            tab:text-base
                            mt-2
                        ">
                            Your orders will appear here.
                        </p>

                        <NavLink
                            to="/shop"
                            className="
                                mt-6
                                px-6
                                py-3
                                rounded-lg
                                bg-primary
                                text-white
                                font-medium
                                hover:shadow-lg
                                transition-all
                            "
                        >
                            Start Shopping
                        </NavLink>

                    </div>

                ) : (

                    myOrders.map((order) => (

                        <div
                            key={order.order_id}
                            className="
                                bg-[#EAF7EE]
                                rounded-2xl
                                overflow-hidden
                            "
                        >

                            {/* Order Header */}

                            <div className="
                                px-6
                                py-5
                                tab:px-8
                                flex
                                flex-wrap
                                gap-4
                                justify-between
                                items-center
                                border-b
                                border-primary/10
                            ">

                                <div>

                                    <p className="
                                        text-primary/50
                                        text-xs
                                        tab:text-sm
                                    ">
                                        Order
                                    </p>

                                    <h2 className="
                                        text-primary
                                        font-semibold
                                        text-lg
                                        tab:text-xl
                                    ">
                                        #{order.order_id}
                                    </h2>

                                </div>


                                <div>

                                    <p className="
                                        text-primary/50
                                        text-xs
                                        tab:text-sm
                                    ">
                                        Ordered
                                    </p>

                                    <p className="
                                        text-primary
                                        font-medium
                                        text-sm
                                        tab:text-base
                                    ">
                                        {formatDate(order.created_at)}
                                    </p>

                                </div>


                                <div>

                                    <span className={`
    inline-flex
    px-4
    py-2
    rounded-full
    text-xs
    tab:text-sm
    font-medium
    capitalize
    ${getStatusStyle(order.status)}
`}>
                                        {order.status === "cancelled"
                                            ? "Cancelled / Refunded"
                                            : order.status
                                        }
                                    </span>

                                </div>

                            </div>


                            {/* Items */}

                            <div className="px-6 tab:px-8 py-5">

                                <div className="space-y-4">

                                    {order.items?.map((orderItem) => (

                                        <div
                                            key={orderItem.order_item_id}
                                            className="
                                                bg-white/60
                                                rounded-xl
                                                p-4
                                                flex
                                                items-center
                                                gap-4
                                            "
                                        >

                                            {/* Image */}

                                            <div className="
                                                w-16
                                                h-16
                                                tab:w-20
                                                tab:h-20
                                                rounded-full
                                                bg-second
                                                overflow-hidden
                                                flex-shrink-0
                                            ">

                                                {getItemImage(orderItem) ? (

                                                    <img
                                                        src={getItemImage(orderItem)}
                                                        alt={getItemName(orderItem)}
                                                        className="
                                                            w-full
                                                            h-full
                                                            object-cover
                                                        "
                                                    />

                                                ) : null}

                                            </div>


                                            {/* Item Info */}

                                            <div className="flex-1 min-w-0">

                                                <h3 className="
                                                    text-primary
                                                    font-semibold
                                                    text-sm
                                                    tab:text-base
                                                ">
                                                    {getItemName(orderItem)}
                                                </h3>

                                                <p className="
                                                    text-primary/50
                                                    text-xs
                                                    tab:text-sm
                                                    capitalize
                                                ">
                                                    {getItemSubtitle(orderItem)}
                                                </p>

                                                <p className="
                                                    text-primary/60
                                                    text-xs
                                                    tab:text-sm
                                                    mt-1
                                                ">
                                                    Quantity: {orderItem.quantity}
                                                </p>

                                            </div>


                                            {/* Price */}

                                            <div className="
                                                text-right
                                                flex-shrink-0
                                            ">

                                                <p className="
                                                    text-primary
                                                    font-semibold
                                                    text-sm
                                                    tab:text-base
                                                ">
                                                    ${(
                                                        Number(orderItem.price) *
                                                        Number(orderItem.quantity)
                                                    ).toFixed(2)}
                                                </p>

                                                <p className="
                                                    text-primary/50
                                                    text-xs
                                                ">
                                                    ${Number(orderItem.price).toFixed(2)} each
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>


                            {/* Order Footer */}

                            <div className="
                                px-6
                                tab:px-8
                                py-5
                                border-t
                                border-primary/10
                                flex
                                flex-wrap
                                gap-5
                                justify-between
                                items-center
                            ">

                                <div>

                                    <p className="
                                        text-primary/50
                                        text-xs
                                        tab:text-sm
                                    ">
                                        Payment
                                    </p>

                                    <p className="
                                        text-primary
                                        font-medium
                                        text-sm
                                        tab:text-base
                                        uppercase
                                    ">
                                        {order.payment_method === "cod"
                                            ? "Cash on Delivery"
                                            : "Online Payment"
                                        }
                                    </p>

                                </div>


                                <div className="text-right">

                                    <p className="
                                        text-primary/50
                                        text-xs
                                        tab:text-sm
                                    ">
                                        Total
                                    </p>

                                    <p className="
                                        text-primary
                                        font-semibold
                                        text-xl
                                        tab:text-2xl
                                    ">
                                        ${Number(order.total_amount).toFixed(2)}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
};

export default MyOrders;