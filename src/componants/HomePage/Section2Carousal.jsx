import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";


const Section2Carousal = ({getdata}) => {

    const {fetchedData,handleFetch} = useContext(AuthContex)
    const [pageNeeded,setpageNeeded] = useState(0)
    const [currentPage,setcurrentPage] = useState(1)
    const [pagenation,setpagination] = useState(null)
    const [animate,setanimate] = useState(false)

    const handleCurrentPage = (e)=>{
      
        setcurrentPage(e)
    }


    
    useEffect(()=>{
     
        const pageRequired = Math.ceil(fetchedData && fetchedData.length / 5)

        setpageNeeded(pageRequired)
      
        const items = fetchedData&& fetchedData.slice(
         
        ( currentPage - 1) * 5  ,  currentPage * 5

        )
         setpagination(items)

    },[currentPage,fetchedData])



 useEffect(()=>{
    

    handleFetch(getdata)
    
    
 },[getdata])
 

  
        setTimeout(() => {
            setanimate(false)
        }, 500);
 
    return (
        <div>
           
        <div className="relative w-9/12 m-auto rounded-lg  bg-fifth">
            <div className={`${animate ? '' : 'aos-animate'} py-6 grid-cols-2 tab:grid-cols-3 lap:grid-cols-4 des:grid-cols-5 grid   justify-between w-10/12 m-auto  text-black text-[10px] space-x-4 transform duration-500 transition-transform`}
           data-aos = 'fade-up'
          
          
            >
                {
                   pagenation && pagenation.map(data => 
                    <>
                    {
                     
                    }
                   
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
            <div className="w-11/12 m-auto text-center font-semibold  py-10">
                {
                 Array.from({length: pageNeeded}, (_,idx)=><>
                 
                
                <button onClick={()=>
                    {handleCurrentPage(idx+1),setanimate(true)}} className="hover:scale-110 duration-300 px-3 py-1 tab:px-6 tab:py-2 mx-2 items-center text-center bg-fifth text-primary rounded-full">
                    
                    {idx+1}
                    
                    </button>

                 </>
                    
                )
                }
            </div>
        </div>
    );
};

export default Section2Carousal;