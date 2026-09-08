import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import LoadingOverlay from "../OtherPages/LoadingOverlay";
import ModalAlert from "../OtherPages/ModalAlert";
import FloatingCart from "../Cart/FloatingCart";

AOS.init();

const Root = () => {

    const location = useLocation();

    const isAdmin = location.pathname.startsWith("/admin");
    const isDelivery = location.pathname.startsWith("/delivery");



    const isBkashCheckout =
        location.pathname === "/bkash-checkout";

    const isDashboardRoute =
        isAdmin ||
        isDelivery ||
        isBkashCheckout;


    const {
        setloader,
        setpageload,
        pageload,
        loader
    } = useContext(AuthContex);


    useEffect(() => {

        setTimeout(() => {

            setpageload(true);

            setTimeout(() => {

                setpageload(false);

            }, 1000);

        }, 100);

    }, []);


    return (

        <div className="bg-fifth z-10">

            <div className={`${pageload ? "" : "hidden"}`}>

                <LoadingOverlay />

            </div>


            <div className={`${pageload ? "hidden" : ""} z-10`}>

                <ModalAlert />


                {/* CUSTOMER NAVBAR */}

                {!isDashboardRoute && (

                    <div className="relative z-10">

                        <Navbar />

                    </div>

                )}




                <div className="relative z-0">

                    <Outlet />

                </div>




                {!isDashboardRoute && (

                    <>

                        <Footer />

                        <FloatingCart />

                    </>

                )}

            </div>

        </div>

    );

};

export default Root;

