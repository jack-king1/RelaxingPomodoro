import React from "react";
import { FaSquareMinus } from "react-icons/fa6";

function Task(props) {
    return (
        <div className="flex gap-2 items-center">
            <div
                placeholder="Write Essay"
                className="bg-white rounded px-3 w-full py-2 min-h-full text-black"
            >
                {props.text}
            </div>
            <div
                onClick={() => {
                    props.removeTask(props.id);
                }}
            >
                <FaSquareMinus className="text-5xl hover:cursor-pointer transition-all hover:text-red-300" />
            </div>
        </div>
    );
}

export default Task;
