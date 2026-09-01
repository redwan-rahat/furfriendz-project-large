import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider";
import DeleteModal from "../../OtherPages/DeleteModal";


const AdminVaccines = () => {

    const {
        adminVaccines,
        handleGetVaccines,
        handleUpdateVaccine,
        handleDeleteVaccine,
        handleCreateVaccine,
    } = useContext(AuthContex);


    const [selectedVaccine, setSelectedVaccine] = useState(null);
    const [editingVaccine, setEditingVaccine] = useState(false);
    const [addingVaccine, setAddingVaccine] = useState(false);

    const [savingVaccine, setSavingVaccine] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [vaccineForm, setVaccineForm] = useState({});


    useEffect(() => {

        handleGetVaccines();

    }, []);



    const handleRefresh = async () => {

        setRefreshing(true);

        await handleGetVaccines();

        setRefreshing(false);
    };



    const getPetTypes = (vaccine) => {

        let petTypes = vaccine.pet_types || [];


        if (typeof petTypes === "string") {

            try {

                petTypes = JSON.parse(petTypes);

            } catch {

                petTypes = petTypes
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean);
            }
        }


        return Array.isArray(petTypes)
            ? petTypes
            : [];
    };


    const handleStartAdd = () => {

        setSelectedVaccine(null);
        setEditingVaccine(false);

        setVaccineForm({
            photo_url: "",
            vaccine_name: "",
            type: "",
            pet_types: [],
            dose_count: 1,
            price: "",
            availability: true,
            stock_quantity: 0,
            small_description: ""
        });

        setAddingVaccine(true);
    };


    const handleOpenVaccine = (vaccine) => {

        setSelectedVaccine(vaccine);
        setEditingVaccine(false);
        setAddingVaccine(false);
    };



    const handleStartEdit = () => {

        if (!selectedVaccine) return;


        setVaccineForm({
            photo_url: selectedVaccine.photo_url || "",
            vaccine_name: selectedVaccine.vaccine_name || "",
            type: selectedVaccine.type || "",
            pet_types: getPetTypes(selectedVaccine),
            dose_count: selectedVaccine.dose_count ?? 1,
            price: selectedVaccine.price ?? "",
            availability: selectedVaccine.availability ?? true,
            stock_quantity: selectedVaccine.stock_quantity ?? 0,
            small_description: selectedVaccine.small_description || ""
        });


        setEditingVaccine(true);
        setAddingVaccine(false);
    };


    const handleVaccineInputChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;


        setVaccineForm(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));
    };




    const handlePetTypesChange = (e) => {

        const petTypes = e.target.value
            .split(",")
            .map(item => item.trim())
            .filter(Boolean);


        setVaccineForm(prev => ({
            ...prev,
            pet_types: petTypes
        }));
    };




    const handleSaveVaccine = async () => {

        if (!selectedVaccine) return;


        setSavingVaccine(true);


        const updatedVaccine = {

            photo_url: vaccineForm.photo_url,

            vaccine_name: vaccineForm.vaccine_name,

            type: vaccineForm.type,

            pet_types: vaccineForm.pet_types,

            dose_count: Number(vaccineForm.dose_count),

            price: Number(vaccineForm.price),

            availability: vaccineForm.availability,

            stock_quantity: Number(vaccineForm.stock_quantity),

            small_description: vaccineForm.small_description
        };


        const updated = await handleUpdateVaccine(
            selectedVaccine.vaccine_id,
            updatedVaccine
        );


        if (updated) {

            setSelectedVaccine(updated);
            setEditingVaccine(false);
        }


        setSavingVaccine(false);
    };



    const handleCreateNewVaccine = async () => {

        setSavingVaccine(true);


        const newVaccine = {

            photo_url: vaccineForm.photo_url,

            vaccine_name: vaccineForm.vaccine_name,

            type: vaccineForm.type,

            pet_types: vaccineForm.pet_types,

            dose_count: Number(vaccineForm.dose_count),

            price: Number(vaccineForm.price),

            availability: vaccineForm.availability,

            stock_quantity: Number(vaccineForm.stock_quantity),

            small_description: vaccineForm.small_description
        };


        const created = await handleCreateVaccine(newVaccine);


        if (created) {

            setAddingVaccine(false);
            setVaccineForm({});
        }


        setSavingVaccine(false);
    };


    const handleDelete = () => {

        if (!selectedVaccine) return;

        setDeleteModalOpen(true);
    };


    const handleConfirmDelete = async () => {

        if (!selectedVaccine) return;


        setDeleteModalOpen(false);


        const success = await handleDeleteVaccine(
            selectedVaccine.vaccine_id
        );


        if (success) {

            handleCloseDrawer();
        }
    };




    const handleCloseDrawer = () => {

        setSelectedVaccine(null);
        setEditingVaccine(false);
        setAddingVaccine(false);
        setVaccineForm({});
        setDeleteModalOpen(false);
    };


    return (

        <div>


            <div className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">

                <div>

                    <h1 className="
                        text-2xl
                        md:text-3xl
                        font-semibold
                        text-slate-900
                    ">
                        Furfriendz Vaccines
                    </h1>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                    ">
                        Manage vaccines available in your store
                    </p>

                </div>


                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            text-sm
                            font-medium
                            text-slate-700
                            hover:bg-slate-50
                            transition
                            disabled:opacity-50
                        "
                    >

                        <svg
                            className={`
                                w-4
                                h-4
                                ${refreshing ? "animate-spin" : ""}
                            `}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M20 11a8 8 0 0 0-14.9-4M4 5v4h4" />
                            <path d="M4 13a8 8 0 0 0 14.9 4M20 19v-4h-4" />
                        </svg>

                        {refreshing
                            ? "Refreshing..."
                            : "Refresh"
                        }

                    </button>


                    <button
                        onClick={handleStartAdd}
                        className="
                            px-4
                            py-2.5
                            rounded-xl
                            bg-emerald-500
                            text-white
                            text-sm
                            font-medium
                            hover:bg-emerald-600
                            transition
                        "
                    >
                        + Add Vaccine
                    </button>

                </div>

            </div>



            <div className="
                mt-8
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-5
            ">

                {adminVaccines.map(vaccine => (

                    <div
                        key={vaccine.vaccine_id}
                        className="
                            bg-white
                            border
                            border-slate-200
                            rounded-2xl
                            overflow-hidden
                            hover:border-slate-300
                            transition
                        "
                    >


                        <div className="
                            aspect-[4/3]
                            bg-slate-100
                            overflow-hidden
                        ">

                            <img
                                src={vaccine.photo_url}
                                alt={vaccine.vaccine_name}
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                    transition
                                    duration-300
                                    hover:scale-105
                                "
                            />

                        </div>


                        <div className="p-4">

                            <div className="
                                flex
                                items-start
                                justify-between
                                gap-3
                            ">

                                <div className="min-w-0">

                                    <h2 className="
                                        font-semibold
                                        text-slate-900
                                    ">
                                        {vaccine.vaccine_name}
                                    </h2>

                                    <p className="
                                        text-xs
                                        text-slate-500
                                        mt-1
                                    ">
                                        {vaccine.type}
                                    </p>

                                </div>


                                <p className="
                                    font-semibold
                                    text-slate-900
                                    whitespace-nowrap
                                ">
                                    ৳{Number(vaccine.price).toFixed(0)}
                                </p>

                            </div>


                            <div className="
                                flex
                                flex-wrap
                                gap-2
                                mt-4
                            ">

                                <span className="
                                    px-2
                                    py-1
                                    rounded-md
                                    bg-slate-100
                                    text-xs
                                    text-slate-500
                                ">
                                    {vaccine.dose_count} dose
                                    {Number(vaccine.dose_count) !== 1
                                        ? "s"
                                        : ""
                                    }
                                </span>


                                <span className="
                                    px-2
                                    py-1
                                    rounded-md
                                    bg-slate-100
                                    text-xs
                                    text-slate-500
                                ">
                                    Stock: {vaccine.stock_quantity}
                                </span>

                            </div>


                            <div className="mt-3">

                                <span className={`
                                    inline-flex
                                    px-2
                                    py-1
                                    rounded-md
                                    text-xs
                                    font-medium
                                    ${
                                        vaccine.availability
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-red-50 text-red-600"
                                    }
                                `}>
                                    {vaccine.availability
                                        ? "Available"
                                        : "Unavailable"
                                    }
                                </span>

                            </div>


                            <button
                                onClick={() =>
                                    handleOpenVaccine(vaccine)
                                }
                                className="
                                    w-full
                                    mt-4
                                    px-4
                                    py-2.5
                                    rounded-xl
                                    border
                                    border-slate-200
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    hover:bg-slate-50
                                    transition
                                "
                            >
                                Manage
                            </button>

                        </div>

                    </div>

                ))}

            </div>


            {adminVaccines.length === 0 && (

                <div className="
                    mt-8
                    py-16
                    text-center
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                ">

                    <p className="text-sm text-slate-500">
                        No vaccines found.
                    </p>

                </div>

            )}



            {(selectedVaccine || addingVaccine) && (

                <div className="
                    fixed
                    inset-0
                    z-[100]
                ">



                    <div
                        onClick={handleCloseDrawer}
                        className="
                            absolute
                            inset-0
                            bg-slate-950/40
                            backdrop-blur-sm
                        "
                    />



                    <div className="
                        absolute
                        right-0
                        top-0
                        h-full
                        w-full
                        sm:w-[520px]
                        bg-white
                        shadow-2xl
                        flex
                        flex-col
                    ">


                        <div className="
                            px-5
                            md:px-6
                            py-5
                            border-b
                            border-slate-200
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <h2 className="
                                    text-xl
                                    font-semibold
                                    text-slate-900
                                ">
                                    {addingVaccine
                                        ? "Add Vaccine"
                                        : editingVaccine
                                            ? "Edit Vaccine"
                                            : selectedVaccine.vaccine_name
                                    }
                                </h2>


                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                ">
                                    {addingVaccine
                                        ? "Add a new vaccine to your store"
                                        : editingVaccine
                                            ? selectedVaccine.vaccine_name
                                            : selectedVaccine.type
                                    }
                                </p>

                            </div>


                            <button
                                onClick={handleCloseDrawer}
                                className="
                                    w-9
                                    h-9
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-slate-400
                                    hover:bg-slate-100
                                    hover:text-slate-700
                                "
                            >

                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>

                            </button>

                        </div>



                        <div className="
                            flex-1
                            overflow-y-auto
                            p-5
                            md:p-6
                        ">




                            {(addingVaccine || editingVaccine) ? (

                                <div className="space-y-5">



                                    <div>

                                        <label className="
                                            block
                                            text-xs
                                            text-slate-500
                                            mb-1.5
                                        ">
                                            Image URL
                                        </label>

                                        <input
                                            type="text"
                                            name="photo_url"
                                            value={vaccineForm.photo_url}
                                            onChange={handleVaccineInputChange}
                                            placeholder="https://i.ibb.co/..."
                                            className="
                                                w-full
                                                px-3
                                                py-2.5
                                                rounded-lg
                                                border
                                                border-slate-200
                                                text-sm
                                                outline-none
                                                focus:border-emerald-500
                                            "
                                        />

                                    </div>



                                    <div>

                                        <label className="
                                            block
                                            text-xs
                                            text-slate-500
                                            mb-1.5
                                        ">
                                            Vaccine Name
                                        </label>

                                        <input
                                            name="vaccine_name"
                                            value={vaccineForm.vaccine_name}
                                            onChange={handleVaccineInputChange}
                                            placeholder="e.g. Puppy Core Vaccine Package"
                                            className="
                                                w-full
                                                px-3
                                                py-2.5
                                                rounded-lg
                                                border
                                                border-slate-200
                                                text-sm
                                                outline-none
                                                focus:border-emerald-500
                                            "
                                        />

                                    </div>


    

                                    <div>

                                        <label className="
                                            block
                                            text-xs
                                            text-slate-500
                                            mb-1.5
                                        ">
                                            Type
                                        </label>

                                        <input
                                            name="type"
                                            value={vaccineForm.type}
                                            onChange={handleVaccineInputChange}
                                            placeholder="e.g. Core Vaccines"
                                            className="
                                                w-full
                                                px-3
                                                py-2.5
                                                rounded-lg
                                                border
                                                border-slate-200
                                                text-sm
                                                outline-none
                                                focus:border-emerald-500
                                            "
                                        />

                                    </div>


    

                                    <div>

                                        <label className="
                                            block
                                            text-xs
                                            text-slate-500
                                            mb-1.5
                                        ">
                                            Pet Types
                                        </label>

                                        <input
                                            value={
                                                Array.isArray(vaccineForm.pet_types)
                                                    ? vaccineForm.pet_types.join(", ")
                                                    : ""
                                            }
                                            onChange={handlePetTypesChange}
                                            placeholder="dog, cat"
                                            className="
                                                w-full
                                                px-3
                                                py-2.5
                                                rounded-lg
                                                border
                                                border-slate-200
                                                text-sm
                                                outline-none
                                                focus:border-emerald-500
                                            "
                                        />

                                        <p className="
                                            text-xs
                                            text-slate-400
                                            mt-1
                                        ">
                                            Separate multiple pets with commas.
                                        </p>

                                    </div>


                                    <div className="
                                        grid
                                        grid-cols-2
                                        gap-4
                                    ">

                                        <div>

                                            <label className="
                                                block
                                                text-xs
                                                text-slate-500
                                                mb-1.5
                                            ">
                                                Dose Count
                                            </label>

                                            <input
                                                type="number"
                                                name="dose_count"
                                                min="1"
                                                value={vaccineForm.dose_count}
                                                onChange={handleVaccineInputChange}
                                                className="
                                                    w-full
                                                    px-3
                                                    py-2.5
                                                    rounded-lg
                                                    border
                                                    border-slate-200
                                                    text-sm
                                                    outline-none
                                                    focus:border-emerald-500
                                                "
                                            />

                                        </div>


                                        <div>

                                            <label className="
                                                block
                                                text-xs
                                                text-slate-500
                                                mb-1.5
                                            ">
                                                Price
                                            </label>

                                            <input
                                                type="number"
                                                name="price"
                                                min="0"
                                                step="0.01"
                                                value={vaccineForm.price}
                                                onChange={handleVaccineInputChange}
                                                className="
                                                    w-full
                                                    px-3
                                                    py-2.5
                                                    rounded-lg
                                                    border
                                                    border-slate-200
                                                    text-sm
                                                    outline-none
                                                    focus:border-emerald-500
                                                "
                                            />

                                        </div>

                                    </div>




                                    <div className="
                                        grid
                                        grid-cols-2
                                        gap-4
                                    ">

                                        <div>

                                            <label className="
                                                block
                                                text-xs
                                                text-slate-500
                                                mb-1.5
                                            ">
                                                Stock Quantity
                                            </label>

                                            <input
                                                type="number"
                                                name="stock_quantity"
                                                min="0"
                                                value={vaccineForm.stock_quantity}
                                                onChange={handleVaccineInputChange}
                                                className="
                                                    w-full
                                                    px-3
                                                    py-2.5
                                                    rounded-lg
                                                    border
                                                    border-slate-200
                                                    text-sm
                                                    outline-none
                                                    focus:border-emerald-500
                                                "
                                            />

                                        </div>


                                        <div>

                                            <label className="
                                                block
                                                text-xs
                                                text-slate-500
                                                mb-1.5
                                            ">
                                                Availability
                                            </label>

                                            <select
                                                value={
                                                    vaccineForm.availability
                                                        ? "true"
                                                        : "false"
                                                }
                                                onChange={(e) =>
                                                    setVaccineForm(prev => ({
                                                        ...prev,
                                                        availability:
                                                            e.target.value === "true"
                                                    }))
                                                }
                                                className="
                                                    w-full
                                                    px-3
                                                    py-2.5
                                                    rounded-lg
                                                    border
                                                    border-slate-200
                                                    bg-white
                                                    text-sm
                                                    outline-none
                                                    focus:border-emerald-500
                                                "
                                            >

                                                <option value="true">
                                                    Available
                                                </option>

                                                <option value="false">
                                                    Unavailable
                                                </option>

                                            </select>

                                        </div>

                                    </div>


                                    <div>

                                        <label className="
                                            block
                                            text-xs
                                            text-slate-500
                                            mb-1.5
                                        ">
                                            Description
                                        </label>

                                        <textarea
                                            name="small_description"
                                            value={vaccineForm.small_description}
                                            onChange={handleVaccineInputChange}
                                            rows="5"
                                            placeholder="Write a short description..."
                                            className="
                                                w-full
                                                px-3
                                                py-2.5
                                                rounded-lg
                                                border
                                                border-slate-200
                                                text-sm
                                                outline-none
                                                resize-none
                                                focus:border-emerald-500
                                            "
                                        />

                                    </div>



                                    <div className="
                                        flex
                                        gap-3
                                        pt-3
                                    ">

                                        <button
                                            onClick={handleCloseDrawer}
                                            disabled={savingVaccine}
                                            className="
                                                flex-1
                                                px-4
                                                py-2.5
                                                rounded-xl
                                                border
                                                border-slate-200
                                                text-sm
                                                font-medium
                                                text-slate-700
                                                hover:bg-slate-50
                                                disabled:opacity-50
                                            "
                                        >
                                            Cancel
                                        </button>


                                        <button
                                            onClick={
                                                addingVaccine
                                                    ? handleCreateNewVaccine
                                                    : handleSaveVaccine
                                            }
                                            disabled={savingVaccine}
                                            className="
                                                flex-1
                                                px-4
                                                py-2.5
                                                rounded-xl
                                                bg-emerald-500
                                                text-white
                                                text-sm
                                                font-medium
                                                hover:bg-emerald-600
                                                disabled:opacity-50
                                            "
                                        >
                                            {savingVaccine
                                                ? addingVaccine
                                                    ? "Adding..."
                                                    : "Saving..."
                                                : addingVaccine
                                                    ? "Add Vaccine"
                                                    : "Save Changes"
                                            }
                                        </button>

                                    </div>

                                </div>

                            ) : (

     

                                <>

                                    <img
                                        src={selectedVaccine.photo_url}
                                        alt={selectedVaccine.vaccine_name}
                                        className="
                                            w-full
                                            aspect-[4/3]
                                            object-cover
                                            rounded-xl
                                        "
                                    />



                                    <div className="
                                        mt-6
                                        grid
                                        grid-cols-2
                                        gap-5
                                    ">

                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Price
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                            ">
                                                ৳{Number(selectedVaccine.price).toFixed(2)}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Type
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                            ">
                                                {selectedVaccine.type}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Dose Count
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                            ">
                                                {selectedVaccine.dose_count}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Stock Quantity
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                            ">
                                                {selectedVaccine.stock_quantity}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Availability
                                            </p>

                                            <p className={`
                                                text-sm
                                                font-medium
                                                mt-1
                                                ${
                                                    selectedVaccine.availability
                                                        ? "text-emerald-600"
                                                        : "text-red-600"
                                                }
                                            `}>
                                                {selectedVaccine.availability
                                                    ? "Available"
                                                    : "Unavailable"
                                                }
                                            </p>

                                        </div>

                                    </div>


                      

                                    <div className="mt-6">

                                        <p className="text-xs text-slate-400">
                                            Suitable For
                                        </p>

                                        <div className="
                                            flex
                                            flex-wrap
                                            gap-2
                                            mt-2
                                        ">

                                            {getPetTypes(selectedVaccine).map(
                                                petType => (

                                                    <span
                                                        key={petType}
                                                        className="
                                                            px-2.5
                                                            py-1
                                                            rounded-md
                                                            bg-slate-100
                                                            text-xs
                                                            text-slate-600
                                                            capitalize
                                                        "
                                                    >
                                                        {petType}
                                                    </span>

                                                )
                                            )}

                                        </div>

                                    </div>


                   

                                    <div className="mt-6">

                                        <p className="text-xs text-slate-400">
                                            Description
                                        </p>

                                        <p className="
                                            text-sm
                                            text-slate-700
                                            mt-1
                                            leading-6
                                        ">
                                            {selectedVaccine.small_description}
                                        </p>

                                    </div>


                    

                                    <div className="
                                        mt-8
                                        flex
                                        gap-3
                                    ">

                                        <button
                                            onClick={handleStartEdit}
                                            className="
                                                flex-1
                                                px-4
                                                py-2.5
                                                rounded-xl
                                                bg-emerald-500
                                                text-white
                                                text-sm
                                                font-medium
                                                hover:bg-emerald-600
                                            "
                                        >
                                            Edit Vaccine
                                        </button>


                                        <button
                                            onClick={handleDelete}
                                            className="
                                                px-4
                                                py-2.5
                                                rounded-xl
                                                border
                                                border-red-200
                                                text-red-600
                                                text-sm
                                                font-medium
                                                hover:bg-red-50
                                            "
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </>

                            )}

                        </div>

                    </div>

                </div>

            )}



            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />

        </div>
    );
};


export default AdminVaccines;