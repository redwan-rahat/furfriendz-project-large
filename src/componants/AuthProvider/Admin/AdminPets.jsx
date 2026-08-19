const AdminPets = () => {

    return (

        <div>

            <div className="flex justify-between items-center">

                <h2 className="text-xl tab:text-2xl lap:text-3xl font-semibold">
                    Manage Pets
                </h2>

                <button
                    className="px-4 py-2 border-2 border-orange-500 text-orange-500 bg-white rounded-md hover:bg-primary hover:text-white hover:border-white duration-300"
                >
                    + Add Pet
                </button>

            </div>


            <div className="text-center py-12">
                Pets management coming next.
            </div>

        </div>
    )
}

export default AdminPets