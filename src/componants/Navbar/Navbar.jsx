import { FaRegHeart } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import LoadingOverlay from "../OtherPages/LoadingOverlay";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navbar = () => {

    const {handleScrollToAllproduct,loader,pageload,user,handleSignOut,handleTotalCarts,settotalCart,totalCart} = useContext(AuthContex)

    const [isActive,useisActive] = useState(false)
    const [menuOpen,setmenuOpen] = useState(false)

    const menuRef = useRef(null)
    const linkstyle = 'text-second font-medium'
    const activelink = ''
    
    
    const toggleMenu = ()=>{
        setmenuOpen(!menuOpen)
    }

    useEffect(()=>{
            
        const handleClickOutside = (e)=>{
                if(e && menuRef.current && !menuRef.current.contains(e.target)){
                    setmenuOpen(false)
                }
        }

        document.addEventListener('mousedown',handleClickOutside())
        return ()=> document.removeEventListener('mousedown',handleClickOutside)
        
    },[])


    useEffect(()=>{
        handleTotalCarts()
    },[settotalCart,user])

 




    const middlelinks = <>

        <NavLink to={'/'} className={({isActive})=> isActive ? 'linkactive duration-200 ease-out': 'hover:text-primary duration-300'  } ><li className="mt-1 tab:mt-4">Home</li></NavLink>
        <NavLink to={'/shop'} className={({isActive})=> isActive ? 'linkactive duration-200 ease-out': 'hover:text-primary duration-300'  } ><li className="mt-1 tab:mt-4">Pets & Products</li></NavLink>
       
{
    user? 
    <NavLink to={'/petcare'} className={({isActive})=> isActive ? 'linkactive duration-200 ease-out': 'hover:text-primary duration-300' } ><li className="mt-1 tab:mt-4">Pet care</li></NavLink>
    : ''

}
        <NavLink to={'/blog'} className={({isActive})=> isActive ? 'linkactive duration-200 ease-out': 'hover:text-primary duration-300' } ><li className="mt-1 tab:mt-4">Blog</li></NavLink>
        {/* <NavLink to={'/blogs'} className={({isActive})=> isActive ? 'linkactive duration-200 ease-out': 'hover:text-primary duration-300' } ><li className="mt-1 tab:mt-4">Blog</li></NavLink> */}
        <NavLink to={'/contactus'} className={({isActive})=> isActive ? 'linkactive duration-200 ease-out': 'hover:text-primary duration-300' } ><li className="mt-1 tab:mt-4">Contact Us</li></NavLink>
       
    </>
    
    const lastlinks = <>
    {
        user ? 
    <NavLink to={'/profile'}><li className="mt-1 tab:mt-4 text-primary"  >Profile</li></NavLink>:
    ''

    // <NavLink to={'/'}><li className="mt-1 tab:mt-4 text-primary"  >Profile</li></NavLink>
    
    }
    {/* {

    <NavLink to={'/'} className={`text-primary` } ><li className="mt-1 tab:mt-4">Login</li></NavLink>
    
    } */}


    {
        user ? 
    <NavLink><li className="mt-1 tab:mt-4 text-primary" onClick={()=>handleSignOut()}>Sign Out</li></NavLink>:
    <NavLink to={'/login'} className={`text-primary` } ><li className="mt-1 tab:mt-4">Login</li></NavLink>
    
    }


    {/* <NavLink to={'/'} className={`text-primary ` } ><li className="mt-1 tab:mt-4 text-xl flex items-center" ><BsCart4 /><h1 className="lap:text-lg text-[16px] bg-orange-500 text-white items-center rounded-full w-5 h-5 lap:w-7 lap:h-7 "><h2 className="-mt-[5px]  lap:ml-[8px] lap:mt-0 ml-[5.5px]">{0}</h2></h1></li></NavLink> */}

    <NavLink to={'/mycart'} className={`text-primary ` } ><li className="mt-1 tab:mt-4 text-xl flex items-center" ><BsCart4 /><h1 className="lap:text-lg text-[16px] bg-orange-500 text-white items-center rounded-full w-5 h-5 lap:w-7 lap:h-7 "><h2 className="-mt-[5px]  lap:ml-[8px] lap:mt-0 ml-[5.5px]">{totalCart ? totalCart : 0}</h2></h1></li></NavLink>
    </>



    return (
        <div className={` font-page  ${pageload ? 'hidden' : 'flex'} z-10 lap:w-11/12 m-auto`}>
      
            {/* for larger device = navbar  */}

            <div className={`justify-between lap:text-sm des:text-[16px] w-full hidden lap:flex  items-center `}>
               <NavLink to={'/'}> 
               <div className="w-36 h-36 hover:cursor-pointer">
                    <img src={'https://i.ibb.co.com/84VQ3Vs/Logo-5.webp'}  alt="photo cannot be loaded" />
                    
                </div>
                </NavLink>


                <div>
                    <ul className={`flex space-x-10 ${linkstyle}`}>
                        {middlelinks}
                    </ul>
                </div>
                
                <div>
                    <ul className={`flex space-x-6 items-center ${linkstyle}`}>
                        {lastlinks}
                    </ul>
                </div>

            </div>

            {/* with burger */}
            <div className="flex tab:flex relative  w-full justify-between lap:hidden">

               
                <div className="items-center  flex text-xl tab:text-2xl ">

               
                <button onClick={toggleMenu} className="text-primary left-6 absolute" >

                {
                    menuOpen ? 
                <Icon icon="line-md:menu-to-close-alt-transition"  /> : 
                <Icon icon="line-md:close-to-menu-alt-transition"  className="" />

                }
                </button>

                <div ref={menuRef} className={`absolute top-24 h-screen tab:top-32 text-[10px] mob:text-[12px] tab:text-sm bg-fifth  transform transition-transform duration-200 
                    ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                     
                     <div className="list-none mx-6 tab:mx-10  text-second font-medium ">

                     
                     {middlelinks}
                     {lastlinks}
                     </div>
                </div>
                </div>
                <NavLink to={'/'}>
                <div className="m-auto" >
                    <div className="tab:w-32 tab:h-32 w-24 h-24">
                        <img src="https://i.ibb.co.com/84VQ3Vs/Logo-5.webp" alt="" />
                    </div>
                </div>
                </NavLink>
                
                
            </div>


        </div>
    );
};

export default Navbar;