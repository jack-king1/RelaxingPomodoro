import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { useContext, useEffect, useRef, useState } from "react";
import { GetBackground } from "./services/PexelsAPI";
import PomodoroTimer from "./models/PomodoroTimer";
import { UserContext } from "./Contexts/UserContext";
import useSound from "use-sound";
import endSfx from "./audio/end.mp3";

function App() {
    const userContext = useContext(UserContext);
    const [te, setTE] = useState(false); // Initialize with initial value //keep track if timer has reached 00:00 te = TIMER END
    const [bgImg, setBackgroundImg] = useState(null);
    const [timer, setTimer] = useState(null);
    const [timerState, setTimerState] = useState("POMODORO");
    const [pomodoroTimer, setPomodoroTimer] = useState(
        new PomodoroTimer(25, 5, 15, true)
    );
    const [endaudio] = useSound(endSfx);

    useEffect(() => {
        GetBackground(AssignPhotos);
    }, []);

    useEffect(() => {
        pomodoroTimer.InitTimer();
        const intervalId = setInterval(() => {
            let time = pomodoroTimer.CountDownTimer();
            document.title =
                time.minutes.toString().padStart(2, "0") +
                ":" +
                time.seconds.toString().padStart(2, "0");
            //check if timer has ended to see if sound should play
            if (pomodoroTimer.IsFinnished() && !te) {
                console.log("ended");
                endaudio();
                setTE(true);
            } else {
                console.log("Not ended.");
            }
            setTimer(time);
        }, 1000); // Update the timer every second

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [bgImg, te]);

    function AssignPhotos(fetchedObj) {
        console.log("Assigned Photo: ", fetchedObj);
        setBackgroundImg(fetchedObj.src.landscape);
    }

    function AddTask(text) {
        let newArray = userContext.tasks;
        newArray.push(text);
        userContext.setTasks(newArray);
        //push task to database
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
                            tasks={userContext.tasks}
                            setTasks={userContext.setTasks}
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
