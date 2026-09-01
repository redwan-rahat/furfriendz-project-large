import { BsCart4 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navbar = () => {

    const {
        pageload,
        user,
        handleSignOut,
        handleTotalCarts,
        totalCart,
        setCartOpen,
        handleCheckAdmin,
        handleCheckDelivery
    } = useContext(AuthContex);


    const [menuOpen, setMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDelivery, setIsDelivery] = useState(false);

    const menuRef = useRef(null);




    useEffect(() => {

        let mounted = true;


        const checkRoles = async () => {

            if (!user) {

                if (mounted) {
                    setIsAdmin(false);
                    setIsDelivery(false);
                }

                return;
            }


            const [adminStatus, deliveryStatus] = await Promise.all([
                handleCheckAdmin(),
                handleCheckDelivery()
            ]);


            if (mounted) {

                setIsAdmin(adminStatus);
                setIsDelivery(deliveryStatus);

            }
        };


        checkRoles();


        return () => {
            mounted = false;
        };

    }, [user, handleCheckAdmin, handleCheckDelivery]);




    useEffect(() => {

        const handleClickOutside = (e) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }

        };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);




    useEffect(() => {

        if (user) {
            handleTotalCarts();
        }

    }, [user]);



    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };



    const middlelinks = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "linkactive duration-200 ease-out"
                        : "hover:text-primary duration-300"
                }
            >
                <li className="mt-1 tab:mt-4">
                    Home
                </li>
            </NavLink>


            <NavLink
                to="/shop"
                className={({ isActive }) =>
                    isActive
                        ? "linkactive duration-200 ease-out"
                        : "hover:text-primary duration-300"
                }
            >
                <li className="mt-1 tab:mt-4">
                    Furr Shop
                </li>
            </NavLink>


            <NavLink
                to="/blog"
                className={({ isActive }) =>
                    isActive
                        ? "linkactive duration-200 ease-out"
                        : "hover:text-primary duration-300"
                }
            >
                <li className="mt-1 tab:mt-4">
                    Blog
                </li>
            </NavLink>


            <NavLink
                to="/contactus"
                className={({ isActive }) =>
                    isActive
                        ? "linkactive duration-200 ease-out"
                        : "hover:text-primary duration-300"
                }
            >
                <li className="mt-1 tab:mt-4">
                    Contact Us
                </li>
            </NavLink>



            {user && (

                <NavLink
                    to="/myorders"
                    className={({ isActive }) =>
                        isActive
                            ? "linkactive duration-200 ease-out"
                            : "hover:text-primary duration-300"
                    }
                >
                    <li className="mt-1 tab:mt-4">
                        My Orders
                    </li>
                </NavLink>

            )}




            {user && isAdmin && (

                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        isActive
                            ? "linkactive duration-200 ease-out"
                            : "hover:text-primary duration-300"
                    }
                >
                    <li className="mt-1 tab:mt-4">
                        Admin
                    </li>
                </NavLink>

            )}




            {user && isDelivery && (

                <NavLink
                    to="/delivery"
                    className={({ isActive }) =>
                        isActive
                            ? "linkactive duration-200 ease-out"
                            : "hover:text-primary duration-300"
                    }
                >
                    <li className="mt-1 tab:mt-4">
                        Delivery
                    </li>
                </NavLink>

            )}
        </>
    );




    const lastlinks = (
        <>



            {user && (

                <NavLink
                    to="/profile"
                    className={"text-second hover:text-primary duration-300"}
                >
                    <li className="mt-1 tab:mt-4 font-medium">
                        Profile
                    </li>
                </NavLink>

            )}




            {user ? (

                <button
                    type="button"
                    onClick={handleSignOut}
                    className="
    block
    lap:inline
    mt-1
    tab:mt-4
    font-medium
    text-second
    hover:text-primary
    duration-300
"
                >
                    Sign Out
                </button>

            ) : (

                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        isActive
                            ? "linkactive duration-200 ease-out"
                            : "hover:text-primary duration-300"
                    }
                >
                    <li className="mt-1 tab:mt-4 font-medium">
                        Login
                    </li>
                </NavLink>

            )}




            {user && (

                <button
                    type="button"
                    onClick={() => setCartOpen(true)}
                    className="
    block
    lap:inline
    text-second
    hover:text-primary
    duration-300
"
                >

                    <li className="mt-1 tab:mt-4 text-xl flex items-center">

                        <BsCart4 />

                        <span
                            className="
                            ml-1
                            lap:text-sm
                            text-xs
                            bg-orange-500
                            text-white
                            flex
                            items-center
                            justify-center
                            rounded-full
                            w-5
                            h-5
                            lap:w-6
                            lap:h-6
                            font-medium
                        "
                        >
                            {totalCart || 0}
                        </span>

                    </li>

                </button>

            )}

        </>
    );


    return (

        <div
            className={`
                font-page
                ${pageload ? "hidden" : "flex"}
                z-10
                lap:w-11/12
                m-auto
            `}
        >




            <div
                className="
                    justify-between
                    lap:text-sm
                    des:text-[16px]
                    w-full
                    hidden
                    lap:flex
                    items-center
                "
            >




                <NavLink to="/">

                    <div className="w-36 h-36 hover:cursor-pointer">

                        <img
                            src="https://i.ibb.co.com/84VQ3Vs/Logo-5.webp"
                            alt="FurFriendz"
                        />

                    </div>

                </NavLink>




                <div>

                    <ul className="flex space-x-10 text-second font-medium">

                        {middlelinks}

                    </ul>

                </div>



                <div>

                    <ul className="flex space-x-6 items-center">

                        {lastlinks}

                    </ul>

                </div>

            </div>




            <div
                className="
                    flex
                    tab:flex
                    relative
                    w-full
                    justify-between
                    lap:hidden
                "
            >



                <div className="items-center flex text-xl tab:text-2xl">

                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="
                            text-primary
                            left-6
                            absolute
                            z-20
                        "
                    >

                        {menuOpen ? (

                            <Icon icon="line-md:menu-to-close-alt-transition" />

                        ) : (

                            <Icon icon="line-md:close-to-menu-alt-transition" />

                        )}

                    </button>




                    <div
                        ref={menuRef}
                        className={`
                            absolute
                            top-24
                            tab:top-32
                            text-[10px]
                            mob:text-[12px]
                            tab:text-sm
                            bg-fifth
                            rounded-r-xl
                            shadow-[6px_8px_20px_rgba(0,103,105,0.12)]
                            transform
                            transition-transform
                            duration-200
                            z-10
                            ${menuOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                            }
                        `}
                    >

                        <div
                            className="
                                list-none
                                mx-6
                                tab:mx-10
                                text-second
                                font-medium
                                py-5
                                space-y-1
                            "
                        >

                            {middlelinks}

                            <div className="pt-2 border-t border-primary/10 mt-3">

                                {lastlinks}

                            </div>

                        </div>

                    </div>

                </div>



                <NavLink to="/">

                    <div className="m-auto">

                        <div className="tab:w-32 tab:h-32 w-24 h-24">

                            <img
                                src="https://i.ibb.co.com/84VQ3Vs/Logo-5.webp"
                                alt="FurFriendz"
                            />

                        </div>

                    </div>

                </NavLink>


            </div>

        </div>
    );
};

export default Navbar;