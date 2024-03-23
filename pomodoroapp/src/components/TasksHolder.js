import React, { useContext, useState } from "react";
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import Task from "./Task";
import { deleteTask, setTask } from "../services/DBAPI";
import { UserContext } from "../Contexts/UserContext";

function TasksHolder(props) {
    const userContext = useContext(UserContext);
    const [taskInput, setTaskInput] = useState("");

    function CreateNewTask() {
        if (taskInput != "") {
            props.addTask(taskInput);
            if (userContext.user != null && userContext.loggedIn) {
                //if user logged in send task to database to save.
                setTask(userContext.user.id, taskInput);
            }

            setTaskInput("");
        }
    }

    function removeTask(id) {
        console.log("remove: ", id);
        const newArray = [...userContext.tasks];
        if (userContext.user != null && userContext.loggedIn) {
            //if user logged in send task to database to save.
            deleteTask(userContext.user.id, userContext.tasks[id]);
        }
        // Remove item at indexToRemove using splice
        newArray.splice(id, 1);
        // Update state with the new array
        userContext.setTasks(newArray);
    }

    function HandleInput(e) {
        setTaskInput(e.target.value);
    }

    const handleKeyPress = (event) => {
        // Check if the pressed key is Enter (key code 13)
        if (event.key === "Enter") {
            CreateNewTask();
        }
    };

    return (
        <div className="bg-black bg-opacity-70 h-auto w-full text-white font-numans flex flex-col  rounded-3xl p-6 mt-4">
            <div className="text-xl">Tasks</div>
            <div className="w-full">
                <div className="flex gap-2 items-center">
                    <input
                        value={taskInput}
                        onChange={HandleInput}
                        placeholder="Enter a new task..."
                        className="bg-white rounded px-3 py-2 w-full text-black"
                        maxLength={30}
                        onKeyDown={handleKeyPress} // Attach event handler to input's onKeyPress event
                    ></input>
                    <div onClick={CreateNewTask}>
                        <FaSquarePlus className="text-5xl transition-all hover:text-green-300 hover:cursor-pointer" />
                    </div>
                </div>

                {/* This task needs a component file!!! */}
                {props.tasks.map((task, index) => {
                    return (
                        <Task
                            key={index}
                            removeTask={removeTask}
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
