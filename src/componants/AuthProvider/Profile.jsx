import { useContext, useEffect, useState } from "react";
import { AuthContex } from "./AuthProvider";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const Profile = () => {

    const {
        user,
        totalCart,
        myOrders,
        handleTotalCarts,
        handleGetMyOrders,
        getUserData
    } = useContext(AuthContex);

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadProfileData = async () => {

            if (!user) return;

            setLoading(true);

            const [supabaseUser] = await Promise.all([
                getUserData(),
                handleTotalCarts(),
                handleGetMyOrders()
            ]);

            setUserData(supabaseUser);

            setLoading(false);
        };

        loadProfileData();

    }, [user]);


    if (!user) {
        return null;
    }


    if (loading) {
        return (
            <div className="
                min-h-[60vh]
                flex
                items-center
                justify-center
                font-page
            ">
                <div className="text-primary font-medium">
                    Loading profile...
                </div>
            </div>
        );
    }


    const profileImage =
        user?.providerData?.[0]?.photoURL ||
        user?.photoURL;


    return (

        <div className="pb-20 font-page">

            <div className="
                w-11/12
                tab:w-4/5
                lap:w-3/5
                des:w-2/5
                m-auto
                mt-8
                tab:mt-20
                bg-[#EAF7EE]
                rounded-2xl
                overflow-hidden
                shadow-[0_10px_30px_rgba(0,103,105,0.10)]
            ">

                {/* Header */}

                <div className="
                    bg-second
                    text-white
                    px-6
                    tab:px-10
                    py-10
                    tab:py-12
                ">

                    <h1 className="
                        font-semibold
                        text-center
                        text-3xl
                        tab:text-5xl
                    ">
                        Your Info
                    </h1>


                    {/* Profile Image */}

                    <div className="
                        flex
                        justify-center
                        mt-8
                    ">

                        {profileImage ? (

                            <img
                                src={profileImage}
                                className="
                                    rounded-full
                                    w-28
                                    h-28
                                    tab:w-40
                                    tab:h-40
                                    object-cover
                                    border-4
                                    border-white/80
                                    shadow-[0_8px_20px_rgba(0,0,0,0.12)]
                                "
                                alt="Profile"
                            />

                        ) : (

                            <div className="
                                rounded-full
                                w-28
                                h-28
                                tab:w-40
                                tab:h-40
                                flex
                                items-center
                                justify-center
                                bg-white
                                text-primary
                            ">
                                <Icon
                                    icon="healthicons:ui-user-profile"
                                    className="
                                        text-[110px]
                                        tab:text-[150px]
                                    "
                                />
                            </div>

                        )}

                    </div>

                </div>


                {/* Information */}

                <div className="
                    px-6
                    py-8
                    tab:px-10
                    tab:py-10
                    space-y-6
                ">


                    {/* Name */}

                    <div className="
                        flex
                        flex-col
                        tab:flex-row
                        tab:items-center
                        tab:justify-between
                        gap-2
                        tab:gap-6
                    ">

                        <h2 className="
                            text-primary
                            font-medium
                            tab:w-2/5
                        ">
                            Name
                        </h2>

                        <div className="
                            flex
                            items-center
                            w-full
                            tab:w-3/5
                        ">

                            <span className="
                                hidden
                                tab:block
                                text-primary
                                mr-2
                            ">
                                :
                            </span>

                            <div className="
                                w-full
                                bg-white
                                rounded-md
                                px-3
                                py-2
                                text-primary
                                font-medium
                                shadow-sm
                            ">
                                {userData?.full_name ||
                                    user?.displayName ||
                                    "Pet Parent"}
                            </div>

                        </div>

                    </div>


                    {/* Email */}

                    <div className="
                        flex
                        flex-col
                        tab:flex-row
                        tab:items-center
                        tab:justify-between
                        gap-2
                        tab:gap-6
                    ">

                        <h2 className="
                            text-primary
                            font-medium
                            tab:w-2/5
                        ">
                            Email
                        </h2>

                        <div className="
                            flex
                            items-center
                            w-full
                            tab:w-3/5
                        ">

                            <span className="
                                hidden
                                tab:block
                                text-primary
                                mr-2
                            ">
                                :
                            </span>

                            <div className="
                                w-full
                                bg-white
                                rounded-md
                                px-3
                                py-2
                                text-primary
                                font-medium
                                shadow-sm
                                break-all
                            ">
                                {user?.email}
                            </div>

                        </div>

                    </div>


                    {/* Account Type */}

                    {/* <div className="
                        flex
                        flex-col
                        tab:flex-row
                        tab:items-center
                        tab:justify-between
                        gap-2
                        tab:gap-6
                    ">

                        <h2 className="
                            text-primary
                            font-medium
                            tab:w-2/5
                        ">
                            Account Type
                        </h2>

                        <div className="
                            flex
                            items-center
                            w-full
                            tab:w-3/5
                        ">

                            <span className="
                                hidden
                                tab:block
                                text-primary
                                mr-2
                            ">
                                :
                            </span>

                            <div className="
                                w-full
                                bg-white
                                rounded-md
                                px-3
                                py-2
                                text-primary
                                font-medium
                                shadow-sm
                            ">
                                Free
                            </div>

                        </div>

                    </div> */}


                    {/* Items In Cart */}

                    <div className="
                        flex
                        flex-col
                        tab:flex-row
                        tab:items-center
                        tab:justify-between
                        gap-2
                        tab:gap-6
                    ">

                        <h2 className="
                            text-primary
                            font-medium
                            tab:w-2/5
                        ">
                            Items In Cart
                        </h2>

                        <div className="
                            flex
                            items-center
                            w-full
                            tab:w-3/5
                        ">

                            <span className="
                                hidden
                                tab:block
                                text-primary
                                mr-2
                            ">
                                :
                            </span>

                            <div className="
                                w-full
                                bg-white
                                rounded-md
                                px-3
                                py-2
                                text-primary
                                font-medium
                                shadow-sm
                            ">
                                {totalCart || 0}
                            </div>

                        </div>

                    </div>


                    {/* Total Orders */}

                    <div className="
                        flex
                        flex-col
                        tab:flex-row
                        tab:items-center
                        tab:justify-between
                        gap-2
                        tab:gap-6
                    ">

                        <h2 className="
                            text-primary
                            font-medium
                            tab:w-2/5
                        ">
                            Total Orders
                        </h2>

                        <div className="
                            flex
                            items-center
                            w-full
                            tab:w-3/5
                        ">

                            <span className="
                                hidden
                                tab:block
                                text-primary
                                mr-2
                            ">
                                :
                            </span>

                            <NavLink
                                to="/myorders"
                                className="
                                    w-full
                                    bg-white
                                    rounded-md
                                    px-3
                                    py-2
                                    text-primary
                                    font-medium
                                    shadow-sm
                                    hover:bg-fifth
                                    transition-colors
                                "
                            >
                                {myOrders?.length || 0}
                            </NavLink>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;