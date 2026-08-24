import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContex } from "../AuthProvider/AuthProvider";

import AdminOrders from "./Admin/AdminOrders";
import AdminPets from "./Admin/AdminPets";
import AdminProducts from "./Admin/AdminProducts";
import AdminVaccines from "./Admin/AdminVaccines";
import AdminUsers from "./Admin/AdminUsers";


const menuItems = [

    {
        id: "dashboard",
        label: "Dashboard",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        )
    },

    {
        id: "orders",
        label: "Orders",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                <path d="M8 8h8M8 12h8M8 16h5" />
            </svg>
        )
    },

    {
        id: "pets",
        label: "Pets",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <circle cx="7.5" cy="8" r="2" />
                <circle cx="16.5" cy="8" r="2" />
                <circle cx="5" cy="13" r="2" />
                <circle cx="19" cy="13" r="2" />
                <path d="M12 11c-3.2 0-5.5 2.2-5.5 5 0 2.5 2 4 5.5 4s5.5-1.5 5.5-4c0-2.8-2.3-5-5.5-5Z" />
            </svg>
        )
    },

    {
        id: "products",
        label: "Products",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <path d="M4 7h16v13H4z" />
                <path d="M8 7V5a4 4 0 0 1 8 0v2" />
            </svg>
        )
    },

    {
        id: "vaccines",
        label: "Vaccines",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <path d="m14 4 6 6" />
                <path d="m12 6 6 6" />
                <path d="m4 20 5.5-1.5L18 10l-4-4-8.5 8.5L4 20Z" />
                <path d="M7 17h.01" />
            </svg>
        )
    },

    {
        id: "users",
        label: "Users",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <circle cx="9" cy="8" r="3" />
                <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                <path d="M16 11a3 3 0 1 0 0-6" />
                <path d="M18 14c1.8.7 3 2.4 3 4.5" />
            </svg>
        )
    }

];


const Admin = () => {

    const {
        user,
        adminOrders,
        handleGetOrders,
        adminUsers,
        handleGetUsers,
        adminPets,
        handleGetPets,
        handleSignOut
    } = useContext(AuthContex);


    const [adminSection, setAdminSection] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);


    // --------------------------------
    // FETCH DASHBOARD DATA
    // --------------------------------

    useEffect(() => {

        if (adminSection === "dashboard") {

            handleGetOrders();
            handleGetUsers();
            handleGetPets();

        }

    }, [adminSection]);


    // --------------------------------
    // CURRENT USER ROLE
    // --------------------------------

    const currentAdminUser = adminUsers?.find(
        adminUser => adminUser.user_id === user?.uid
    );

    const hasDeliveryAccess =
        currentAdminUser?.is_delivery === true;


    // --------------------------------
    // DASHBOARD DATA
    // --------------------------------

    const orders = adminOrders?.orders || [];

    const totalOrders = orders.length;


    const totalRevenue = orders
        .filter(order => order.status === "completed")
        .reduce(
            (total, order) =>
                total + Number(order.total_amount || 0),
            0
        );


    const totalCustomers = adminUsers?.length || 0;


    // --------------------------------
    // RENDER SECTION
    // --------------------------------

    const renderSection = () => {

        if (adminSection === "orders") {

            return <AdminOrders />;

        }


        if (adminSection === "pets") {

            return <AdminPets />;

        }


        if (adminSection === "products") {

            return <AdminProducts />;

        }


        if (adminSection === "vaccines") {

            return <AdminVaccines />;

        }


        if (adminSection === "users") {

            return <AdminUsers />;

        }


        return (

            <div>

                {/* HEADER */}

                <div className="mb-8">

                    <p className="
                        text-sm
                        font-medium
                        text-emerald-600
                    ">
                        FURFRIENDZ ADMIN
                    </p>


                    <h1 className="
                        text-3xl
                        font-semibold
                        text-slate-900
                        mt-1
                    ">
                        Dashboard
                    </h1>


                    <p className="text-slate-500 mt-2">
                        Manage your store from one place.
                    </p>

                </div>


                {/* STATS */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-5
                ">


                    {/* TOTAL ORDERS */}

                    <div className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        p-6
                    ">

                        <p className="text-sm text-slate-500">
                            Total Orders
                        </p>


                        <h2 className="
                            text-3xl
                            font-semibold
                            text-slate-900
                            mt-3
                        ">
                            {totalOrders}
                        </h2>


                        <p className="
                            text-xs
                            text-slate-400
                            mt-2
                        ">
                            All orders placed in your store
                        </p>

                    </div>


                    {/* TOTAL REVENUE */}

                    <div className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        p-6
                    ">

                        <p className="text-sm text-slate-500">
                            Total Revenue
                        </p>


                        <h2 className="
                            text-3xl
                            font-semibold
                            text-slate-900
                            mt-3
                        ">
                            ৳{totalRevenue.toFixed(2)}
                        </h2>


                        <p className="
                            text-xs
                            text-slate-400
                            mt-2
                        ">
                            Revenue from completed orders
                        </p>

                    </div>


                    {/* CUSTOMERS */}

                    <div className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        p-6
                    ">

                        <p className="text-sm text-slate-500">
                            Customers
                        </p>


                        <h2 className="
                            text-3xl
                            font-semibold
                            text-slate-900
                            mt-3
                        ">
                            {totalCustomers}
                        </h2>


                        <p className="
                            text-xs
                            text-slate-400
                            mt-2
                        ">
                            Registered users
                        </p>

                    </div>

                </div>


                {/* ADMIN ACCOUNT */}

                <div className="
                    mt-6
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    p-6
                    min-h-[260px]
                ">

                    <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                    ">
                        Welcome
                    </h2>


                    <p className="
                        text-sm
                        text-slate-500
                        mt-2
                    ">
                        Manage your store from the administration panel.
                    </p>


                    <div className="
                        mt-6
                        p-4
                        rounded-xl
                        bg-emerald-50
                        border
                        border-emerald-100
                    ">

                        <p className="
                            text-xs
                            text-emerald-600
                            font-medium
                        ">
                            ADMIN ACCOUNT
                        </p>


                        <p className="
                            text-sm
                            text-slate-800
                            mt-1
                            break-all
                        ">
                            {user?.email || "Administrator"}
                        </p>

                    </div>

                </div>

            </div>

        );

    };


    return (

        <div className="
            min-h-screen
            bg-slate-100
            text-slate-900
        ">


            {/* ================================= */}
            {/* SIDEBAR */}
            {/* ================================= */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    h-screen
                    bg-slate-950
                    text-white
                    border-r
                    border-slate-800
                    transition-all
                    duration-300
                    w-[76px]
                    ${sidebarOpen
                        ? "md:w-[250px]"
                        : "md:w-[250px]"
                    }
                `}
            >


                {/* LOGO */}

                <div className="
                    h-[72px]
                    flex
                    items-center
                    border-b
                    border-slate-800
                    px-4
                ">

                    <button
                        onClick={() =>
                            setSidebarOpen(!sidebarOpen)
                        }
                        className="
                            w-11
                            h-11
                            rounded-xl
                            bg-emerald-500
                            flex
                            items-center
                            justify-center
                            shrink-0
                            hover:bg-emerald-400
                            transition
                        "
                    >

                        <span className="text-xl font-bold">
                            🐾
                        </span>

                    </button>


                    <div
                        className={`
                            ml-3
                            overflow-hidden
                            transition-all
                            duration-300
                            ${sidebarOpen
                                ? "w-auto opacity-100"
                                : "w-0 opacity-0"
                            }
                            md:w-auto
                            md:opacity-100
                        `}
                    >

                        <p className="
                            font-semibold
                            whitespace-nowrap
                        ">
                            Furfriendz
                        </p>


                        <p className="
                            text-xs
                            text-slate-400
                            whitespace-nowrap
                        ">
                            Admin Panel
                        </p>

                    </div>

                </div>


                {/* NAVIGATION */}

                <nav className="
                    p-3
                    mt-4
                    space-y-1
                ">

                    {menuItems.map(item => {

                        const active =
                            adminSection === item.id;


                        return (

                            <button
                                key={item.id}
                                onClick={() => {

                                    setAdminSection(item.id);
                                    setSidebarOpen(false);

                                }}
                                className={`
                                    w-full
                                    h-11
                                    flex
                                    items-center
                                    rounded-xl
                                    transition
                                    duration-200
                                    group
                                    ${active
                                        ? "bg-emerald-500 text-white"
                                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                    }
                                `}
                            >

                                <span className="
                                    w-[52px]
                                    shrink-0
                                    flex
                                    justify-center
                                ">

                                    <span className="
                                        w-5
                                        h-5
                                    ">
                                        {item.icon}
                                    </span>

                                </span>


                                <span
                                    className={`
                                        text-sm
                                        font-medium
                                        whitespace-nowrap
                                        transition-all
                                        duration-300
                                        ${sidebarOpen
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }
                                        md:opacity-100
                                    `}
                                >
                                    {item.label}
                                </span>

                            </button>

                        );

                    })}

                </nav>


                {/* ================================= */}
                {/* BOTTOM ACTIONS */}
                {/* ================================= */}

                <div className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-3
                    border-t
                    border-slate-800
                    space-y-1
                ">


                    {/* GO TO DELIVERY */}

                    {hasDeliveryAccess && (

                        <NavLink
                            to="/delivery"
                            className="
                                w-full
                                h-11
                                flex
                                items-center
                                rounded-xl
                                text-slate-400
                                hover:bg-slate-900
                                hover:text-white
                                transition
                            "
                        >

                            <span className="
                                w-[52px]
                                shrink-0
                                flex
                                justify-center
                            ">

                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M3 7h11v10H3z" />
                                    <path d="M14 10h4l3 3v4h-7z" />
                                    <circle cx="7" cy="19" r="2" />
                                    <circle cx="18" cy="19" r="2" />
                                </svg>

                            </span>


                            <span
                                className={`
                                    text-sm
                                    whitespace-nowrap
                                    transition-all
                                    duration-300
                                    ${sidebarOpen
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }
                                    md:opacity-100
                                `}
                            >
                                Go to Delivery
                            </span>

                        </NavLink>

                    )}


                    {/* GO TO WEBSITE */}

                    <NavLink
                        to="/"
                        className="
                            w-full
                            h-11
                            flex
                            items-center
                            rounded-xl
                            text-slate-400
                            hover:bg-slate-900
                            hover:text-white
                            transition
                        "
                    >

                        <span className="
                            w-[52px]
                            shrink-0
                            flex
                            justify-center
                        ">

                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path d="M15 3h6v6" />
                                <path d="M10 14 21 3" />
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            </svg>

                        </span>


                        <span
                            className={`
                                text-sm
                                whitespace-nowrap
                                transition-all
                                duration-300
                                ${sidebarOpen
                                    ? "opacity-100"
                                    : "opacity-0"
                                }
                                md:opacity-100
                            `}
                        >
                            Go to Website
                        </span>

                    </NavLink>


                    {/* LOGOUT */}

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="
                            w-full
                            h-11
                            flex
                            items-center
                            rounded-xl
                            text-slate-400
                            hover:bg-red-500/10
                            hover:text-red-400
                            transition
                        "
                    >

                        <span className="
                            w-[52px]
                            shrink-0
                            flex
                            justify-center
                        ">

                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path d="M10 17l5-5-5-5" />
                                <path d="M15 12H3" />
                                <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
                            </svg>

                        </span>


                        <span
                            className={`
                                text-sm
                                whitespace-nowrap
                                transition-all
                                duration-300
                                ${sidebarOpen
                                    ? "opacity-100"
                                    : "opacity-0"
                                }
                                md:opacity-100
                            `}
                        >
                            Logout
                        </span>

                    </button>

                </div>

            </aside>


            {/* ================================= */}
            {/* MAIN CONTENT */}
            {/* ================================= */}

            <main
                className="
                    ml-[76px]
                    md:ml-[250px]
                    min-h-screen
                    transition-all
                    duration-300
                "
            >


                {/* TOP BAR */}

                <header className="
                    h-[72px]
                    bg-white
                    border-b
                    border-slate-200
                    flex
                    items-center
                    justify-between
                    px-5
                    md:px-8
                ">


                    <div className="
                        flex
                        items-center
                        gap-3
                    ">


                        {/* MOBILE MENU */}

                        <button
                            onClick={() =>
                                setSidebarOpen(!sidebarOpen)
                            }
                            className="
                                md:hidden
                                w-10
                                h-10
                                rounded-lg
                                hover:bg-slate-100
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                        </button>


                        <div>

                            <p className="
                                text-xs
                                text-slate-400
                            ">
                                Administration
                            </p>


                            <p className="
                                font-semibold
                                text-slate-800
                            ">
                                {
                                    menuItems.find(
                                        item =>
                                            item.id === adminSection
                                    )?.label || "Dashboard"
                                }
                            </p>

                        </div>

                    </div>


                    {/* ADMIN PROFILE */}

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <div className="
                            hidden
                            sm:block
                            text-right
                        ">

                            <p className="
                                text-sm
                                font-medium
                                text-slate-800
                            ">
                                Admin
                            </p>


                            <p className="
                                text-xs
                                text-slate-400
                            ">
                                Administrator
                            </p>

                        </div>


                        <div className="
                            w-10
                            h-10
                            rounded-full
                            bg-emerald-100
                            text-emerald-700
                            flex
                            items-center
                            justify-center
                            font-semibold
                        ">
                            A
                        </div>

                    </div>

                </header>


                {/* PAGE */}

                <section className="
                    p-5
                    md:p-8
                ">

                    {renderSection()}

                </section>

            </main>

        </div>

    );

};


export default Admin;