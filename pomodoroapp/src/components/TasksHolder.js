import React from "react";
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";

function TasksHolder() {
    return (
        <div className="bg-black bg-opacity-70 h-auto w-full text-white font-numans flex flex-col  rounded-3xl p-6 mt-4">
            <div className="text-xl">Tasks</div>
            <div className="w-full">
                <div className="flex gap-2 items-center">
                    <input
                        placeholder="Write Essay"
                        className="bg-white rounded px-3 py-2 w-full"
                    ></input>
                    <div>
                        <FaSquarePlus className="text-5xl transition-all hover:text-green-300 hover:cursor-pointer" />
                    </div>
                </div>

                {/* This task needs a component file!!! */}
                <div className="flex gap-2 items-center">
                    <div
                        placeholder="Write Essay"
                        className="bg-white rounded px-3 w-full py-2 min-h-full text-black"
                    >
                        Task 1
                    </div>
                    <div>
                        <FaSquareMinus className="text-5xl hover:cursor-pointer transition-all hover:text-red-300" />
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <div
                        placeholder="Write Essay"
                        className="bg-white rounded px-3 w-full py-2 min-h-full text-black"
                    >
                        Task 2
                    </div>
                    <div>
                        <FaSquareMinus className="text-5xl hover:cursor-pointer transition-all hover:text-red-300" />
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <div
                        placeholder="Write Essay"
                        className="bg-white rounded px-3 w-full py-2 min-h-full text-black"
                    >
                        Task 3
                    </div>
                    <div>
                        <FaSquareMinus className="text-5xl hover:cursor-pointer transition-all hover:text-red-300" />
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <div
                        placeholder="Write Essay"
                        className="bg-white rounded px-3 w-full py-2 min-h-full text-black"
                    >
                        Task 4
                    </div>
                    <div>
                        <FaSquareMinus className="text-5xl hover:cursor-pointer transition-all hover:text-red-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TasksHolder;
