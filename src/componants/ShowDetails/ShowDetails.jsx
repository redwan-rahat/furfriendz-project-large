import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContex } from "../AuthProvider/AuthProvider";
import LoadingOverlay from "../OtherPages/LoadingOverlay";


const ShowDetails = () => {


    const { user,handleDetailsData,detailsFetch ,loading,handleCartIN} = useContext(AuthContex)
  
    const [hoverPrice,sethoverPrice] = useState(false)

    const {type,id} = useParams()
    const nav = useNavigate()

   

    
    useEffect(()=>{
        
        
        handleDetailsData(type,id)
      

    },[type,id])



    const handleAddtoCart =()=>{
        const item_data = {type: type, id:id}
        console.log(item_data)
        
        user ? 
        
        handleCartIN(type,id):
        nav('/login')


    }




    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    },[])
 
return (

    <div className="mb-28">

        {
            loading ? <LoadingOverlay /> :

            <>
                <div>
                    {
                        detailsFetch ?

                            <div className="mt-12">

                                <div className="font-page w-11/12 des:w-9/12 m-auto border-2 rounded-lg border-third bg-second text-white">

                                    <div className="text-2xl tab:text-4xl lap:text-5xl des:text-6xl text-center font-semibold mt-12 mb-12">

                                        <h1>
                                            {detailsFetch?.product_name || detailsFetch?.name}
                                        </h1>

                                        <hr className="my-8" />

                                    </div>

                                    <div className="grid-cols-1 tab:grid-cols-2 space-y-8 tab:space-y-0 grid w-10/12 m-auto mb-20">

                                        <div className="grid-cols-1 m-auto tab:m-0 relative">

                                            <div className="w-56 h-56 mob:w-72 mob:h-72 tab:w-56 tab:h-56 lap:w-72 lap:h-72 des:w-96 des:h-96 bg-fifth blur-[1px] rounded-lg drop-shadow-2xl"></div>

                                            <img
                                                className="absolute top-0 shadow-primary shadow-2xl bg-transparent w-56 h-56 mob:w-72 mob:h-72 tab:w-56 tab:h-56 lap:w-72 lap:h-72 des:w-96 des:h-96 rounded-lg"
                                                src={detailsFetch?.photo_url}
                                                alt={detailsFetch?.product_name || detailsFetch?.name}
                                            />

                                        </div>

                                        <div className="grid-cols-1">

                                            <div className="relative flex">

                                                <div className="w-10/12 space-y-5">

                                                    {/* Pet/Product Name */}
                                                    <div className="mob:flex mob:space-x-2 items-center">
                                                        <h2 className="tab:text-base lap:text-lg des:text-xl font-semibold">
                                                            {detailsFetch?.product_name ? 'Product Name :' : 'Pet Name :'}
                                                        </h2>

                                                        <h1 className="tab:text-sm lap:text-base des:text-lg">
                                                            {detailsFetch?.product_name || detailsFetch?.name}
                                                        </h1>
                                                    </div>

                                                    {/* Breed / Material */}
                                                    <div className="mob:flex mob:space-x-2 items-center">
                                                        <h2 className="tab:text-base lap:text-lg des:text-xl font-semibold">
                                                            {detailsFetch?.product_name ? 'Material :' : 'Breed :'}
                                                        </h2>

                                                        <h1 className="tab:text-sm lap:text-base des:text-lg">
                                                            {detailsFetch?.product_name
                                                                ? detailsFetch?.material
                                                                : detailsFetch?.breed
                                                            }
                                                        </h1>
                                                    </div>

                                                    {/* Type / Gender */}
                                                    <div className="mob:flex mob:space-x-2 items-center">
                                                        <h2 className="tab:text-base lap:text-lg des:text-xl font-semibold">
                                                            {detailsFetch?.product_name ? 'Type :' : 'Gender :'}
                                                        </h2>

                                                        <h1 className="tab:text-sm lap:text-base des:text-lg">
                                                            {detailsFetch?.product_name
                                                                ? detailsFetch?.type
                                                                : detailsFetch?.gender
                                                            }
                                                        </h1>
                                                    </div>

                                                    {/* Weight / Personality */}
                                                    <div className="mob:flex mob:space-x-2 items-center">
                                                        <h2 className="tab:text-base lap:text-lg des:text-xl font-semibold">
                                                            {detailsFetch?.product_name ? 'Weight :' : 'Personality :'}
                                                        </h2>

                                                        <h1 className="tab:text-sm lap:text-base des:text-lg">
                                                            {detailsFetch?.product_name
                                                                ? `${detailsFetch?.weight}g`
                                                                : detailsFetch?.personality_traits
                                                            }
                                                        </h1>
                                                    </div>

                                                    {/* Pet-specific information */}
                                                    {!detailsFetch?.product_name && (
                                                        <>
                                                            <div className="mob:flex mob:space-x-2 items-center">
                                                                <h2 className="tab:text-base lap:text-lg des:text-xl font-semibold">
                                                                    Age :
                                                                </h2>

                                                                <h1 className="tab:text-sm lap:text-base des:text-lg">
                                                                    {detailsFetch?.age_months} months
                                                                </h1>
                                                            </div>

                                                            <div className="mob:flex mob:space-x-2 items-center">
                                                                <h2 className="tab:text-base lap:text-lg des:text-xl font-semibold">
                                                                    Size :
                                                                </h2>

                                                                <h1 className="tab:text-sm lap:text-base des:text-lg">
                                                                    {detailsFetch?.size}
                                                                </h1>
                                                            </div>

                                                            <div className="mob:flex mob:space-x-2 items-center">
                                                                <h2 className="tab:text-base lap:text-lg des:text-xl font-semibold">
                                                                    Activity Level :
                                                                </h2>

                                                                <h1 className="tab:text-sm lap:text-base des:text-lg">
                                                                    {detailsFetch?.activity_level}
                                                                </h1>
                                                            </div>

                                                            {/* <div className="mob:flex mob:space-x-2 items-center">
                                                                <h2 className="tab:text-base lap:text-lg des:text-xl font-semibold">
                                                                    Living Environment :
                                                                </h2>

                                                                <h1 className="tab:text-sm lap:text-base des:text-lg">
                                                                    {detailsFetch?.living_environment}
                                                                </h1>
                                                            </div> */}
                                                        </>
                                                    )}

                                                    {/* Product-specific description / Pet description */}
                                                    <div>
                                                        <h1 className="tab:text-sm lap:text-base des:text-lg text-fourth">
                                                            {detailsFetch?.small_description}
                                                        </h1>
                                                    </div>

                                                    {/* Availability */}
                                                    <div className="mob:flex mob:space-x-2 tab:pt-12 items-center">

                                                        <h2 className="tab:text-base lap:text-lg des:text-xl text-orange-300 font-semibold">
                                                            Availability :
                                                        </h2>

                                                        <h1 className="tab:text-sm lap:text-base des:text-lg">
                                                            "{detailsFetch?.availability ? "Available": "Unavailable"}"
                                                        </h1>

                                                    </div>

                                                </div>

                                                {/* Buy / Pet button */}
                                                <div
                                                    onClick={() => handleAddtoCart()}
                                                    className="absolute -right-3 mob:right-0 tab:-right-4 lap:right-0"
                                                >

                                                    <button
                                                        onMouseEnter={() => sethoverPrice(true)}
                                                        onMouseLeave={() => sethoverPrice(false)}
                                                        className="w-24 h-8 tab:w-24 tab:h-10 des:w-32 des:h-12 text-sm tab:text-sm des:text-base rounded-md hover:bg-orange-600 transition-all duration-500 hover:text-white hover:border-white text-orange-500 bg-fifth border-2 border-orange-500"
                                                    >

                                                        <h1 className="text-center font-medium">
                                                            {
                                                                hoverPrice
                                                                    ? detailsFetch?.product_name
                                                                        ? 'Buy Now'
                                                                        : 'Pet me'
                                                                    : 'Price : ' + detailsFetch?.price + '$'
                                                            }
                                                        </h1>

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            : ''

                    }

                </div>

            </>

        }

    </div>
);
};

export default ShowDetails;