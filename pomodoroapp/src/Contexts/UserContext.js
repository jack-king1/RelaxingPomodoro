import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";
export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [eventListeners, setEventListeners] = useState({});

    useEffect(() => {
        if (user) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => console.log(err));
        }
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

    //object that contains al items needed for export params in one place.
    const userContextValue = {
        loggedIn,
        user,
        subscribe,
        emit,
        setUser,
    };
    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;