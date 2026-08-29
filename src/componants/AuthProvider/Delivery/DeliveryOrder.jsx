import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContex } from "../AuthProvider";
import DeliveryOrderDetails from "./DeliveryOrderDetails";

const DeliveryOrder = () => {

    const {
        user,
        adminOrders,
        handleGetOrders,
        handleUpdateOrder
    } = useContext(AuthContex);

    const [activeTab, setActiveTab] = useState("all");
    const [refreshing, setRefreshing] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);


    const orders = adminOrders?.orders || [];


    useEffect(() => {
        handleGetOrders();
    }, []);


    const handleRefresh = async () => {

        setRefreshing(true);

        await handleGetOrders();

        setRefreshing(false);
    };


    const handleStatusChange = async (status) => {

        if (!selectedOrder) return;

        if (
            selectedOrder.status !== "confirmed" ||
            !["completed", "cancelled"].includes(status)
        ) {
            return;
        }

        const success = await handleUpdateOrder(
            selectedOrder.order_id,
            status
        );

        if (success) {

            setSelectedOrder(prev => ({
                ...prev,
                status
            }));

        }
    };


    const filteredOrders = useMemo(() => {

        let filtered = orders.filter(
            order => order.delivered_by === user?.uid
        );


        if (activeTab === "pending") {

            filtered = filtered.filter(
                order => order.status === "confirmed"
            );

        }


        if (activeTab === "completed") {

            filtered = filtered.filter(
                order => order.status === "completed"
            );

        }


        if (activeTab === "cancelled") {

            filtered = filtered.filter(
                order => order.status === "cancelled"
            );

        }


        return [...filtered].sort(
            (a, b) =>
                new Date(b.created_at) -
                new Date(a.created_at)
        );

    }, [orders, user?.uid, activeTab]);


    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );

    };


    const getItemCount = (order) => {

        return (order.items || []).reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );

    };


    const getPaymentLabel = (paymentMethod) => {

        if (paymentMethod === "cod") {
            return "COD";
        }

        if (paymentMethod === "online") {
            return "bKash";
        }

        return paymentMethod || "Unknown";
    };


    const getStatusStyle = (status) => {

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


    const tabs = [
        {
            id: "all",
            label: "All"
        },
        {
            id: "pending",
            label: "Delivery Pending"
        },
        {
            id: "completed",
            label: "Completed"
        },
        {
            id: "cancelled",
            label: "Cancelled / Refunded"
        }
    ];


    return (
        <div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
                        Furfriendz Orders
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        View and complete your assigned deliveries
                    </p>

                </div>


                <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
                >

                    <svg
                        className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M20 11a8 8 0 0 0-14.9-4M4 5v4h4" />
                        <path d="M4 13a8 8 0 0 0 14.9 4M20 19v-4h-4" />
                    </svg>

                    {refreshing ? "Refreshing..." : "Refresh"}

                </button>

            </div>


            <div className="mt-8 border-b border-slate-200">

                <div className="flex gap-1 overflow-x-auto">

                    {tabs.map(tab => {

                        const active = activeTab === tab.id;

                        return (
                            <button
                                type="button"
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative shrink-0 px-4 py-3 text-sm font-medium transition ${active
                                        ? "text-emerald-600"
                                        : "text-slate-500 hover:text-slate-800"
                                    }`}
                            >

                                {tab.label}

                                {active && (
                                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-emerald-500 rounded-full" />
                                )}

                            </button>
                        );

                    })}

                </div>

            </div>


            <div className="mt-6 mb-4">

                <p className="text-sm text-slate-500">
                    {filteredOrders.length}{" "}
                    {filteredOrders.length === 1 ? "order" : "orders"}
                </p>

            </div>


            <div className="space-y-4">

                {filteredOrders.length === 0 ? (

                    <div className="bg-white border border-slate-200 rounded-2xl py-16 text-center">

                        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center">

                            <svg
                                className="w-6 h-6 text-slate-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                                <path d="M8 8h8M8 12h5" />
                            </svg>

                        </div>


                        <h3 className="mt-4 font-medium text-slate-800">
                            No orders found
                        </h3>


                        <p className="text-sm text-slate-500 mt-1">
                            There are no orders in this category.
                        </p>

                    </div>

                ) : (

                    filteredOrders.map(order => (

                        <div
                            key={order.order_id}
                            className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 hover:border-slate-300 transition"
                        >

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                                <div>

                                    <div className="flex items-center gap-3 flex-wrap">

                                        <h2 className="font-semibold text-slate-900">
                                            Order #{order.order_id}
                                        </h2>


                                        <span
                                            className={`px-2.5 py-1 rounded-full border text-xs font-medium capitalize ${getStatusStyle(order.status)}`}
                                        >
                                            {order.status === "confirmed"
                                                ? "Delivery Pending"
                                                : order.status === "cancelled"
                                                    ? "Cancelled / Refunded"
                                                    : order.status
                                            }
                                        </span>

                                    </div>


                                    <p className="text-sm text-slate-500 mt-2">
                                        {formatDate(order.created_at)}
                                    </p>

                                </div>


                                <div className="text-left sm:text-right">

                                    <p className="text-xs text-slate-500">
                                        Total
                                    </p>

                                    <p className="text-xl font-semibold text-slate-900">
                                        ৳{Number(order.total_amount).toFixed(2)}
                                    </p>

                                </div>

                            </div>


                            <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                                <div>

                                    <p className="text-xs text-slate-400">
                                        Customer
                                    </p>

                                    <p className="text-sm font-medium text-slate-800 mt-1">
                                        {order.full_name}
                                    </p>

                                </div>


                                <div>

                                    <p className="text-xs text-slate-400">
                                        Items
                                    </p>

                                    <p className="text-sm text-slate-700 mt-1">
                                        {getItemCount(order)}{" "}
                                        {getItemCount(order) === 1
                                            ? "item"
                                            : "items"
                                        }
                                    </p>

                                </div>


                                <div>

                                    <p className="text-xs text-slate-400">
                                        Payment
                                    </p>

                                    <p className="text-sm text-slate-700 mt-1">
                                        {getPaymentLabel(order.payment_method)}
                                    </p>

                                </div>


                                <div>

                                    <p className="text-xs text-slate-400">
                                        Address
                                    </p>

                                    <p className="text-sm text-slate-700 mt-1 line-clamp-1">
                                        {order.shipping_address}
                                    </p>

                                </div>

                            </div>


                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-end">

                                <button
                                    type="button"
                                    onClick={() => setSelectedOrder(order)}
                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                                >
                                    View Order
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>


            {selectedOrder && (
                <DeliveryOrderDetails
                    order={selectedOrder}
                    onUpdateStatus={handleStatusChange}
                    onClose={() => setSelectedOrder(null)}
                />
            )}

        </div>
    );

};


export default DeliveryOrder;