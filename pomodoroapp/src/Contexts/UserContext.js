import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";
import { setDBUser } from "../services/DBAPI";
export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [eventListeners, setEventListeners] = useState({});

    useEffect(() => {
        if (user && !loggedIn) {
            console.log(user.access_token);
            let token = user.access_token;
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    setUser(res.data);
                    setLoggedIn(true);
                    setDBUser({ googleId: res.data.id });
                })
                .catch((err) => console.log(err));
        }

        console.log(user);
    }, [user]);

    // Function to subscribe to an event
    const subscribe = (eventName, callback) => {
        setEventListeners((prevListeners) => ({
            ...prevListeners,
            [eventName]: [...(prevListeners[eventName] || []), callback],
        }));
        console.log("Subscribed to: ", eventName);
    };

    //calls all subsribed functions
    const emit = (eventName, payload) => {
        console.log("All Listeners: ", eventListeners);
        const listeners = eventListeners[eventName] || [];
        console.log("Calling all subs!", listeners);
        listeners.forEach((callback) => callback(payload));
    };

    function Logout() {
        setUser(null);
        setLoggedIn(false);
    }

    //object that contains al items needed for export params in one place.
    const userContextValue = {
        loggedIn,
        user,
        subscribe,
        emit,
        setUser,
        Logout,
    };
    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
