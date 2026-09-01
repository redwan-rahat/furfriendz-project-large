import {useState } from "react";

import Section2Carousal from "./Section2Carousal";


const Section2 = () => {

        const [getdata,setgetData] = useState('cat')
        
        const handleClick = (name)=>{
            
            setgetData(`${name}`)
            
        }

     
       

    return (
        <div className="relative pb-12 pt-28 tab:pt-20  lap:-mt-10 bg-primary font-page text-fifth ">

            

            <div className="absolute -translate-y-1/2 left-1/2 transform -translate-x-1/2">
            
            <div className="">
                <img className="w-28  lap:w-32 des:w-40 m-auto" src="https://i.ibb.co.com/84VQ3Vs/Logo-5.webp" alt="" />
            </div>

            <div className="text-center space-y-6 font-semibold">
            <h1 className="text-2xl tab:text-3xl lap:text-5xl">Find Your Perfect Companion</h1>
            <h2 className=" tab:text-xl lap:text-2xl">Shop by Category</h2>
            </div>

            </div>


            <div className="pt-44 grid grid-cols-2 tab:grid-cols-4 w-10/12 m-auto ">


                <div onClick={()=>handleClick('cat')} className="text-center grid-cols-1  space-y-4 pb-6 tab:pb-0">
                   
                    <div className={` ${ getdata  == 'cat' ? 'bg-fourth' : 'bg-fifth'} w-36  lap:w-44 des:w-60 m-auto des:h-60  rounded-full hover:cursor-pointer overflow-hidden bg-fifth hover:bg-third transition-all group duration-500`}>
                    <img className="w-60 m-auto object-cover group-hover:scale-110 duration-500" src="https://i.ibb.co.com/XCTCMFC/Bengal-kitten.webp" alt="" />
                    </div>
                    <h3 className="font-semibold lap:text-2xl des:text-3xl">Cats</h3>
                </div>
                <div onClick={()=>handleClick('dog')} className="text-center grid-cols-1  space-y-4 pb-6 tab:pb-0">
                    <div className={` ${ getdata  == 'dog' ? 'bg-fourth' : 'bg-fifth'} w-36  lap:w-44 des:w-60 m-auto des:h-60  rounded-full hover:cursor-pointer overflow-hidden bg-fifth hover:bg-third transition-all group duration-500`}>
                    <img className="w-60 m-auto object-cover group-hover:scale-110 duration-500" src="https://i.ibb.co.com/3dy1rQv/Beagle.webp" alt="" />
                    </div>
                    <h3 className="font-semibold lap:text-2xl des:text-3xl">Dogs</h3>
                </div>
                <div onClick={()=>handleClick('bird')} className="text-center grid-cols-1  space-y-4 pb-6 tab:pb-0">
                    <div className={` ${ getdata  == 'bird' ? 'bg-fourth' : 'bg-fifth'} w-36  lap:w-44 des:w-60 m-auto des:h-60  rounded-full hover:cursor-pointer overflow-hidden bg-fifth hover:bg-third transition-all group duration-500`}>
                    <img className="w-60 m-auto object-cover group-hover:scale-110 duration-500" src="https://i.ibb.co.com/Q6Mq1Qb/Amazon-Parrot.webp" alt="" />
                    </div>
                    <h3 className="font-semibold lap:text-2xl des:text-3xl">Birds</h3>
                </div>
                <div onClick={()=>handleClick('products')} className="text-center grid-cols-1  space-y-4 pb-6 tab:pb-0">
                    <div className={` ${ getdata  == 'pet_products' ? 'bg-fourth' : 'bg-fifth'} w-36  lap:w-44 des:w-60 m-auto des:h-60  rounded-full hover:cursor-pointer overflow-hidden bg-fifth hover:bg-third transition-all group duration-500`}>
                    <img className="w-60 m-auto object-cover group-hover:scale-110 duration-500" src="https://i.ibb.co.com/bB2xWSb/petcage.webp" alt="" />
                    </div>
                    <h3 className="font-semibold lap:text-2xl des:text-3xl">Pet Items</h3>
                </div>
            </div>

            <div className=" mt-8 tab:mt-16">
                <Section2Carousal getdata={getdata}></Section2Carousal>
            </div>


        </div>
    );
};

export default Section2;