import React, { useEffect } from "react";
import TimerDisplay from "../components/TimerDisplay";
import Navbar from "../components/Navbar";
import TasksHolder from "../components/TasksHolder";

function Home(props) {
    return (
        <div className="w-full">
            <Navbar />
            <TimerDisplay pomodoro={props.pomodoro} />
            <TasksHolder />
        </div>
    );
}

export default Home;
