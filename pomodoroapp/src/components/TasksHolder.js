import React from "react";
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import Task from "./Task";

function TasksHolder(props) {
    console.log(props);
    return (
        <div className="bg-black bg-opacity-70 h-auto w-full text-white font-numans flex flex-col  rounded-3xl p-6 mt-4">
            <div className="text-xl">Tasks</div>
            <div className="w-full">
                <div className="flex gap-2 items-center">
                    <input
                        placeholder="Write Essay"
                        className="bg-white rounded px-3 py-2 w-full text-black"
                    ></input>
                    <div>
                        <FaSquarePlus className="text-5xl transition-all hover:text-green-300 hover:cursor-pointer" />
                    </div>
                </div>

                {/* This task needs a component file!!! */}
                {props.tasks.map((task, index) => {
                    console.log("Task: ", task);
                    return (
                        <Task
                            removeTask={props.removeTask}
                            id={index}
                            text={task}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default TasksHolder;
