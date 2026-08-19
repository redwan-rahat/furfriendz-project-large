import { useContext, useEffect, useState } from "react";

import DeleteModal from "../../OtherPages/DeleteModal";
import { AuthContex } from "../AuthProvider";

const AdminOrders = () => {

    const {
        adminOrders,
        handleGetOrders,
        handleUpdateOrder,
        handleAdminDeleteOrder
    } = useContext(AuthContex)


    const [orderType, setOrderType] = useState('pet')

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)


    const pets = adminOrders?.pets || []
    const products = adminOrders?.products || []


    useEffect(() => {

        handleGetOrders()

    }, [])


    const handleDelete = async () => {

        setModalOpen(false)

        if (!selectedOrder) return

        await handleAdminDeleteOrder(
            selectedOrder.type,
            selectedOrder.order_id
        )

        setSelectedOrder(null)
    }


    return (

        <div>

            {/* ORDER SWITCH */}

            <div className="grid grid-cols-2 w-full tab:w-8/12 lap:w-6/12 m-auto text-center font-semibold">

                <button
                    onClick={() => setOrderType('pet')}
                    className={`w-11/12 m-auto py-2 rounded-md border-2 duration-300 ${
                        orderType === 'pet'
                            ? 'bg-primary text-white border-white'
                            : 'border-white hover:bg-third/50'
                    }`}
                >
                    Pet Orders
                </button>


                <button
                    onClick={() => setOrderType('product')}
                    className={`w-11/12 m-auto py-2 rounded-md border-2 duration-300 ${
                        orderType === 'product'
                            ? 'bg-primary text-white border-white'
                            : 'border-white hover:bg-third/50'
                    }`}
                >
                    Product Orders
                </button>

            </div>


            <div className="mt-10">


                {/* PET ORDERS */}

                {orderType === 'pet' && (

                    pets.length === 0 ? (

                        <div className="text-center py-12">
                            No pet orders yet.
                        </div>

                    ) : (

                        pets.map(order => (

                            <div
                                key={order.order_id}
                                className="border-2 border-fifth rounded-lg p-4 mb-5 bg-emerald-600"
                            >

                                <div className="flex justify-between items-center border-b border-white/30 pb-3">

                                    <h2 className="font-semibold">
                                        Order #{order.order_id}
                                    </h2>

                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleUpdateOrder(
                                                'pet',
                                                order.order_id,
                                                e.target.value
                                            )
                                        }
                                        className="bg-second text-white border border-orange-500 rounded-md px-2 py-1"
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


                                <div className="grid tab:grid-cols-3 gap-5 mt-5">

                                    <div>

                                        {order.pet?.photo_url && (

                                            <img
                                                src={order.pet.photo_url}
                                                alt={order.pet.name}
                                                className="w-32 h-32 object-cover rounded-lg m-auto"
                                            />

                                        )}

                                    </div>


                                    <div className="tab:col-span-2">

                                        <h2 className="text-lg font-semibold">
                                            {order.pet?.name}
                                        </h2>

                                        <p>
                                            Breed: {order.pet?.breed}
                                        </p>

                                        <p>
                                            Category: {order.pet?.category}
                                        </p>

                                        <p className="text-orange-300">
                                            Price: {order.price}$
                                        </p>

                                        <p className="mt-3">
                                            Customer: {order.full_name}
                                        </p>

                                        <p>
                                            Email: {order.email}
                                        </p>

                                        <p>
                                            Payment: {order.payment_method}
                                        </p>

                                        {order.transaction_id && (

                                            <p>
                                                Transaction ID: {order.transaction_id}
                                            </p>

                                        )}

                                        <p className="mt-3">
                                            Address: {order.shipping_address}
                                        </p>

                                    </div>

                                </div>


                                <div className="flex justify-end mt-5">

                                    <button
                                        onClick={() => {
                                            setSelectedOrder({
                                                type: 'pet',
                                                order_id: order.order_id
                                            })
                                            setModalOpen(true)
                                        }}
                                        className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-md hover:bg-red-600 hover:text-white hover:border-white duration-300"
                                    >
                                        Delete Order
                                    </button>

                                </div>

                            </div>

                        ))

                    )

                )}


                {/* PRODUCT ORDERS */}

                {orderType === 'product' && (

                    products.length === 0 ? (

                        <div className="text-center py-12">
                            No product orders yet.
                        </div>

                    ) : (

                        products.map(order => (

                            <div
                                key={order.order_id}
                                className="border-2 border-fifth rounded-lg p-4 mb-5 bg-emerald-600"
                            >

                                <div className="flex justify-between items-center border-b border-white/30 pb-3">

                                    <h2 className="font-semibold">
                                        Order #{order.order_id}
                                    </h2>

                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleUpdateOrder(
                                                'product',
                                                order.order_id,
                                                e.target.value
                                            )
                                        }
                                        className="bg-second text-white border border-orange-500 rounded-md px-2 py-1"
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


                                <div className="mt-5">

                                    <p>
                                        Customer: {order.full_name}
                                    </p>

                                    <p>
                                        Email: {order.email}
                                    </p>

                                    <p>
                                        Payment: {order.payment_method}
                                    </p>

                                    {order.transaction_id && (

                                        <p>
                                            Transaction ID: {order.transaction_id}
                                        </p>

                                    )}

                                    <p>
                                        Address: {order.shipping_address}
                                    </p>


                                    <div className="mt-5 space-y-3">

                                        {order.items?.map(item => (

                                            <div
                                                key={item.order_item_id}
                                                className="flex items-center gap-4 border border-white/20 rounded-md p-3"
                                            >

                                                {item.product?.photo_url && (

                                                    <img
                                                        src={item.product.photo_url}
                                                        alt={item.product.product_name}
                                                        className="w-20 h-20 object-cover rounded-md"
                                                    />

                                                )}

                                                <div>

                                                    <h3 className="font-semibold">
                                                        {item.product?.product_name}
                                                    </h3>

                                                    <p>
                                                        Type: {item.product?.type}
                                                    </p>

                                                    <p>
                                                        Quantity: {item.quantity}
                                                    </p>

                                                    <p className="text-orange-300">
                                                        Price: {item.price}$
                                                    </p>

                                                </div>

                                            </div>

                                        ))}

                                    </div>


                                    <div className="text-right mt-5 text-lg font-semibold">

                                        Total:
                                        <span className="text-orange-300 ml-2">
                                            {Number(order.total_amount).toFixed(2)}$
                                        </span>

                                    </div>

                                </div>


                                <div className="flex justify-end mt-5">

                                    <button
                                        onClick={() => {
                                            setSelectedOrder({
                                                type: 'product',
                                                order_id: order.order_id
                                            })
                                            setModalOpen(true)
                                        }}
                                        className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-md hover:bg-red-600 hover:text-white hover:border-white duration-300"
                                    >
                                        Delete Order
                                    </button>

                                </div>

                            </div>

                        ))

                    )

                )}

            </div>


            <DeleteModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    setSelectedOrder(null)
                }}
                onConfirm={handleDelete}
            />

        </div>
    )
}

export default AdminOrders