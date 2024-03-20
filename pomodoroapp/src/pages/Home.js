import React, { useEffect } from "react";
import TimerDisplay from "../components/TimerDisplay";
import Navbar from "../components/Navbar";
import TasksHolder from "../components/TasksHolder";

function Home(props) {
    return (
        <div className="w-full">
            <Navbar />
            <TimerDisplay
                pomodoro={props.pomodoro}
                time={props.time}
                timerState={props.timerState}
                setTimerState={props.setTimerState}
                setTimer={props.setTimer}
            />
            <TasksHolder />
        </div>
    );
}

export default Home;
