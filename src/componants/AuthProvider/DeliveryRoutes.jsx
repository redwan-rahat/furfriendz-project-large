import { useContext, useEffect, useState } from "react";
import { AuthContex } from "./AuthProvider";
import LoadingOverlay from "../OtherPages/LoadingOverlay";
import { Navigate } from "react-router-dom";

const DeliveryRoutes = ({ children }) => {
    const { user, loader, handleCheckDelivery } = useContext(AuthContex);

    const [isDelivery, setIsDelivery] = useState(null);

    useEffect(() => {
        const checkDelivery = async () => {
            if (!user) {
                setIsDelivery(false);
                return;
            }

            const delivery = await handleCheckDelivery();
            setIsDelivery(delivery);
        };

        checkDelivery();
    }, [user]);

    if (loader || isDelivery === null) {
        return <LoadingOverlay />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isDelivery) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default DeliveryRoutes;