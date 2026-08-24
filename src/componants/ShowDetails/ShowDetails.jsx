import { useContext, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContex } from "../AuthProvider/AuthProvider";
import LoadingOverlay from "../OtherPages/LoadingOverlay";


const ShowDetails = () => {

    const {
        user,
        handleDetailsData,
        detailsFetch,
        loading,
        handleCartIN,
        setCartOpen,
    } = useContext(AuthContex);

    const { type, id } = useParams();

    const nav = useNavigate();


    useEffect(() => {

        if (type && id) {
            handleDetailsData(type, id);
        }

    }, [type, id]);


    useLayoutEffect(() => {

        window.scrollTo(0, 0);

    }, []);


    // --------------------------------
    // ADD TO CART
    // --------------------------------

    const handleAddToCart = async () => {

        if (!user) {
            nav("/login");
            return;
        }

        const success = await handleCartIN(type, id);

        if (success !== false) {
            setCartOpen(true);
        }

    };


    // --------------------------------
    // LOADING
    // --------------------------------

    if (loading) {
        return <LoadingOverlay />;
    }


    if (!detailsFetch) {
        return null;
    }


    // --------------------------------
    // ITEM TYPE
    // --------------------------------

    const isPet = type === "pet";
    const isProduct = type === "product";
    const isVaccine = type === "vaccine";


    // --------------------------------
    // BASIC INFORMATION
    // --------------------------------

    const itemName =
        detailsFetch?.product_name ||
        detailsFetch?.vaccine_name ||
        detailsFetch?.name ||
        detailsFetch?.breed ||
        "Pet Details";


    const itemImage = detailsFetch?.photo_url;


    const itemDescription =
        detailsFetch?.small_description ||
        detailsFetch?.description;


    const isAvailable =
        Boolean(detailsFetch?.availability) &&
        Number(detailsFetch?.stock_quantity) > 0;


    const price = Number(detailsFetch?.price || 0).toFixed(2);


    // --------------------------------
    // ITEM LABEL
    // --------------------------------

    const itemLabel = isPet
        ? "Pet"
        : isProduct
            ? "Pet Product"
            : "Pet Vaccine";


    // --------------------------------
    // DETAILS
    // --------------------------------

    const detailItems = [];


    if (isPet) {

        detailItems.push(
            {
                label: "Breed",
                value: detailsFetch?.breed
            },
            {
                label: "Gender",
                value: detailsFetch?.gender
            },
            {
                label: "Age",
                value: detailsFetch?.age_months
                    ? `${detailsFetch.age_months} months`
                    : null
            },
            {
                label: "Size",
                value: detailsFetch?.size
            },
            {
                label: "Activity",
                value: detailsFetch?.activity_level
            },
            {
                label: "Personality",
                value: detailsFetch?.personality_traits
            }
        );

    }


    if (isProduct) {

        detailItems.push(
            {
                label: "Material",
                value: detailsFetch?.material
            },
            {
                label: "Type",
                value: detailsFetch?.type
            },
            {
                label: "Weight",
                value: detailsFetch?.weight
                    ? `${detailsFetch.weight}g`
                    : null
            }
        );

    }


    if (isVaccine) {

        detailItems.push(
            {
                label: "Vaccine Type",
                value: detailsFetch?.type
            },
            {
                label: "Pet Type",
                value: Array.isArray(detailsFetch?.pet_types)
                    ? detailsFetch.pet_types.join(", ")
                    : detailsFetch?.pet_types
            },
            {
                label: "Dose",
                value: detailsFetch?.dose
            },
            {
                label: "Dose Count",
                value: detailsFetch?.dose_count
            }
        );

    }


    return (

        <div className="font-page mt-12 mb-28">

            <div className="w-11/12 des:w-10/12 lap:max-w-6xl m-auto">


                {/* -------------------------------- */}
                {/* BREADCRUMB / ITEM TYPE */}
                {/* -------------------------------- */}

                <div className="mb-6">

                    <span
                        className="
                            inline-flex
                            items-center
                            px-4
                            py-1.5
                            rounded-full
                            bg-third
                            text-primary
                            text-sm
                            font-medium
                        "
                    >
                        {itemLabel}
                    </span>

                </div>


                {/* -------------------------------- */}
                {/* MAIN CARD */}
                {/* -------------------------------- */}

                <div
                    className="
                        bg-[#EAF7EE]
                        rounded-3xl
                        p-5
                        mob:p-7
                        tab:p-10
                        shadow-sm
                    "
                >

                    <div
                      className="space-y-4"
                    >


                        {/* -------------------------------- */}
                        {/* TITLE */}
                        {/* -------------------------------- */}

                        <div className="">

                            <h1
                                className="
                                    text-primary
                                    text-3xl
                                    mob:text-4xl
                                    tab:text-5xl
                                    lap:text-6xl
                                    font-semibold
                                "
                            >
                                {itemName}
                            </h1>

                            {itemDescription && (

                                <p
                                    className="
                                        mt-4
                                       
                                        text-primary/65
                                        text-sm
                                        tab:text-base
                                        leading-relaxed
                                        
                                    "
                                >
                                    {itemDescription}
                                </p>

                            )}

                        </div>


                        {/* -------------------------------- */}
                        {/* MAIN INFORMATION */}
                        {/* -------------------------------- */}

                        <div
                            className="
                                grid
                                grid-cols-1
                                tab:grid-cols-2
                                gap-8
                                tab:gap-12
                                p-6
                                tab:p-10
                                
                            "
                        >


                            {/* -------------------------------- */}
                            {/* IMAGE */}
                            {/* -------------------------------- */}

                            <div className="flex items-center justify-center">

                                <div
                                    className="
                                        w-full
                                        max-w-md
                                        aspect-square
                                        rounded-full
                                        bg-[#C9E9D2]
                                        
                                        flex
                                        items-center
                                        justify-center
                                        overflow-hidden
                                    "
                                >

                                    <img
                                        className="
                                            w-full
                                            h-full
                                            object-contain
                                            rounded-2xl
                                            transition-transform
                                            duration-300
                                            bg-second
                                        "
                                        src={itemImage}
                                        alt={itemName}
                                    />

                                </div>

                            </div>


                            {/* -------------------------------- */}
                            {/* DETAILS */}
                            {/* -------------------------------- */}

                            <div className="flex flex-col justify-center">


                                {/* DETAILS HEADING */}

                                <div className="mb-5">

                                    <h2
                                        className="
                                            text-primary
                                            text-xl
                                            tab:text-2xl
                                            font-semibold
                                        "
                                    >
                                        Details
                                    </h2>

                                    <div className="mt-2 w-12 h-1 rounded-full bg-third" />

                                </div>


                                {/* DETAILS GRID */}

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        mob:grid-cols-2
                                        gap-3
                                    "
                                >

                                    {detailItems
                                        .filter(item => item.value !== null && item.value !== undefined && item.value !== "")
                                        .map((item) => (

                                            <div
                                                key={item.label}
                                                className="
                                                    bg-[#EAF7EE]
                                                    rounded-xl
                                                    px-4
                                                    py-3
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-xs
                                                        text-primary/55
                                                        font-medium
                                                        mb-1
                                                    "
                                                >
                                                    {item.label}
                                                </p>

                                                <p
                                                    className="
                                                        text-sm
                                                        tab:text-base
                                                        text-primary
                                                        font-medium
                                                    "
                                                >
                                                    {item.value}
                                                </p>

                                            </div>

                                        ))
                                    }

                                </div>


                                {/* -------------------------------- */}
                                {/* STOCK */}
                                {/* -------------------------------- */}

                                <div className="mt-5">

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            bg-[#EAF7EE]
                                            rounded-xl
                                            px-4
                                            py-3
                                        "
                                    >

                                        <div>

                                            <p className="text-xs text-primary/55 font-medium">
                                                Availability
                                            </p>

                                            <p
                                                className={`
                                                    text-sm
                                                    tab:text-base
                                                    font-semibold
                                                    ${
                                                        isAvailable
                                                            ? "text-second"
                                                            : "text-red-500"
                                                    }
                                                `}
                                            >
                                                {isAvailable
                                                    ? "Available"
                                                    : "Currently Unavailable"}
                                            </p>

                                        </div>


                                        {detailsFetch?.stock_quantity !== undefined && (

                                            <div className="text-right">

                                                <p className="text-xs text-primary/55 font-medium">
                                                    In Stock
                                                </p>

                                                <p className="text-sm tab:text-base font-semibold text-primary">
                                                    {detailsFetch.stock_quantity}
                                                </p>

                                            </div>

                                        )}

                                    </div>

                                </div>


                                {/* -------------------------------- */}
                                {/* PRICE + CART */}
                                {/* -------------------------------- */}

                                <div
                                    className="
                                        mt-6
                                        pt-6
                                        border-t
                                        border-primary/10
                                        flex
                                        flex-col
                                        mob:flex-row
                                        mob:items-center
                                        mob:justify-between
                                        gap-5
                                    "
                                >

                                    {/* PRICE */}

                                    <div>

                                        <p className="text-sm text-primary/55 font-medium">
                                            Price
                                        </p>

                                        <p
                                            className="
                                                text-2xl
                                                tab:text-3xl
                                                font-semibold
                                                text-primary
                                            "
                                        >
                                            ৳{price}
                                        </p>

                                    </div>


                                    {/* ADD TO CART */}

                                    <button
                                        type="button"
                                        disabled={!isAvailable}
                                        onClick={handleAddToCart}
                                        className={`
                                            px-7
                                            py-3
                                            rounded-full
                                            font-medium
                                            text-base
                                            transition-all
                                            duration-200
                                            ${
                                                isAvailable
                                                    ? `
                                                        bg-primary
                                                        text-white
                                                        hover:bg-second
                                                        hover:-translate-y-0.5
                                                        hover:shadow-lg
                                                      `
                                                    : `
                                                        bg-gray-200
                                                        text-gray-400
                                                        cursor-not-allowed
                                                      `
                                            }
                                        `}
                                    >
                                        {isAvailable
                                            ? "Add to Cart"
                                            : "Unavailable"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default ShowDetails;