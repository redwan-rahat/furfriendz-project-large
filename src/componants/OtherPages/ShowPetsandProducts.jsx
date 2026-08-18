import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import { useQuery } from '@tanstack/react-query';
import ShowDetails from "../ShowDetails/ShowDetails";
import { NavLink } from "react-router-dom";
import DogSitting from "../Animations/DogSitting";


const ShowPetsandProducts = ({fetchedData}) => {
        




 
    return (
        <div className="h-auto mb-12 w-full ">
           
        <div className="relative m-auto rounded-lg  bg-fifth">
            <div className={` py-6 grid-cols-2 tab:grid-cols-3 lap:grid-cols-4 des:grid-cols-5 w-10/12 grid justify-between   m-auto  text-black text-[10px] space-x-4 transform duration-500 transition-transform`}
           data-aos = 'fade-up'
          
          
            >
                {

                   fetchedData && fetchedData.length == 0 ? <div className="w-64 tab:w-80 -translate-x-2 mob:translate-x-10 tab:translate-x-1/2 lap:translate-x-full des:translate-x-[500px] "> <DogSitting></DogSitting> <h1 className="text-3xl font-medium text-primary text-center">No Data Found</h1> </div> :

                   fetchedData && fetchedData.map(data => 
                    <>
                    <NavLink to={`/details/${data.pet_id ? 'pet' : 'product'}/${data.pet_id ? data.pet_id: data.product_id}`} >
                    <div className={` text-center mt-5 grid-cols-1 space-y-4`}>
                    <div className="border-second border-opacity-50 border-2 w-24 tab:w-28  lap:w-36 lap:h-36 des:w-48 des:h-48 m-auto rounded-full group hover:border-fourth cursor-pointer">
                        <div className="rounded-full overflow-hidden border-opacity-60 border-second border-2 duration-500 group-hover:scale-105 group-hover:bg-primary  group-hover:border-fourth bg-second">
                    <img className="  " src={data.photo_url} alt="" />
                    </div>
                    </div>
                    <h1 className="text-primary font-medium text-sm tab:text-base">{data?.breed ? data.breed : data.product_name}</h1>
                    </div>
                    </NavLink>
                    </>
                   )
                }
            </div>

        </div>

        </div>
    );
};

export default ShowPetsandProducts;