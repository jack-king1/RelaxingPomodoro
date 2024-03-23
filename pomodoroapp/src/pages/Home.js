import React, { useEffect } from "react";
import TimerDisplay from "../components/TimerDisplay";
import Navbar from "../components/Navbar";
import TasksHolder from "../components/TasksHolder";

//sound when timer runs out, soft metal drum?
//favicon
//tab text
//quote api
//add remove tasks.
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
            <TasksHolder
                tasks={props.tasks}
                setTasks={props.setTasks}
                addTask={props.addTask}
            />
        </div>
    );
}

export default Home;
