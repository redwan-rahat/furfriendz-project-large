import { useContext, useEffect, useState } from "react";
import { AuthContex } from "./AuthProvider";
import LoadingOverlay from "../OtherPages/LoadingOverlay";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {

    const { user, loader, handleCheckAdmin } = useContext(AuthContex)

    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {

        const checkAdmin = async () => {

            if (!user) {
                setIsAdmin(false)
                return
            }

            const admin = await handleCheckAdmin()

            setIsAdmin(admin)
        }

        checkAdmin()

    }, [user])


    if (loader || isAdmin === null) {
        return <LoadingOverlay />
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />
    }

    return children
}

export default AdminRoutes