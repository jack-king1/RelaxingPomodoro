import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { useContext, useEffect, useRef, useState } from "react";
import { GetBackground } from "./services/PexelsAPI";
import PomodoroTimer from "./models/PomodoroTimer";
import { UserContext } from "./Contexts/UserContext";
import useSound from "use-sound";
import endSfx from "./audio/end.mp3";

function App() {
    const userContext = useContext(UserContext);
    const [bgImg, setBackgroundImg] = useState(null);

    const [endaudio] = useSound(endSfx);

    useEffect(() => {
        GetBackground(AssignPhotos);
        document.title = "25:00";
    }, []);

    function AssignPhotos(fetchedObj) {
        console.log("Assigned Photo: ", fetchedObj);
        setBackgroundImg(fetchedObj.src.landscape);
    }

    function AddTask(text) {
        let newArray = userContext.tasks;
        newArray.push(text);
        userContext.setTasks(newArray);
        //push task to database
    }

    return (
        <div className={`w-screen h-screen`}>
            {bgImg != null ? (
                <div
                    className={`w-full h-full flex`}
                    style={{
                        backgroundImage: `url(${bgImg})`,
                        backgroundSize: "cover", // You can adjust 'cover', 'contain', or specify a size like '100px 100px'
                    }}
                >
                    <div className="w-full p-2 mx-auto lg:w-1/3">
                        <Home
                            tasks={userContext.tasks}
                            setTasks={userContext.setTasks}
                            addTask={AddTask}
                        />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default App;
