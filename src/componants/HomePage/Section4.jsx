import DogHideCart from "../Animations/DogHideCart";
import WaveSVGsection4 from "../Animations/WaveSVGsection4";

const Section4 = () => {


    return (
        <div className="relative">
            <div className=" bg-primary ">

            
            <div className="pb-20 tab:pb-24  lap:pt-8  des:pt-20 tab:w-11/12 lap:w-10/12  des:w-9/12 font-page m-auto tab:flex  justify-between ">


            <div className="w-80 h-80 m-auto tab:m-0 tab:h-auto tab:w-2/5">


            <DogHideCart ></DogHideCart>
                
           </div>

                <div className=" text-third text-center tab:text-left w-9/12 m-auto tab:m-0 tab:w-3/6 relative space-y-6 des:space-y-12 tab:mt-40">
                    <img className=" w-28 hidden tab:flex tab:w-32 lap:w-40 des:w-52 absolute tab:-top-24  lap:-top-32 tab:-left-8 lap:-left-10 des:-left-16" src="https://i.ibb.co.com/zGG2Nc8/paw.webp" alt="" />
                    <h1 className=" font-semibold text-2xl tab:text-3xl lap:text-5xl des:text-6xl leading-snug">Your New Pet, Delivered with Care</h1>
                    <h2 className="text-[10px] tab:text-sm lap:text-sm des:text-base text-fifth">
                    Bringing your new furry friend home is simple and worry-free with our trusted delivery service. We ensure a comfortable, caring journey so your pet arrives healthy, happy, and ready to start a wonderful life with you.

                    </h2>
                </div>

              

              
            </div>
            <div className="w-full lap:-mt-2 des:-mt-12 z-20 absolute">
                    <WaveSVGsection4></WaveSVGsection4>
                </div>

            </div>
        </div>
    );
};

export default Section4;