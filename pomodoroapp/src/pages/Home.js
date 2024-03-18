import React, { useEffect } from "react";
import TimerDisplay from "../components/TimerDisplay";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <div className="w-full">
            <Navbar />
            <TimerDisplay />
        </div>
    );
}

export default Home;
