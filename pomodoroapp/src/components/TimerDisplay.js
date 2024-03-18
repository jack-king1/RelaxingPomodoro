import React from "react";

function TimerDisplay(props) {
    return (
        <div className="bg-black bg-opacity-70 h-auto w-full text-white font-martian flex flex-col flex-center items-center rounded-3xl p-6">
            <div className="flex flex-row justify-center gap-6 w-full">
                <div className="hover:cursor-pointer font-numans">Pomodoro</div>
                <div className="hover:cursor-pointer font-numans">
                    Short Break
                </div>
                <div className="hover:cursor-pointer font-numans">
                    Long Break
                </div>
            </div>
            <div className="opacity-100 text-8xl text-center w-full">
                <div>
                    {props.pomodoro.minutes.toString().padStart(2, "0")}:
                    {props.pomodoro.seconds.toString().padStart(2, "0")}
                </div>
            </div>
            <div className="bg-white rounded-xl hover:cursor-pointer">
                <div className="text-4xl text-black p-3 font-numans">Pause</div>
            </div>
        </div>
    );
}

export default TimerDisplay;
