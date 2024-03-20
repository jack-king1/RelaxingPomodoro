import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { GetBackground } from "./services/PexelsAPI";
import PomodoroTimer from "./models/PomodoroTimer";

function App() {
    const [bgImg, setBackgroundImg] = useState(null);
    const [timer, setTimer] = useState(null);
    const [timerState, setTimerState] = useState("POMODORO");
    const [tasks, setTasks] = useState([]);
    const [pomodoroTimer, setPomodoroTimer] = useState(
        new PomodoroTimer(25, 5, 15, true)
    );

    useEffect(() => {
        GetBackground(AssignPhotos);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            let time = pomodoroTimer.CountDownTimer();
            setTimer(time);
        }, 1000); // Update the timer every second

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [bgImg]);

    function AssignPhotos(fetchedObj) {
        console.log("Assigned Photo: ", fetchedObj);
        setBackgroundImg(fetchedObj.src.landscape);
    }

    function RemoveTask(id) {
        console.log("remove: ", id);
        const newArray = [...tasks];
        // Remove item at indexToRemove using splice
        newArray.splice(id, 1);
        // Update state with the new array
        setTasks(newArray);
    }

    function AddTask(text) {
        let newArray = tasks;
        newArray.push(text);
        setTasks(newArray);
    }

    return (
        <div className={`w-screen h-screen`}>
            {bgImg != null && timer != null ? (
                <div
                    className={`w-full h-full flex`}
                    style={{
                        backgroundImage: `url(${bgImg})`,
                        backgroundSize: "cover", // You can adjust 'cover', 'contain', or specify a size like '100px 100px'
                    }}
                >
                    <div className="w-full p-2 mx-auto lg:w-1/3">
                        <Home
                            pomodoro={pomodoroTimer}
                            time={timer}
                            timerState={timerState}
                            setTimerState={setTimerState}
                            setTimer={setTimer}
                            tasks={tasks}
                            setTasks={setTasks}
                            removeTask={RemoveTask}
                            addTask={AddTask}
                        />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default App;
