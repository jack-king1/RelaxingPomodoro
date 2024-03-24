import React, { useState } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import useSound from "use-sound";
import startSfx from "../audio/start.mp3";
import endSfx from "../audio/end.mp3";

function TimerDisplay(props) {
    const [pauseBtnToggle, setPauseBtnToggle] = useState(true);
    const [startaudio] = useSound(startSfx);

    function PauseToggle() {
        if (props.time.minutes == 25) {
            //play start audio
            startaudio();
        }
        setPauseBtnToggle(!pauseBtnToggle);
        props.pomodoro.PauseTimer();
    }

    function StopTimer() {
        setPauseBtnToggle(true);
        props.pomodoro.StopTimer();
    }

    function setTimerState(state) {
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

    function CheckIfRerender() {
        console.log("i am being called!!!!");
    }
    return (
        <div className="bg-black bg-opacity-70 h-auto w-full text-white font-martian flex flex-col flex-center items-center rounded-3xl p-6">
            <div className="flex flex-row justify-center gap-6 w-full">
                <div
                    onClick={() => setTimerState("POMODORO")}
                    className={`text-center flex items-center  items-center hover:cursor-pointer p-1 rounded font-numans ${
                        props.timerState == "POMODORO"
                            ? "text-black bg-white"
                            : "text-white bg-none"
                    }`}
                >
                    <div>Pomodoro</div>
                </div>
                <div
                    onClick={() => setTimerState("SHORT")}
                    className={`text-center flex items-center hover:cursor-pointer font-numans p-1 rounded ${
                        props.timerState == "SHORT"
                            ? "text-black bg-white"
                            : "text-white bg-none"
                    }`}
                >
                    <div>Short Break</div>
                </div>
                <div
                    onClick={() => setTimerState("LONG")}
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
                    {props.time.minutes.toString().padStart(2, "0")}:
                    {props.time.seconds.toString().padStart(2, "0")}
                </div>
            </div>
            {RenderPauseBtn()}
        </div>
    );
}

export default TimerDisplay;
