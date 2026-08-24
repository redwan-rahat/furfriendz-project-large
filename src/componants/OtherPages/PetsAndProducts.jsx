import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import ShowPetsandProducts from "./ShowPetsandProducts";
import DogWalking2 from "../Animations/DogWalking2";

const PetsAndProducts = () => {

    const {
        handleFetch,
        fetchedData
    } = useContext(AuthContex);

    const [searchCategory, setSearchCategory] = useState("cat");
    const [getdata, setGetdata] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loadSearch, setLoadSearch] = useState(false);


    useEffect(() => {

        setSearchQuery("");
        setLoadSearch(true);

        handleFetch(searchCategory);

    }, [searchCategory]);


    useEffect(() => {

        if (fetchedData) {
            setGetdata(fetchedData);
            setLoadSearch(false);
        }

    }, [fetchedData]);


    const handleSearch = (e) => {

        const query = e.target.value.toLowerCase();

        setSearchQuery(query);

        if (!query) {
            setGetdata(fetchedData || []);
            return;
        }

        const filteredData = (fetchedData || []).filter((item) => {

            if (searchCategory === "products") {

                return item?.product_name
                    ?.toLowerCase()
                    .includes(query);

            }

            if (searchCategory === "vaccine") {

                return item?.vaccine_name
                    ?.toLowerCase()
                    .includes(query);

            }

            return item?.breed
                ?.toLowerCase()
                .includes(query);
        });

        setGetdata(filteredData);
    };


    const handleCategoryChange = (category) => {
        setSearchCategory(category);
    };


    const categories = [
        {
            id: "cat",
            name: "Cats",
            image: "https://i.ibb.co.com/XCTCMFC/Bengal-kitten.webp"
        },
        {
            id: "dog",
            name: "Dogs",
            image: "https://i.ibb.co.com/3dy1rQv/Beagle.webp"
        },
        {
            id: "bird",
            name: "Birds",
            image: "https://i.ibb.co.com/Q6Mq1Qb/Amazon-Parrot.webp"
        },
        {
            id: "products",
            name: "Items",
            image: "https://i.ibb.co.com/sVnbHn2/Pet-collar.webp"
        }
    ];


    return (

        <div className="mt-12 font-page">

            {/* Heading */}

            <div className="mb-20 w-10/12 tab:w-8/12 lap:w-9/12 des:w-11/12 m-auto">

                <h1 className="text-center font-semibold text-xl mob:text-2xl tab:text-5xl lap:text-6xl text-primary">
                    Find Your Desired Pet or Product
                </h1>

            </div>


            {/* Search + Categories */}

            <div className="w-11/12 bg-[#DEF2E3] rounded-t-2xl p-14 m-auto">

                <div className="w-11/12 m-auto flex flex-wrap gap-8 items-center">


                    {/* Search */}

                    <div className="w-[280px] my-auto">

                        <input
                            type="text"
                            name="search"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="
                                w-full
                                px-4
                                h-12
                                text-primary
                                placeholder:text-primary/50
                                font-medium
                                bg-white
                                border-2
                                border-transparent
                                rounded-md
                                focus:outline-none
                                focus:border-primary
                                transition-all
                            "
                            placeholder="Search..."
                        />

                    </div>


                    {/* Categories */}

                    <div className="flex gap-8 flex-wrap">

                        {categories.map((category) => {

                            const isActive =
                                searchCategory === category.id;

                            return (

                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() =>
                                        handleCategoryChange(category.id)
                                    }
                                    className={`
                                        rounded-full
                                        flex
                                        items-center
                                        border-2
                                        px-2
                                        py-2
                                        pr-6
                                        space-x-2
                                        mob:space-x-3
                                        tab:space-x-4
                                        cursor-pointer
                                        transition-all
                                        duration-200

                                        ${
                                            isActive
                                                ? `
                                                    bg-white
                                                    text-primary
                                                    border-primary
                                                    shadow-[0_8px_18px_rgba(0,103,105,0.22)]
                                                    -translate-y-0.5
                                                  `
                                                : `
                                                    text-white
                                                    bg-primary
                                                    border-primary
                                                    hover:bg-white
                                                    hover:text-primary
                                                    hover:shadow-[0_6px_14px_rgba(0,103,105,0.16)]
                                                  `
                                        }
                                    `}
                                >

                                    <img
                                        className="
                                            w-12
                                            h-12
                                            tab:w-14
                                            tab:h-14
                                            bg-second
                                            rounded-full
                                            object-cover
                                            flex-shrink-0
                                        "
                                        src={category.image}
                                        alt=""
                                    />

                                    <span className="font-medium text-sm mob:text-base lap:text-xl des:text-2xl">
                                        {category.name}
                                    </span>

                                </button>

                            );

                        })}


                        {/* Vaccine */}

                        <button
                            type="button"
                            onClick={() =>
                                handleCategoryChange("vaccine")
                            }
                            className={`
                                rounded-full
                                flex
                                items-center
                                border-2
                                px-2
                                py-2
                                pr-6
                                space-x-2
                                mob:space-x-3
                                tab:space-x-4
                                cursor-pointer
                                transition-all
                                duration-200

                                ${
                                    searchCategory === "vaccine"
                                        ? `
                                            bg-white
                                            text-primary
                                            border-primary
                                            shadow-[0_8px_18px_rgba(0,103,105,0.22)]
                                            -translate-y-0.5
                                          `
                                        : `
                                            text-white
                                            bg-primary
                                            border-primary
                                            hover:bg-white
                                            hover:text-primary
                                            hover:shadow-[0_6px_14px_rgba(0,103,105,0.16)]
                                          `
                                }
                            `}
                        >

                            <div
                                className="
                                    w-12
                                    h-12
                                    tab:w-14
                                    tab:h-14
                                    bg-second
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    text-2xl
                                    tab:text-3xl
                                    flex-shrink-0
                                "
                            >
                                💉
                            </div>

                            <span className="font-medium text-sm mob:text-base lap:text-xl des:text-2xl">
                                Vaccines
                            </span>

                        </button>

                    </div>

                </div>

            </div>


            {/* Results */}

            <div className="w-11/12 m-auto mb-20 rounded-b-2xl bg-[#EAF7EE]">

                {loadSearch ? (

                    <div className="w-64 mob:w-72 m-auto py-12">
                        <DogWalking2 />
                    </div>

                ) : (

                    <ShowPetsandProducts
                        fetchedData={getdata}
                    />

                )}

            </div>

        </div>
    );
};

export default PetsAndProducts;