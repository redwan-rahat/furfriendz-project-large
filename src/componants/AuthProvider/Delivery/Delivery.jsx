import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContex } from "../AuthProvider";
import DeliveryOrder from "./DeliveryOrder";


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
    }

];


const Delivery = () => {

    const {
        user,
        adminOrders,
        adminUsers,
        handleSignOut,
        handleGetOrders,
        handleGetUsers
    } = useContext(AuthContex);


    const [deliverySection, setDeliverySection] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);


    useEffect(() => {

        handleGetOrders();
        handleGetUsers();

    }, []);


    const orders = adminOrders?.orders || [];


    const assignedOrders = orders.filter(
        order => order.delivered_by === user?.uid
    );


    const deliveryPending = assignedOrders.filter(
        order => order.status === "confirmed"
    ).length;


    const completedOrders = assignedOrders.filter(
        order => order.status === "completed"
    ).length;


    const totalAssigned = assignedOrders.length;


    // --------------------------------
    // CURRENT USER ROLE
    // --------------------------------

    const currentUser = adminUsers?.find(
        adminUser => adminUser.user_id === user?.uid
    );


    const hasAdminAccess =
        currentUser?.is_admin === true;


    const renderSection = () => {

        if (deliverySection === "orders") {

            return <DeliveryOrder />;

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
                        FURFRIENDZ DELIVERY
                    </p>


                    <h1 className="
                        text-3xl
                        font-semibold
                        text-slate-900
                        mt-1
                    ">
                        Delivery Dashboard
                    </h1>


                    <p className="text-slate-500 mt-2">
                        Manage your assigned deliveries.
                    </p>

                </div>


                {/* STATS */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-5
                ">

                    {/* DELIVERY PENDING */}

                    <div className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        p-6
                    ">

                        <p className="text-sm text-slate-500">
                            Delivery Pending
                        </p>


                        <h2 className="
                            text-3xl
                            font-semibold
                            text-slate-900
                            mt-3
                        ">
                            {deliveryPending}
                        </h2>


                        <p className="
                            text-xs
                            text-slate-400
                            mt-2
                        ">
                            Confirmed orders waiting for delivery
                        </p>

                    </div>


                    {/* COMPLETED */}

                    <div className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        p-6
                    ">

                        <p className="text-sm text-slate-500">
                            Completed
                        </p>


                        <h2 className="
                            text-3xl
                            font-semibold
                            text-slate-900
                            mt-3
                        ">
                            {completedOrders}
                        </h2>


                        <p className="
                            text-xs
                            text-slate-400
                            mt-2
                        ">
                            Successfully delivered orders
                        </p>

                    </div>


                    {/* TOTAL ASSIGNED */}

                    <div className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        p-6
                    ">

                        <p className="text-sm text-slate-500">
                            Total Assigned
                        </p>


                        <h2 className="
                            text-3xl
                            font-semibold
                            text-slate-900
                            mt-3
                        ">
                            {totalAssigned}
                        </h2>


                        <p className="
                            text-xs
                            text-slate-400
                            mt-2
                        ">
                            Orders assigned to you
                        </p>

                    </div>

                </div>


                {/* QUICK INFO */}

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
                        Your assigned orders will appear in the Orders section.
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
                            DELIVERY ACCOUNT
                        </p>


                        <p className="
                            text-sm
                            text-slate-800
                            mt-1
                            break-all
                        ">
                            {user?.email || "Delivery user"}
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
                className="
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
                    md:w-[250px]
                "
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
                            Delivery Panel
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
                            deliverySection === item.id;


                        return (

                            <button
                                key={item.id}
                                onClick={() => {

                                    setDeliverySection(item.id);
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

                                    <span className="w-5 h-5">
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


                {/* BOTTOM */}

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


                    {/* GO TO ADMIN PANEL */}

                    {hasAdminAccess && (

                        <NavLink
                            to="/admin"
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
                                    <rect
                                        x="3"
                                        y="4"
                                        width="18"
                                        height="16"
                                        rx="2"
                                    />
                                    <path d="M8 8h8M8 12h5M8 16h3" />
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
                                Go to Admin Panel
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


            {/* MAIN */}

            <main className="
                ml-[76px]
                md:ml-[250px]
                min-h-screen
            ">


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
                                Delivery
                            </p>


                            <p className="
                                font-semibold
                                text-slate-800
                            ">
                                {
                                    menuItems.find(
                                        item =>
                                            item.id === deliverySection
                                    )?.label || "Dashboard"
                                }
                            </p>

                        </div>

                    </div>


                    {/* PROFILE */}

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
                                Delivery
                            </p>


                            <p className="
                                text-xs
                                text-slate-400
                            ">
                                Delivery Personnel
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
                            {user?.displayName?.charAt(0)?.toUpperCase() || "D"}
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


export default Delivery;