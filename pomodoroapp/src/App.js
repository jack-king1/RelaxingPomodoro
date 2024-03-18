import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { GetBackground } from "./services/PexelsAPI";
import PomodoroTimer from "./models/PomodoroTimer";

function App() {
    const [bgImg, setBackgroundImg] = useState(null);
    const [timer, setTimer] = useState(null);
    const [pomodoroTimer, setPomodoroTimer] = useState(
        new PomodoroTimer(1, 5, 15, false)
    );

    useEffect(() => {
        GetBackground(AssignPhotos);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            let time = pomodoroTimer.CountDownTimer();
            console.log(time.minutes, time.seconds);
            setTimer(time);
        }, 1000); // Update the timer every second

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [bgImg]);

    function AssignPhotos(fetchedObj) {
        console.log("Assigned Photo: ", fetchedObj);
        setBackgroundImg(fetchedObj.src.landscape);
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
                        {console.log("Timer: ", timer)}
                        <Home pomodoro={timer} />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default App;
