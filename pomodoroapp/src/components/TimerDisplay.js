import React, { useEffect, useState } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import useSound from "use-sound";
import startSfx from "../audio/start.mp3";
import endSfx from "../audio/end.mp3";
import PomodoroTimer from "../models/PomodoroTimer";

function TimerDisplay(props) {
    const [pauseBtnToggle, setPauseBtnToggle] = useState(true);
    const [startaudio] = useSound(startSfx);
    const [te, setTE] = useState(false); // Initialize with initial value //keep track if timer has reached 00:00 te = TIMER END
    const [timer, setTimer] = useState(null);
    const [pomodoroTimer, setPomodoroTimer] = useState(
        new PomodoroTimer(25, 5, 15, true)
    );
    const [timerIntervalId, setTimerIntervalId] = useState(null);
    const [timerState, setTimerState] = useState("POMODORO");

    useEffect(() => {
        pomodoroTimer.InitTimer();
    }, []);

    function PauseToggle() {
        if (pomodoroTimer.liveMinutes == 25) {
            //play start audio
            startaudio();
        }
        setPauseBtnToggle(!pauseBtnToggle);
        pomodoroTimer.PauseTimer();
        if (pomodoroTimer.isPaused) {
            let intervalId = setInterval(Pomodoro, 250);
            setTimerIntervalId(intervalId);
        } else {
            //clear interval and set pause timer time to now
            pomodoroTimer.pauseTime = Date.now();
            clearInterval(timerIntervalId);
        }
    }

    function Pomodoro() {
        pomodoroTimer.CountDownTimerDateTime();
    }

    function StopTimer() {
        setPauseBtnToggle(true);
        props.pomodoro.StopTimer();
    }

    function setNewTimerState(state) {
        props.setTimerState(state);
        //pause timer on state change
        StopTimer();
        if (state == "LONG") {
            console.log("Long Break:", props.pomodoro.longBreak);
            props.setTimer(props.pomodoro.ChangeStateToLongBreak());
        } else if (state == "SHORT") {
            props.setTimer(props.pomodoro.ChangeStateToShortBreak());
        } else {
            props.setTimer(props.pomodoro.ChangeStateToPomodoroTimer());
        }
    }

    function RenderPauseBtn() {
        if (pauseBtnToggle) {
            return (
                <div className="bg-white rounded-xl hover:cursor-pointer">
                    <div
                        onClick={() => PauseToggle()}
                        className="text-4xl text-black p-3 font-numans"
                    >
                        <FaCirclePlay />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="bg-white rounded-xl hover:cursor-pointer">
                    <div
                        onClick={() => PauseToggle()}
                        className="text-4xl text-black p-3 font-numans"
                    >
                        <FaCirclePause />
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="bg-black bg-opacity-70 h-auto w-full text-white font-martian flex flex-col flex-center items-center rounded-3xl p-6">
            <div className="flex flex-row justify-center gap-6 w-full">
                <div
                    onClick={() => setNewTimerState("POMODORO")}
                    className={`text-center flex items-center  items-center hover:cursor-pointer p-1 rounded font-numans ${
                        props.timerState == "POMODORO"
                            ? "text-black bg-white"
                            : "text-white bg-none"
                    }`}
                >
                    <div>Pomodoro</div>
                </div>
                <div
                    onClick={() => setNewTimerState("SHORT")}
                    className={`text-center flex items-center hover:cursor-pointer font-numans p-1 rounded ${
                        props.timerState == "SHORT"
                            ? "text-black bg-white"
                            : "text-white bg-none"
                    }`}
                >
                    <div>Short Break</div>
                </div>
                <div
                    onClick={() => setNewTimerState("LONG")}
                    className={`text-center flex items-center hover:cursor-pointer font-numans p-1 rounded ${
                        props.timerState == "LONG"
                            ? "text-black bg-white"
                            : "text-white bg-none"
                    }`}
                >
                    <div>Long Break</div>
                </div>
            </div>
            <div className="opacity-100 text-8xl text-center w-full">
                <div>
                    {pomodoroTimer.liveMinutes.toString().padStart(2, "0")}:
                    {pomodoroTimer.liveSeconds.toString().padStart(2, "0")}
                </div>
            </div>
            {RenderPauseBtn()}
        </div>
    );
}

export default TimerDisplay;
