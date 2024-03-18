import React from "react";
import { FaCog } from "react-icons/fa";

function Navbar() {
    return (
        <div className="flex justify-between text-white mx-4">
            <div className="font-bold text-2xl">PomoRelax</div>
            <div>
                <FaCog className="text-xl" />
            </div>
        </div>
    );
}

export default Navbar;
