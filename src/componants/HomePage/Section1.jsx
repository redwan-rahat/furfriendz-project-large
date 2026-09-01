import { useEffect, useLayoutEffect, useState } from "react";

import Section1Carousal from "./Section1Carousal";
import Cathide from "../Animations/Cathide";
import WaveSVG from "../Animations/WaveSVG";
import Parrotflying from "../Animations/Parrotflying";
import ParrotSitting from "../Animations/ParrotSitting";


const Section1 = () => {


    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="relative z-0">
             
            <div className=" -z-10 relative  text-center text-primary text-6xl tab:text-[100px]  lap:text-[120px] des:text-[180px] font-page font-semibold tracking-wide">
            
                <div
                    className=" inline-block  z-10 relative drop-shadow-lg  bg-gradient-to-b from-primary text-transparent to-second bg-clip-text"
                >
                 
                 <div className="absolute hidden lap:inline des:w-44 des:h-44 lap:w-24 lap:h-24  -z-10 des:-left-10 lap:-left-5 -translate-y-2/3 des:-mt-7 lap:-mt-3 ">
                <Cathide ></Cathide>
                </div>

                <h1 className=" z-20">
               
                  FurFriendz
                  </h1>
                  <div className="right-0 hidden lap:flex lap:translate-x-16 des:translate-x-12 lap:w-36 lap:h-36  des:w-44 des:h-44 des:-top-20 lap:-top-16 absolute  z-0 ">
                    
                   
                    <ParrotSitting></ParrotSitting>
                    </div>

                  </div>
                  
                 
            </div>

            <div className=" tab:top-5 lap:top-20 des:top-20 -z-10  w-full  absolute">
                <Section1Carousal></Section1Carousal>
            </div>

            <div className={`-z-10  hidden lap:flex absolute right-0 lap:w-[400px] des:w-[700px] des:h-[700px] duration-300 top-28  blur-[.7px] ` }>
                <img className="max-w-full max-h-full" src="https://i.ibb.co.com/wQ0979s/Food-B.webp" alt="" />
            </div>


            <div className=" mt-[315px] tab:mt-[350px] lap:mt-[315px] des:mt-[400px] z-20">
                <WaveSVG></WaveSVG>
         
            </div>

            
           
            

        </div>
    );
};

export default Section1;