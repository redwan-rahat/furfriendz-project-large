import { NavLink } from "react-router-dom";
import DogSitting from "../Animations/DogSitting";

const ShowPetsandProducts = ({ fetchedData = [] }) => {

    return (

        <div className="h-auto w-full">

            <div className="relative m-auto">

                <div
                    className="
                        py-12
                        grid
                        grid-cols-2
                        tab:grid-cols-3
                        lap:grid-cols-4
                        des:grid-cols-5
                        gap-y-10
                        gap-x-4
                        w-11/12
                        m-auto
                        text-black
                    "
                    data-aos="fade-up"
                >

                    {fetchedData.length === 0 ? (

                        <div className="col-span-full flex flex-col items-center justify-center py-12">

                            <div className="w-64 tab:w-80">
                                <DogSitting />
                            </div>

                            <h1 className="text-2xl tab:text-3xl font-medium text-primary text-center">
                                No Data Found
                            </h1>

                        </div>

                    ) : (

                        fetchedData.map((data) => {

                            const isPet = Boolean(data?.pet_id);
                            const isVaccine = Boolean(data?.vaccine_id);

                            const itemId = isPet
                                ? data.pet_id
                                : isVaccine
                                    ? data.vaccine_id
                                    : data.product_id;

                            const itemType = isPet
                                ? "pet"
                                : isVaccine
                                    ? "vaccine"
                                    : "product";

                            const itemName = isPet
                                ? data.breed
                                : isVaccine
                                    ? data.vaccine_name
                                    : data.product_name;


                            return (

                                <NavLink
                                    key={`${itemType}-${itemId}`}
                                    to={`/details/${itemType}/${itemId}`}
                                    className="group text-center"
                                >

                                    <div className="space-y-4">

                                        {/* Image */}

                                        <div
                                            className="
                                                border-2
                                                border-second
                                                border-opacity-70
                                                w-24
                                                h-24
                                                tab:w-28
                                                tab:h-28
                                                lap:w-36
                                                lap:h-36
                                                des:w-48
                                                des:h-48
                                                m-auto
                                                rounded-full
                                                p-1
                                                transition-all
                                                duration-300
                                                group-hover:border-primary
                                                group-hover:scale-[1.03]
                                            "
                                        >

                                            <div
                                                className="
                                                    w-full
                                                    h-full
                                                    rounded-full
                                                    overflow-hidden
                                                    bg-second
                                                    transition-colors
                                                    duration-300
                                                    group-hover:bg-third
                                                "
                                            >

                                                <img
                                                    className="
                                                        w-full
                                                        h-full
                                                        object-cover
                                                        transition-transform
                                                        duration-300
                                                        group-hover:scale-105
                                                    "
                                                    src={data?.photo_url}
                                                    alt={itemName || "Pet"}
                                                />

                                            </div>

                                        </div>


                                        {/* Name */}

                                        <h1
                                            className="
                                                text-primary
                                                font-medium
                                                text-sm
                                                tab:text-base
                                                transition-colors
                                                duration-200
                                                group-hover:text-second
                                            "
                                        >
                                            {itemName}
                                        </h1>

                                    </div>

                                </NavLink>

                            );

                        })

                    )}

                </div>

            </div>

        </div>
    );
};

export default ShowPetsandProducts;