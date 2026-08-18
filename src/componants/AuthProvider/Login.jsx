
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContex } from "./AuthProvider";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa6";
import Foxye from "../Animations/Foxye";
import ParrotSitting from '../Animations/ParrotSitting';

const Login = () => {

    const {navigating,handleSignIn,user ,handleGoogleSignIn,special,setspecial,setVisible,setType,setMessage} = useContext(AuthContex)
    
    const [focusUsername,setfocusUsername] = useState(false)
    const [focusEmail,setfocusEmail] = useState(false)
    const [focusPass,setfocusPass] = useState(false)
    const [focusConfirm,setfocusConfirm] = useState(false)
    const [showeye,setshoweye] = useState(false)
    const[showeyeCon,setshoweyeCon] = useState(false)
    const [loginError, setloginError] = useState(null)
    const nav = useNavigate()

    useEffect(()=>{
        navigating ? nav('/') : ''
    },[navigating])

    const  handleFocus =()=>{
        setfocusUsername(true)
    }
   

    const handleUserInfo =(e)=>{
        e.preventDefault()
    
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        handleSignIn(email,password)
        .then(result => {
          
            //nav('/')
            setloginError(null)
            // fetchUser(result.user.email)
            setVisible(true)
            setMessage('Login Successful')
            setType('success')

            nav('/')

        })
        .catch(error => {
            console.log(error)
            if(error.message == 'Firebase: Error (auth/invalid-credential).' || error.message == 'Firebase: Error (auth/invalid-email).') 
                setloginError('email or password is incorrect')
            
            console.log(error.message)
        })

        const userdata = {email,password}
      
    }


    return (
        
        <div className=" h-screen ">
            
        <div className={`${special? 'lap:grid-cols-2 grid tab:w-9/12 m-auto mt-20 ' : ''}`}>
        

        <div className={`${special ? 'w-9/12 tab:w-2/3 lap:grid-cols-1 des:w-1/2 mx-auto rounded-md text-white/90 bg-second backdrop-blur-2xl border-2 border-white' : 'w-9/12 m-auto tab:w-1/3 '}  bg-second `}>
       <h1 className={`tab:w-36 des:w-44 tab:h-36 des:h-44 absolute -top-16 hidden tab:flex lap:-left-36 des:-left-44 scale-x-[-1] ${special ? '' : 'hidden'}`}><ParrotSitting></ParrotSitting></h1> 
        <h1 className={`${special ? 'mt-8 mb-16 text-center text-2xl lap:text-3xl font-semibold' : 'text-center py-16 text-2xl font-page font-medium'}  `}>Login Here</h1>
        <form action="" onSubmit={handleUserInfo} className={`${special? ' des:w-9/12 ' : ' '} w-11/12 m-auto  text-xl`}>

            

            <div className = {`${special ? 'relative ' : ''}`}>
            <label htmlFor="" className={`${special? 'absolute bottom-2 -z-10 block text-sm font-medium ml-3 ' : ''} ${focusEmail ? 'bottom-9 transition-all ease-in-out duration-300': ''}`} >Email</label>
            <input onFocus={()=>{setfocusEmail(true),setspecial(true)}} type="email" name="email" className={`${special? 'text-sm lap:text-lg font-btn z-20 mb-1 w-11/12 ml-4 h-5 border-0 focus:outline-none  bg-transparent focus:ring-0 ' : ''}`}/>
            <h1 className={`${special ? 'absolute right-4 bottom-2' : ''}  ${focusEmail? 'bottom-9 transition-all ease-in-out duration-300' : ''}`  }><MdOutlineMailOutline /></h1>
            <hr className={`${special ?  'w-11/12 m-auto border mb-10' : 'hidden'}`} />
            </div>
            <div className = {`${special ? 'relative ' : ''}`}>
            <label htmlFor="" className={`${special? 'absolute bottom-2 -z-10 block text-sm font-medium ml-3 ' : ''} ${focusPass ? 'bottom-9 transition-all ease-in-out duration-300': ''}`} >Password</label>
            <input onFocus={()=>setfocusPass(true)} type={`${showeye ? 'text' : 'password'}`} name='password' className={`${special? 'text-sm lap:text-lg font-btn z-20 mb-1 w-11/12 ml-4 h-5 border-0 focus:outline-none  bg-transparent focus:ring-0 ' : ''}`}/>
            <h1 className={`${special ? 'absolute right-4 bottom-2 hover:cursor-pointer' : ''}  ${focusPass? 'bottom-9 transition-all ease-in-out duration-300' : ''}`  } onClick={()=>setshoweye(!showeye)}>{showeye ? <RiEyeLine /> : <RiEyeCloseLine />}</h1>
            <hr className={`${special ?  'w-11/12 m-auto border mb-2' : 'hidden'}`} />
            </div>

            <div className="text-red-600 text-sm ml-3 mb-4">
                {
                    loginError
                }
            </div>
           

            <div className={`${special? 'des:text-right  text-[12px] tab:text-[13px] des:text-sm flex justify-between' : ''}`}>
               <NavLink to={'/register'}><h2 className="ml-3 underline">Register Here</h2></NavLink> 
                <h3 className="underline mr-2">Forgot Passworod? </h3>
            </div>

            <input type="submit" value="Login"  className={` ${special? 'mt-8 tab:scale-90 des:scale-100 cursor-pointer block m-auto text-base font-semibold border-white border-2 px-4 rounded-md py-1 bg-second transition-all duration-300 transform hover:scale-110 hover:bg-white hover:border-primary hover:text-second' : ''}`}/>
        </form>

        <div onClick={()=>{handleGoogleSignIn(),setspecial(true)}} className={`${special? ' hover:text-second tab:text-sm des:text-base hover:border-primary hover:bg-white duration-300 cursor-pointer  w-3/5 space-x-1  m-auto text-center flex font-page my-8 border-2 px-3 py-1 rounded-md' : ''} items-center`}>
            <h1 className={`${special ? '' : ''}  `}>
               Sign in with Google
            </h1>
            <FaGoogle className="text-xl"/>
        </div>
            
        </div>

        <div className={`${special? 'grid-cols-1 hidden lap:inline  m-auto relative -mt-10 ' : 'hidden'}`}>
            <img className="lap:w-80 des:w-full" src="https://i.ibb.co.com/84VQ3Vs/Logo-5.webp" alt="" />
            <h1 className="absolute  items-end -mt-8 des:mt-0 flex justify-center des:inset-0  font-semibold text-center lap:text-4xl des:text-5xl text-primary font-page">Pure love at first paw!</h1>
        </div>

        </div>

    </div>
    );
};

export default Login;