import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import ShowPetsandProducts from "./ShowPetsandProducts";
import DogWalking2 from "../Animations/DogWalking2";

const PetsAndProducts = () => {

    const {handleFetch,fetchedData} = useContext(AuthContex)
    const [searchCategory,setsearchCategory] = useState('cat')
    const [getdata,setgetdata] = useState(fetchedData)
    const [loadsearch,setloadsearch] = useState(false)


    useEffect(()=>{
    

        handleFetch(searchCategory)
        setgetdata(fetchedData)
        
     },[searchCategory])

     useEffect(()=>{
            setgetdata(fetchedData)
     },[fetchedData])
     console.log(fetchedData)
     const handletakeSearch = (e) =>{

        const searchQuery = e.target.value
        const filtered = fetchedData[0].product_id ? fetchedData.filter((item)=>item.product_name.toLowerCase().includes(searchQuery.toLowerCase())) : fetchedData.filter((item)=> item.breed.toLowerCase().includes(searchQuery.toLowerCase()))
        setgetdata(filtered)

        
     }

     setTimeout(() => {
        setloadsearch(false)
     }, 2000);


    return (
        <div className="  mt-12 font-page">

                <div className="mb-20 w-10/12 tab:w-8/12 lap:w-9/12 des:w-11/12 m-auto">
                    <h1 className="text-center font-semibold text-xl mob:text-2xl tab:text-5xl lap:text-6xl text-primary">Find Your Desired Pet or Product</h1>
                </div>
                <div className="w-11/12 pb-12 border-2 border-y-transparent py-6 m-auto border-l-primary border-r-primary">
                    <div className="w-11/12 m-auto des:gap-4 space-y-8 lap:space-y-0 lap:grid grid-cols-11  items-center ">
                        <form onChange={(e)=>handletakeSearch(e)} className="space-x-2 lap:col-span-3  text-base   des:col-span-3 my-auto">

                            <input type="text" name="search" className="w-3/5 mob:w-auto lap:w-8/12 des:w-7/12 px-3 h-10 text-primary placeholder:font-medium font-medium focus:outline-primary rounded-sm des:rounded-md " placeholder="search here"/>
                            <button className="px-4 lap:px-2 des:px-4 rounded-sm des:rounded-md py-2 hover:text-primary hover:bg-third duration-200 font-medium text-white bg-primary" type="submit">Search</button>
                        </form>

                        
                        <div className="  lap:col-span-8 des:col-span-6 grid grid-cols-4 ">
                            <div onClick={()=>{setsearchCategory('cat'),setloadsearch(true)}} className={` rounded-full w-11/12 ${searchCategory == 'cats' ? 'bg-white text-primary border-primary' : 'text-white bg-primary'} m-auto flex col-span-1 items-center hover:shadow-xl hover:shadow-primary space-x-2 mob:space-x-3 tab:space-x-4 hover:bg-white duration-200 hover:cursor-pointer hover:text-primary border-2 hover:border-primary  px-2  py-2`}>
                                <img className="w-14 hidden tab:flex bg-second rounded-full" src="https://i.ibb.co.com/XCTCMFC/Bengal-kitten.webp" alt="" />
                                <h1 className="font-medium text-sm mob:text-base lap:text-xl des:text-2xl">Cats</h1>
                            </div>
                            <div onClick={()=>{setsearchCategory('dog'),setloadsearch(true)}} className={` rounded-full w-11/12 ${searchCategory == 'dogs' ? 'bg-white text-primary border-primary' : 'text-white bg-primary'} m-auto flex col-span-1 items-center hover:shadow-xl hover:shadow-primary space-x-2 mob:space-x-3 tab:space-x-4 hover:bg-white duration-200 hover:cursor-pointer hover:text-primary border-2 hover:border-primary  px-2  py-2`}>
                                <img className="w-14 hidden tab:flex bg-second rounded-full" src="https://i.ibb.co.com/3dy1rQv/Beagle.webp" alt="" />
                                <h1 className="font-medium text-sm mob:text-base lap:text-xl des:text-2xl">Dogs</h1>
                            </div>
                            <div onClick={()=>{setsearchCategory('bird'),setloadsearch(true)}} className={` rounded-full w-11/12 ${searchCategory == 'birds' ? 'bg-white text-primary border-primary' : 'text-white bg-primary'} m-auto flex col-span-1 items-center hover:shadow-xl hover:shadow-primary space-x-2 mob:space-x-3 tab:space-x-4 hover:bg-white duration-200 hover:cursor-pointer hover:text-primary border-2 hover:border-primary  px-2  py-2`}>
                                <img className="w-14 hidden tab:flex bg-second rounded-full" src="https://i.ibb.co.com/Q6Mq1Qb/Amazon-Parrot.webp" alt="" />
                                <h1 className="font-medium text-sm mob:text-base lap:text-xl des:text-2xl">Birds</h1>
                            </div>
                            <div onClick={()=>{setsearchCategory('products'),setloadsearch(true)}} className={` rounded-full w-11/12 ${searchCategory == 'pet_products' ? 'bg-white text-primary border-primary' : 'text-white bg-primary'} m-auto flex col-span-1 items-center hover:shadow-xl hover:shadow-primary space-x-2 mob:space-x-3 tab:space-x-4 hover:bg-white duration-200 hover:cursor-pointer hover:text-primary border-2 hover:border-primary  px-2  py-2`}>
                                <img className="w-14 hidden tab:flex bg-second rounded-full" src="https://i.ibb.co.com/sVnbHn2/Pet-collar.webp" alt="" />
                                <h1 className="font-medium text-sm mob:text-base lap:text-xl des:text-2xl">Items</h1>
                            </div>
                        
                        </div>
                    </div>

                    
                </div>
                <div className ='border-2 w-11/12 m-auto border-primary mb-20 rounded-br-xl rounded-bl-xl'>
{                   
                    loadsearch ? <div className="w-64 mob:w-72 m-auto"> <DogWalking2></DogWalking2> </div>:
                   

                        <ShowPetsandProducts fetchedData={getdata ? getdata : fetchedData}></ShowPetsandProducts>
                        
                        }
                    </div>
        </div>
    );
};

export default PetsAndProducts;