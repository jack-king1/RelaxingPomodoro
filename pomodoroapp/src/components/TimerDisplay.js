import React from "react";

function TimerDisplay() {
    return (
        <div className="bg-black bg-opacity-70 h-auto w-full text-white font-numans flex flex-col flex-center items-center rounded-3xl p-6">
            <div className="flex flex-row justify-center gap-6 w-full">
                <div>Pomodoro</div>
                <div>Short Break</div>
                <div>Long Break</div>
            </div>
            <div className="opacity-100 text-8xl text-center mx-auto">
                14:52
            </div>
            <div className="bg-white rounded-xl">
                <div className="text-4xl text-black p-3 ">Pause</div>
            </div>
        </div>
    );
}

export default TimerDisplay;
