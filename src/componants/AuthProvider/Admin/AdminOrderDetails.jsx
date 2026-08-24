import { useEffect } from "react";


const AdminOrderDetails = ({
    order,
    deliveryUsers,
    onAssignDelivery,
    onUpdateStatus,
    onClose
}) => {

    if (!order) return null;


    useEffect(() => {

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };

    }, []);


    const formatDate = (date) => {

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


    const getItemName = (item) => {

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


    return (

        <div className="fixed inset-0 z-[100]">

            {/* BACKDROP */}

            <div
                onClick={onClose}
                className="
                    absolute
                    inset-0
                    bg-slate-950/40
                    backdrop-blur-sm
                "
            />


            {/* DRAWER */}

            <div
                className="
                    absolute
                    right-0
                    top-0
                    h-full
                    w-full
                    sm:w-[520px]
                    bg-white
                    shadow-2xl
                    flex
                    flex-col
                "
            >

                {/* HEADER */}

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

                    <div>

                        <div className="flex items-center gap-3">

                            <h2 className="
                                text-xl
                                font-semibold
                                text-slate-900
                            ">
                                Order #{order.order_id}
                            </h2>


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


                        <p className="text-sm text-slate-500 mt-2">
                            {formatDate(order.created_at)}
                        </p>

                    </div>


                    <button
                        onClick={onClose}
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


                {/* CONTENT */}

                <div className="
                    flex-1
                    overflow-y-auto
                    px-5
                    md:px-6
                    py-6
                    space-y-7
                ">


                    {/* CUSTOMER */}

                    <section>

                        <h3 className="
                            text-sm
                            font-semibold
                            text-slate-900
                            mb-3
                        ">
                            Customer
                        </h3>


                        <div className="
                            bg-slate-50
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                        ">

                            <p className="font-medium text-slate-900">
                                {order.full_name}
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                                {order.email}
                            </p>

                        </div>

                    </section>


                    {/* SHIPPING */}

                    <section>

                        <h3 className="
                            text-sm
                            font-semibold
                            text-slate-900
                            mb-3
                        ">
                            Shipping Address
                        </h3>


                        <div className="
                            bg-slate-50
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                            text-sm
                            text-slate-700
                        ">

                            {order.shipping_address}

                        </div>

                    </section>


                    {/* ITEMS */}

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
                                Order Items
                            </h3>


                            <span className="text-xs text-slate-400">
                                {order.items?.length || 0} line items
                            </span>

                        </div>


                        <div className="space-y-3">

                            {order.items?.map(item => (

                                <div
                                    key={item.order_item_id}
                                    className="
                                        flex
                                        gap-3
                                        p-3
                                        border
                                        border-slate-200
                                        rounded-xl
                                    "
                                >

                                    {/* IMAGE */}

                                    {item.item?.photo_url ? (

                                        <img
                                            src={item.item.photo_url}
                                            alt={getItemName(item)}
                                            className="
                                                w-16
                                                h-16
                                                rounded-lg
                                                object-cover
                                                bg-slate-100
                                                shrink-0
                                            "
                                        />

                                    ) : (

                                        <div className="
                                            w-16
                                            h-16
                                            rounded-lg
                                            bg-slate-100
                                            shrink-0
                                        " />

                                    )}


                                    {/* INFO */}

                                    <div className="min-w-0 flex-1">

                                        <div className="
                                            flex
                                            justify-between
                                            gap-3
                                        ">

                                            <div>

                                                <p className="
                                                    text-sm
                                                    font-medium
                                                    text-slate-900
                                                ">
                                                    {getItemName(item)}
                                                </p>

                                                <p className="
                                                    text-xs
                                                    text-slate-400
                                                    capitalize
                                                    mt-1
                                                ">
                                                    {item.item_type}
                                                </p>

                                            </div>


                                            <p className="
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                                whitespace-nowrap
                                            ">
                                                ৳{(
                                                    Number(item.price) *
                                                    Number(item.quantity)
                                                ).toFixed(2)}
                                            </p>

                                        </div>


                                        <p className="
                                            text-xs
                                            text-slate-500
                                            mt-2
                                        ">
                                            ৳{Number(item.price).toFixed(2)}
                                            {" "}×{" "}
                                            {item.quantity}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>


                    {/* PAYMENT */}

                    <section>

                        <h3 className="
                            text-sm
                            font-semibold
                            text-slate-900
                            mb-3
                        ">
                            Payment
                        </h3>


                        <div className="
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                            space-y-3
                        ">

                            <div className="
                                flex
                                justify-between
                                text-sm
                            ">

                                <span className="text-slate-500">
                                    Method
                                </span>

                                <span className="
                                    font-medium
                                    text-slate-900
                                    uppercase
                                ">
                                    {order.payment_method === "online"
                                        ? "bKash"
                                        : "COD"}
                                </span>

                            </div>


                            {order.transaction_id && (

                                <div className="
                                    flex
                                    justify-between
                                    gap-4
                                    text-sm
                                ">

                                    <span className="text-slate-500">
                                        Transaction ID
                                    </span>

                                    <span className="
                                        font-medium
                                        text-slate-900
                                        break-all
                                        text-right
                                    ">
                                        {order.transaction_id}
                                    </span>

                                </div>

                            )}


                            <div className="
                                flex
                                justify-between
                                text-sm
                            ">

                                <span className="text-slate-500">
                                    Subtotal
                                </span>

                                <span className="text-slate-900">
                                    ৳{Number(order.subtotal).toFixed(2)}
                                </span>

                            </div>


                            <div className="
                                flex
                                justify-between
                                text-sm
                            ">

                                <span className="text-slate-500">
                                    COD Fee
                                </span>

                                <span className="text-slate-900">
                                    ৳{Number(order.cod_fee).toFixed(2)}
                                </span>

                            </div>


                            <div className="
                                pt-3
                                border-t
                                border-slate-100
                                flex
                                justify-between
                                font-semibold
                            ">

                                <span className="text-slate-900">
                                    Total
                                </span>

                                <span className="text-slate-900">
                                    ৳{Number(order.total_amount).toFixed(2)}
                                </span>

                            </div>

                        </div>

                    </section>


                    {/* DELIVERY */}
                    {/* STATUS */}

                    <section>

                        <h3 className="
        text-sm
        font-semibold
        text-slate-900
        mb-3
    ">
                            Order Status
                        </h3>


                        <div className="
        border
        border-slate-200
        rounded-xl
        p-4
    ">

                            <p className="text-xs text-slate-400 mb-2">
                                Status
                            </p>


                            <select
                                value={order.status}
                                onChange={(e) =>
                                    onUpdateStatus(e.target.value)
                                }
                                className="
                w-full
                px-3
                py-2.5
                rounded-lg
                border
                border-slate-200
                bg-white
                text-sm
                text-slate-800
                outline-none
                focus:border-emerald-500
                focus:ring-1
                focus:ring-emerald-500
            "
                            >

                                <option value="pending">
                                    Pending
                                </option>

                                <option value="confirmed">
                                    Confirmed
                                </option>

                                <option value="completed">
                                    Completed
                                </option>

                                <option value="cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>

                    </section>

                    <section>

                        <h3 className="
        text-sm
        font-semibold
        text-slate-900
        mb-3
    ">
                            Delivery
                        </h3>


                        <div className="
        border
        border-slate-200
        rounded-xl
        p-4
    ">

                            <p className="text-xs text-slate-400 mb-2">
                                Delivered by
                            </p>


                            <select
                                value={order.delivered_by || ""}
                                onChange={(e) =>
                                    onAssignDelivery(e.target.value)
                                }
                                className="
                w-full
                px-3
                py-2.5
                rounded-lg
                border
                border-slate-200
                bg-white
                text-sm
                text-slate-800
                outline-none
                focus:border-emerald-500
                focus:ring-1
                focus:ring-emerald-500
            "
                            >

                                <option value="">
                                    Not assigned
                                </option>


                                {deliveryUsers?.map(deliveryUser => (

                                    <option
                                        key={deliveryUser.user_id}
                                        value={deliveryUser.user_id}
                                    >
                                        {deliveryUser.full_name}
                                    </option>

                                ))}

                            </select>

                        </div>

                    </section>

                </div>

            </div>

        </div>
    );
};

export default AdminOrderDetails;