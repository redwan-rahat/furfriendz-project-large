import { useState } from "react";
import AdminOrders from "./Admin/AdminOrders";
import AdminPets from "./Admin/AdminPets";
import AdminProducts from "./Admin/AdminProducts";

const Admin = () => {

    const [adminSection, setAdminSection] = useState('orders')


    return (

        <div className="font-page mb-24">

            <div className="w-11/12 m-auto">

                <h1 className="text-2xl tab:text-4xl lap:text-5xl des:text-6xl text-center mt-6 text-primary font-semibold">
                    Admin Panel
                </h1>

                <hr className="w-11/12 m-auto my-12 border border-primary border-dashed" />


                <div className="w-11/12 des:w-10/12 bg-second text-white rounded-tl-xl rounded-br-xl lap:rounded-tl-3xl lap:rounded-br-3xl py-10 m-auto">


                    {/* ADMIN SECTION SWITCH */}

                    <div className="grid grid-cols-3 w-11/12 tab:w-10/12 lap:w-8/12 m-auto text-center text-primary font-semibold tab:text-lg lap:text-xl">

                        <button
                            onClick={() => setAdminSection('orders')}
                            className={`w-11/12 m-auto py-2 tab:py-3 rounded-md tab:rounded-lg border-2 duration-300 ${
                                adminSection === 'orders'
                                    ? 'bg-primary text-white border-white shadow-lg shadow-primary'
                                    : 'text-white border-white hover:bg-third/50'
                            }`}
                        >
                            Orders
                        </button>


                        <button
                            onClick={() => setAdminSection('pets')}
                            className={`w-11/12 m-auto py-2 tab:py-3 rounded-md tab:rounded-lg border-2 duration-300 ${
                                adminSection === 'pets'
                                    ? 'bg-primary text-white border-white shadow-lg shadow-primary'
                                    : 'text-white border-white hover:bg-third/50'
                            }`}
                        >
                            Manage Pets
                        </button>


                        <button
                            onClick={() => setAdminSection('products')}
                            className={`w-11/12 m-auto py-2 tab:py-3 rounded-md tab:rounded-lg border-2 duration-300 ${
                                adminSection === 'products'
                                    ? 'bg-primary text-white border-white shadow-lg shadow-primary'
                                    : 'text-white border-white hover:bg-third/50'
                            }`}
                        >
                            Manage Products
                        </button>

                    </div>


                    {/* SECTION */}

                    <div className="w-11/12 m-auto mt-12">

                        {adminSection === 'orders' && (
                            <AdminOrders />
                        )}

                        {adminSection === 'pets' && (
                            <AdminPets />
                        )}

                        {adminSection === 'products' && (
                            <AdminProducts />
                        )}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Admin