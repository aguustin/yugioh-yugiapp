import { getAuth, signOut } from "firebase/auth";
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from "../usercontext/usercontext";

const Out = () => {

    const { setUserInfo } = useContext(UserContext);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        signOut(auth).then(() => {
            setUserInfo(null);
        }).catch((error) => {
            console.log(error);
        });
    })

    navigate("/");
}

export default Out;