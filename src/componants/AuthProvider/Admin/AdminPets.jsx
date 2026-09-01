import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider";
import DeleteModal from "../../OtherPages/DeleteModal";


const AdminPets = () => {

    const {
        adminPets,
        handleGetPets,
        handleUpdatePet,
        handleDeletePet,
        handleCreatePet,
    } = useContext(AuthContex);


    const [selectedPet, setSelectedPet] = useState(null);
    const [editingPet, setEditingPet] = useState(false);
    const [addingPet, setAddingPet] = useState(false);
    const [savingPet, setSavingPet] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [petForm, setPetForm] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);


    useEffect(() => {

        handleGetPets();

    }, []);


    const handleRefresh = async () => {

        setRefreshing(true);

        await handleGetPets();

        setRefreshing(false);
    };


    const handleStartAdd = () => {

        setSelectedPet(null);
        setEditingPet(false);

        setPetForm({
            photo_url: "",
            breed: "",
            category: "cat",
            price: "",
            gender: "male",
            age_months: "",
            size: "medium",
            activity_level: "moderate",
            living_environment: "",
            child_friendly: false,
            pet_friendly: false,
            personality_traits: "",
            small_description: "",
            availability: true,
            stock_quantity: 0
        });

        setAddingPet(true);
    };


    const handleStartEdit = () => {

        if (!selectedPet) return;


        setPetForm({
            photo_url: selectedPet.photo_url || "",
            breed: selectedPet.breed || "",
            category: selectedPet.category || "",
            price: selectedPet.price ?? "",
            gender: selectedPet.gender || "",
            age_months: selectedPet.age_months ?? "",
            size: selectedPet.size || "",
            activity_level: selectedPet.activity_level || "",
            living_environment: selectedPet.living_environment || "",
            child_friendly: selectedPet.child_friendly ?? false,
            pet_friendly: selectedPet.pet_friendly ?? false,
            personality_traits: selectedPet.personality_traits || "",
            small_description: selectedPet.small_description || "",
            availability: selectedPet.availability ?? true,
            stock_quantity: selectedPet.stock_quantity ?? 0
        });


        setAddingPet(false);
        setEditingPet(true);
    };


    const handlePetInputChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;


        setPetForm(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));
    };


    const handleSavePet = async () => {

        if (!selectedPet) return;


        setSavingPet(true);


        const updatedPet = {
            photo_url: petForm.photo_url,
            breed: petForm.breed,
            category: petForm.category,
            price: Number(petForm.price),
            gender: petForm.gender,
            age_months: Number(petForm.age_months),
            size: petForm.size,
            activity_level: petForm.activity_level,
            living_environment: petForm.living_environment,
            child_friendly: petForm.child_friendly,
            pet_friendly: petForm.pet_friendly,
            personality_traits: petForm.personality_traits,
            small_description: petForm.small_description,
            availability: petForm.availability,
            stock_quantity: Number(petForm.stock_quantity)
        };


        const updated = await handleUpdatePet(
            selectedPet.pet_id,
            updatedPet
        );


        if (updated) {

            setSelectedPet(updated);
            setEditingPet(false);

        }


        setSavingPet(false);
    };


    const handleCreateNewPet = async () => {

        setSavingPet(true);


        const newPet = {
            photo_url: petForm.photo_url,
            breed: petForm.breed,
            category: petForm.category,
            price: Number(petForm.price),
            gender: petForm.gender,
            age_months: Number(petForm.age_months),
            size: petForm.size,
            activity_level: petForm.activity_level,
            living_environment: petForm.living_environment,
            child_friendly: petForm.child_friendly,
            pet_friendly: petForm.pet_friendly,
            personality_traits: petForm.personality_traits,
            small_description: petForm.small_description,
            availability: petForm.availability,
            stock_quantity: Number(petForm.stock_quantity)
        };


        const created = await handleCreatePet(newPet);


        if (created) {

            setAddingPet(false);
            setPetForm({});

        }


        setSavingPet(false);
    };


    const handleDelete = () => {

        if (!selectedPet) return;

        setDeleteModalOpen(true);
    };


    const handleConfirmDelete = async () => {

        if (!selectedPet) return;

        setDeleteModalOpen(false);

        const success = await handleDeletePet(
            selectedPet.pet_id
        );


        if (success) {
            handleCloseDrawer();
        }
    };

    const handleCloseDrawer = () => {

        setSelectedPet(null);
        setEditingPet(false);
        setAddingPet(false);
        setPetForm({});
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
                        Furfriendz Pets
                    </h1>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                    ">
                        Manage pets available in your store
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
                            self-start
                            sm:self-auto
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
                        + Add Pet
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

                {adminPets.map(pet => (

                    <div
                        key={pet.pet_id}
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
                                src={pet.photo_url}
                                alt={pet.breed}
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

                                <div>

                                    <h2 className="
                                        font-semibold
                                        text-slate-900
                                    ">
                                        {pet.breed}
                                    </h2>

                                    <p className="
                                        text-xs
                                        text-slate-500
                                        capitalize
                                        mt-1
                                    ">
                                        {pet.category}
                                    </p>

                                </div>


                                <p className="
                                    font-semibold
                                    text-slate-900
                                    whitespace-nowrap
                                ">
                                    ৳{Number(pet.price).toFixed(0)}
                                </p>

                            </div>


             

                            <div className="
                                flex
                                items-center
                                gap-2
                                mt-4
                                text-xs
                                text-slate-500
                            ">

                                <span className="
                                    px-2
                                    py-1
                                    rounded-md
                                    bg-slate-100
                                    capitalize
                                ">
                                    {pet.gender}
                                </span>

                                <span className="
                                    px-2
                                    py-1
                                    rounded-md
                                    bg-slate-100
                                ">
                                    {pet.age_months} months
                                </span>

                            </div>


       

                            <button
                                onClick={() => {

                                    setSelectedPet(pet);
                                    setEditingPet(false);
                                    setAddingPet(false);

                                }}
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


  

            {(selectedPet || addingPet) && (

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
                                    {addingPet
                                        ? "Add Pet"
                                        : editingPet
                                            ? "Edit Pet"
                                            : selectedPet.breed
                                    }
                                </h2>


                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                    capitalize
                                ">
                                    {addingPet
                                        ? "Add a new pet to your store"
                                        : editingPet
                                            ? selectedPet.breed
                                            : selectedPet.category
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

                            {addingPet ? (


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
                                            value={petForm.photo_url}
                                            onChange={handlePetInputChange}
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
                                                focus:ring-1
                                                focus:ring-emerald-500
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
                                            Breed
                                        </label>

                                        <input
                                            name="breed"
                                            value={petForm.breed}
                                            onChange={handlePetInputChange}
                                            placeholder="e.g. Bengal Kitten"
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
                                                focus:ring-1
                                                focus:ring-emerald-500
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
                                            Category
                                        </label>

                                        <select
                                            name="category"
                                            value={petForm.category}
                                            onChange={handlePetInputChange}
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
                                                focus:ring-1
                                                focus:ring-emerald-500
                                            "
                                        >

                                            <option value="cat">
                                                Cat
                                            </option>

                                            <option value="dog">
                                                Dog
                                            </option>

                                            <option value="bird">
                                                Bird
                                            </option>

                                            <option value="rabbit">
                                                Rabbit
                                            </option>

                                            <option value="other">
                                                Other
                                            </option>

                                        </select>

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
                                                Price
                                            </label>

                                            <input
                                                type="number"
                                                name="price"
                                                min="0"
                                                value={petForm.price}
                                                onChange={handlePetInputChange}
                                                placeholder="0"
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
                                                Age (months)
                                            </label>

                                            <input
                                                type="number"
                                                name="age_months"
                                                min="0"
                                                value={petForm.age_months}
                                                onChange={handlePetInputChange}
                                                placeholder="0"
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
                                                Gender
                                            </label>

                                            <select
                                                name="gender"
                                                value={petForm.gender}
                                                onChange={handlePetInputChange}
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

                                                <option value="male">
                                                    Male
                                                </option>

                                                <option value="female">
                                                    Female
                                                </option>

                                            </select>

                                        </div>


                                        <div>

                                            <label className="
                                                block
                                                text-xs
                                                text-slate-500
                                                mb-1.5
                                            ">
                                                Size
                                            </label>

                                            <select
                                                name="size"
                                                value={petForm.size}
                                                onChange={handlePetInputChange}
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

                                                <option value="small">
                                                    Small
                                                </option>

                                                <option value="medium">
                                                    Medium
                                                </option>

                                                <option value="large">
                                                    Large
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
                                            Activity Level
                                        </label>

                                        <select
                                            name="activity_level"
                                            value={petForm.activity_level}
                                            onChange={handlePetInputChange}
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

                                            <option value="low">
                                                Low
                                            </option>

                                            <option value="moderate">
                                                Moderate
                                            </option>

                                            <option value="high">
                                                High
                                            </option>

                                        </select>

                                    </div>



                                    <div>

                                        <label className="
                                            block
                                            text-xs
                                            text-slate-500
                                            mb-1.5
                                        ">
                                            Living Environment
                                        </label>

                                        <input
                                            name="living_environment"
                                            value={petForm.living_environment}
                                            onChange={handlePetInputChange}
                                            placeholder="e.g. apartment"
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
                                                value={petForm.stock_quantity}
                                                onChange={handlePetInputChange}
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
                                                name="availability"
                                                value={
                                                    petForm.availability
                                                        ? "true"
                                                        : "false"
                                                }
                                                onChange={(e) =>
                                                    setPetForm(prev => ({
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



                                    <div className="
                                        grid
                                        grid-cols-2
                                        gap-4
                                    ">

                                        <label className="
                                            flex
                                            items-center
                                            gap-2
                                            text-sm
                                            text-slate-700
                                        ">

                                            <input
                                                type="checkbox"
                                                name="child_friendly"
                                                checked={petForm.child_friendly}
                                                onChange={handlePetInputChange}
                                                className="
                                                    accent-emerald-500
                                                "
                                            />

                                            Child friendly

                                        </label>


                                        <label className="
                                            flex
                                            items-center
                                            gap-2
                                            text-sm
                                            text-slate-700
                                        ">

                                            <input
                                                type="checkbox"
                                                name="pet_friendly"
                                                checked={petForm.pet_friendly}
                                                onChange={handlePetInputChange}
                                                className="
                                                    accent-emerald-500
                                                "
                                            />

                                            Pet friendly

                                        </label>

                                    </div>



                                    <div>

                                        <label className="
                                            block
                                            text-xs
                                            text-slate-500
                                            mb-1.5
                                        ">
                                            Personality Traits
                                        </label>

                                        <input
                                            name="personality_traits"
                                            value={petForm.personality_traits}
                                            onChange={handlePetInputChange}
                                            placeholder="e.g. Playful, Friendly"
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
                                            Description
                                        </label>

                                        <textarea
                                            name="small_description"
                                            value={petForm.small_description}
                                            onChange={handlePetInputChange}
                                            rows="4"
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
                                            disabled={savingPet}
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
                                            onClick={handleCreateNewPet}
                                            disabled={savingPet}
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
                                            {savingPet
                                                ? "Adding..."
                                                : "Add Pet"
                                            }
                                        </button>

                                    </div>

                                </div>

                            ) : editingPet ? (

      

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
                                            value={petForm.photo_url}
                                            onChange={handlePetInputChange}
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
                                                focus:ring-1
                                                focus:ring-emerald-500
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
                                            Breed
                                        </label>

                                        <input
                                            name="breed"
                                            value={petForm.breed}
                                            onChange={handlePetInputChange}
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
                                                focus:ring-1
                                                focus:ring-emerald-500
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
                                            Category
                                        </label>

                                        <select
                                            name="category"
                                            value={petForm.category}
                                            onChange={handlePetInputChange}
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
                                                focus:ring-1
                                                focus:ring-emerald-500
                                            "
                                        >

                                            <option value="cat">
                                                Cat
                                            </option>

                                            <option value="dog">
                                                Dog
                                            </option>

                                            <option value="bird">
                                                Bird
                                            </option>

                                            <option value="rabbit">
                                                Rabbit
                                            </option>

                                            <option value="other">
                                                Other
                                            </option>

                                        </select>

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
                                                Price
                                            </label>

                                            <input
                                                type="number"
                                                name="price"
                                                min="0"
                                                value={petForm.price}
                                                onChange={handlePetInputChange}
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
                                                Age (months)
                                            </label>

                                            <input
                                                type="number"
                                                name="age_months"
                                                min="0"
                                                value={petForm.age_months}
                                                onChange={handlePetInputChange}
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
                                                Gender
                                            </label>

                                            <select
                                                name="gender"
                                                value={petForm.gender}
                                                onChange={handlePetInputChange}
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

                                                <option value="male">
                                                    Male
                                                </option>

                                                <option value="female">
                                                    Female
                                                </option>

                                            </select>

                                        </div>


                                        <div>

                                            <label className="
                                                block
                                                text-xs
                                                text-slate-500
                                                mb-1.5
                                            ">
                                                Size
                                            </label>

                                            <select
                                                name="size"
                                                value={petForm.size}
                                                onChange={handlePetInputChange}
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

                                                <option value="small">
                                                    Small
                                                </option>

                                                <option value="medium">
                                                    Medium
                                                </option>

                                                <option value="large">
                                                    Large
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
                                            Activity Level
                                        </label>

                                        <select
                                            name="activity_level"
                                            value={petForm.activity_level}
                                            onChange={handlePetInputChange}
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

                                            <option value="low">
                                                Low
                                            </option>

                                            <option value="moderate">
                                                Moderate
                                            </option>

                                            <option value="high">
                                                High
                                            </option>

                                        </select>

                                    </div>


           

                                    <div>

                                        <label className="
                                            block
                                            text-xs
                                            text-slate-500
                                            mb-1.5
                                        ">
                                            Living Environment
                                        </label>

                                        <input
                                            name="living_environment"
                                            value={petForm.living_environment}
                                            onChange={handlePetInputChange}
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
                                                value={petForm.stock_quantity}
                                                onChange={handlePetInputChange}
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
                                                name="availability"
                                                value={
                                                    petForm.availability
                                                        ? "true"
                                                        : "false"
                                                }
                                                onChange={(e) =>
                                                    setPetForm(prev => ({
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


    

                                    <div className="
                                        grid
                                        grid-cols-2
                                        gap-4
                                    ">

                                        <label className="
                                            flex
                                            items-center
                                            gap-2
                                            text-sm
                                            text-slate-700
                                        ">

                                            <input
                                                type="checkbox"
                                                name="child_friendly"
                                                checked={petForm.child_friendly}
                                                onChange={handlePetInputChange}
                                                className="
                                                    accent-emerald-500
                                                "
                                            />

                                            Child friendly

                                        </label>


                                        <label className="
                                            flex
                                            items-center
                                            gap-2
                                            text-sm
                                            text-slate-700
                                        ">

                                            <input
                                                type="checkbox"
                                                name="pet_friendly"
                                                checked={petForm.pet_friendly}
                                                onChange={handlePetInputChange}
                                                className="
                                                    accent-emerald-500
                                                "
                                            />

                                            Pet friendly

                                        </label>

                                    </div>


       

                                    <div>

                                        <label className="
                                            block
                                            text-xs
                                            text-slate-500
                                            mb-1.5
                                        ">
                                            Personality Traits
                                        </label>

                                        <input
                                            name="personality_traits"
                                            value={petForm.personality_traits}
                                            onChange={handlePetInputChange}
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
                                            Description
                                        </label>

                                        <textarea
                                            name="small_description"
                                            value={petForm.small_description}
                                            onChange={handlePetInputChange}
                                            rows="4"
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
                                            onClick={() => setEditingPet(false)}
                                            disabled={savingPet}
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
                                            onClick={handleSavePet}
                                            disabled={savingPet}
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
                                            {savingPet
                                                ? "Saving..."
                                                : "Save Changes"
                                            }
                                        </button>

                                    </div>

                                </div>

                            ) : (

  

                                <>

                                    <img
                                        src={selectedPet.photo_url}
                                        alt={selectedPet.breed}
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
                                        gap-4
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
                                                ৳{Number(selectedPet.price).toFixed(0)}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Gender
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                                capitalize
                                            ">
                                                {selectedPet.gender}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Age
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                            ">
                                                {selectedPet.age_months} months
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Size
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                                capitalize
                                            ">
                                                {selectedPet.size}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Activity Level
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                                capitalize
                                            ">
                                                {selectedPet.activity_level}
                                            </p>

                                        </div>

                                    </div>


  

                                    <div className="
                                        mt-6
                                        grid
                                        grid-cols-2
                                        gap-4
                                    ">

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
                                                {selectedPet.stock_quantity}
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
                                                ${selectedPet.availability
                                                    ? "text-emerald-600"
                                                    : "text-red-600"
                                                }
                                            `}>
                                                {selectedPet.availability
                                                    ? "Available"
                                                    : "Unavailable"
                                                }
                                            </p>

                                        </div>

                                    </div>


   

                                    <div className="
                                        mt-6
                                        grid
                                        grid-cols-2
                                        gap-4
                                    ">

                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Child Friendly
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                            ">
                                                {selectedPet.child_friendly
                                                    ? "Yes"
                                                    : "No"
                                                }
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Pet Friendly
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                            ">
                                                {selectedPet.pet_friendly
                                                    ? "Yes"
                                                    : "No"
                                                }
                                            </p>

                                        </div>

                                    </div>


  

                                    <div className="mt-6">

                                        <p className="text-xs text-slate-400">
                                            Personality
                                        </p>

                                        <p className="
                                            text-sm
                                            text-slate-700
                                            mt-1
                                        ">
                                            {selectedPet.personality_traits}
                                        </p>

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
                                            {selectedPet.small_description}
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
                                            Edit Pet
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


export default AdminPets;