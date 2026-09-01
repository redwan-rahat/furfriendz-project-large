import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider";
import DeleteModal from "../../OtherPages/DeleteModal";



const AdminProducts = () => {

    const {
        adminProducts,
        handleGetProducts,
        handleUpdateProduct,
        handleDeleteProduct,
        handleCreateProduct
    } = useContext(AuthContex);


    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(false);
    const [addingProduct, setAddingProduct] = useState(false);

    const [savingProduct, setSavingProduct] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [productForm, setProductForm] = useState({});


    useEffect(() => {

        handleGetProducts();

    }, []);




    const handleRefresh = async () => {

        setRefreshing(true);

        await handleGetProducts();

        setRefreshing(false);
    };




    const handleStartAdd = () => {

        setSelectedProduct(null);
        setEditingProduct(false);

        setProductForm({
            photo_url: "",
            product_name: "",
            type: "",
            pet_types: [],
            activity_level: "",
            size: "",
            purpose: "",
            price: "",
            availability: true,
            stock_quantity: 0,
            small_description: "",
            material: "",
            weight: ""
        });

        setAddingProduct(true);
    };




    const handleOpenProduct = (product) => {

        setSelectedProduct(product);
        setEditingProduct(false);
        setAddingProduct(false);
    };




    const handleStartEdit = () => {

        if (!selectedProduct) return;


        let petTypes = selectedProduct.pet_types || [];


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


        setProductForm({
            photo_url: selectedProduct.photo_url || "",
            product_name: selectedProduct.product_name || "",
            type: selectedProduct.type || "",
            pet_types: Array.isArray(petTypes)
                ? petTypes
                : [],
            activity_level: selectedProduct.activity_level || "",
            size: selectedProduct.size || "",
            purpose: selectedProduct.purpose || "",
            price: selectedProduct.price ?? "",
            availability: selectedProduct.availability ?? true,
            stock_quantity: selectedProduct.stock_quantity ?? 0,
            small_description: selectedProduct.small_description || "",
            material: selectedProduct.material || "",
            weight: selectedProduct.weight ?? ""
        });


        setAddingProduct(false);
        setEditingProduct(true);
    };


 

    const handleProductInputChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;


        setProductForm(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));
    };




    const handlePetTypesChange = (e) => {

        const value = e.target.value;

        const petTypes = value
            .split(",")
            .map(item => item.trim())
            .filter(Boolean);


        setProductForm(prev => ({
            ...prev,
            pet_types: petTypes
        }));
    };




    const handleSaveProduct = async () => {

        if (!selectedProduct) return;


        setSavingProduct(true);


        const updatedProduct = {

            photo_url: productForm.photo_url,

            product_name: productForm.product_name,

            type: productForm.type,

            pet_types: productForm.pet_types,

            activity_level: productForm.activity_level,

            size: productForm.size,

            purpose: productForm.purpose,

            price: Number(productForm.price),

            availability: productForm.availability,

            stock_quantity: Number(productForm.stock_quantity),

            small_description: productForm.small_description,

            material: productForm.material,

            weight: Number(productForm.weight)

        };


        const updated = await handleUpdateProduct(
            selectedProduct.product_id,
            updatedProduct
        );


        if (updated) {

            setSelectedProduct(updated);
            setEditingProduct(false);

        }


        setSavingProduct(false);
    };


 

    const handleCreateNewProduct = async () => {

        setSavingProduct(true);


        const newProduct = {

            photo_url: productForm.photo_url,

            product_name: productForm.product_name,

            type: productForm.type,

            pet_types: productForm.pet_types,

            activity_level: productForm.activity_level,

            size: productForm.size,

            purpose: productForm.purpose,

            price: Number(productForm.price),

            availability: productForm.availability,

            stock_quantity: Number(productForm.stock_quantity),

            small_description: productForm.small_description,

            material: productForm.material,

            weight: Number(productForm.weight)

        };


        const created = await handleCreateProduct(newProduct);


        if (created) {

            setAddingProduct(false);
            setProductForm({});

        }


        setSavingProduct(false);
    };




    const handleDelete = () => {

        if (!selectedProduct) return;

        setDeleteModalOpen(true);
    };


    const handleConfirmDelete = async () => {

        if (!selectedProduct) return;


        setDeleteModalOpen(false);


        const success = await handleDeleteProduct(
            selectedProduct.product_id
        );


        if (success) {

            handleCloseDrawer();

        }
    };




    const handleCloseDrawer = () => {

        setSelectedProduct(null);
        setEditingProduct(false);
        setAddingProduct(false);
        setProductForm({});
        setDeleteModalOpen(false);
    };




    const getPetTypes = (product) => {

        let petTypes = product.pet_types || [];


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
                        Furfriendz Products
                    </h1>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                    ">
                        Manage products available in your store
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
                        + Add Product
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

                {adminProducts.map(product => {

                    const petTypes = getPetTypes(product);


                    return (

                        <div
                            key={product.product_id}
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
                                    src={product.photo_url}
                                    alt={product.product_name}
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
                                            truncate
                                        ">
                                            {product.product_name}
                                        </h2>

                                        <p className="
                                            text-xs
                                            text-slate-500
                                            mt-1
                                        ">
                                            {product.type}
                                        </p>

                                    </div>


                                    <p className="
                                        font-semibold
                                        text-slate-900
                                        whitespace-nowrap
                                    ">
                                        ৳{Number(product.price).toFixed(0)}
                                    </p>

                                </div>


                                <div className="
                                    flex
                                    flex-wrap
                                    items-center
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
                                        capitalize
                                    ">
                                        {product.size}
                                    </span>


                                    <span className="
                                        px-2
                                        py-1
                                        rounded-md
                                        bg-slate-100
                                        text-xs
                                        text-slate-500
                                    ">
                                        Stock: {product.stock_quantity}
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
                                            product.availability
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-red-50 text-red-600"
                                        }
                                    `}>
                                        {product.availability
                                            ? "Available"
                                            : "Unavailable"
                                        }
                                    </span>

                                </div>


                                <button
                                    onClick={() =>
                                        handleOpenProduct(product)
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

                    );

                })}

            </div>




            {adminProducts.length === 0 && (

                <div className="
                    mt-8
                    py-16
                    text-center
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                ">

                    <p className="
                        text-sm
                        text-slate-500
                    ">
                        No products found.
                    </p>

                </div>

            )}



            {(selectedProduct || addingProduct) && (

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
                                    {addingProduct
                                        ? "Add Product"
                                        : editingProduct
                                            ? "Edit Product"
                                            : selectedProduct.product_name
                                    }
                                </h2>


                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                ">
                                    {addingProduct
                                        ? "Add a new product to your store"
                                        : editingProduct
                                            ? selectedProduct.product_name
                                            : selectedProduct.type
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




                            {(addingProduct || editingProduct) ? (

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
                                            value={productForm.photo_url}
                                            onChange={handleProductInputChange}
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
                                            Product Name
                                        </label>

                                        <input
                                            type="text"
                                            name="product_name"
                                            value={productForm.product_name}
                                            onChange={handleProductInputChange}
                                            placeholder="e.g. Pet Collar"
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
                                            type="text"
                                            name="type"
                                            value={productForm.type}
                                            onChange={handleProductInputChange}
                                            placeholder="e.g. Dog Toys"
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
                                            type="text"
                                            value={
                                                Array.isArray(productForm.pet_types)
                                                    ? productForm.pet_types.join(", ")
                                                    : ""
                                            }
                                            onChange={handlePetTypesChange}
                                            placeholder="dog, cat, rabbit"
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
                                                Price
                                            </label>

                                            <input
                                                type="number"
                                                name="price"
                                                min="0"
                                                step="0.01"
                                                value={productForm.price}
                                                onChange={handleProductInputChange}
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
                                                Weight
                                            </label>

                                            <input
                                                type="number"
                                                name="weight"
                                                min="0"
                                                step="0.01"
                                                value={productForm.weight}
                                                onChange={handleProductInputChange}
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
                                                Activity Level
                                            </label>

                                            <input
                                                type="text"
                                                name="activity_level"
                                                value={productForm.activity_level}
                                                onChange={handleProductInputChange}
                                                placeholder="low / moderate / high"
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
                                                Size
                                            </label>

                                            <input
                                                type="text"
                                                name="size"
                                                value={productForm.size}
                                                onChange={handleProductInputChange}
                                                placeholder="small / medium / large"
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



                                    <div>

                                        <label className="
                                            block
                                            text-xs
                                            text-slate-500
                                            mb-1.5
                                        ">
                                            Purpose
                                        </label>

                                        <input
                                            type="text"
                                            name="purpose"
                                            value={productForm.purpose}
                                            onChange={handleProductInputChange}
                                            placeholder="e.g. exercise"
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
                                                value={productForm.stock_quantity}
                                                onChange={handleProductInputChange}
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
                                                    productForm.availability
                                                        ? "true"
                                                        : "false"
                                                }
                                                onChange={(e) =>
                                                    setProductForm(prev => ({
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
                                            Material
                                        </label>

                                        <input
                                            type="text"
                                            name="material"
                                            value={productForm.material}
                                            onChange={handleProductInputChange}
                                            placeholder="e.g. Nylon, Metal"
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
                                            value={productForm.small_description}
                                            onChange={handleProductInputChange}
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
                                            disabled={savingProduct}
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
                                                addingProduct
                                                    ? handleCreateNewProduct
                                                    : handleSaveProduct
                                            }
                                            disabled={savingProduct}
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
                                            {savingProduct
                                                ? addingProduct
                                                    ? "Adding..."
                                                    : "Saving..."
                                                : addingProduct
                                                    ? "Add Product"
                                                    : "Save Changes"
                                            }
                                        </button>

                                    </div>

                                </div>

                            ) : (


                                <>

                                    <img
                                        src={selectedProduct.photo_url}
                                        alt={selectedProduct.product_name}
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
                                                ৳{Number(selectedProduct.price).toFixed(2)}
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
                                                {selectedProduct.type}
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
                                                {selectedProduct.size}
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
                                                {selectedProduct.activity_level}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Purpose
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                            ">
                                                {selectedProduct.purpose}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-slate-400">
                                                Weight
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-slate-800
                                                mt-1
                                            ">
                                                {selectedProduct.weight}
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

                                            {getPetTypes(selectedProduct).map(
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


      

                                    <div className="
                                        mt-6
                                        grid
                                        grid-cols-2
                                        gap-5
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
                                                {selectedProduct.stock_quantity}
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
                                                    selectedProduct.availability
                                                        ? "text-emerald-600"
                                                        : "text-red-600"
                                                }
                                            `}>
                                                {selectedProduct.availability
                                                    ? "Available"
                                                    : "Unavailable"
                                                }
                                            </p>

                                        </div>

                                    </div>


  

                                    <div className="mt-6">

                                        <p className="text-xs text-slate-400">
                                            Material
                                        </p>

                                        <p className="
                                            text-sm
                                            text-slate-700
                                            mt-1
                                        ">
                                            {selectedProduct.material}
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
                                            {selectedProduct.small_description}
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
                                            Edit Product
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


export default AdminProducts;