import React, { useContext } from "react";
import { FaCog } from "react-icons/fa";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { UserContext } from "../Contexts/UserContext";
import { FcGoogle } from "react-icons/fc";

function Navbar() {
    const userContext = useContext(UserContext);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => userContext.setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error),
    });
    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        userContext.setUser(null);
    };

    return (
        <div className="flex justify-between text-white mx-4">
            <div className="font-bold text-2xl">PomoRelax</div>
            <div className="flex gap-2 items-center">
                {userContext.user != null ? (
                    <button onClick={logOut}>Log out</button>
                ) : (
                    <button
                        className="bg-white rounded flex text-black items-center gap-2 p-1 font-martian"
                        onClick={login}
                    >
                        <FcGoogle /> Sign in with Google
                    </button>
                )}

                <FaCog className="text-xl" />
            </div>
        </div>
    );
}

export default Navbar;
