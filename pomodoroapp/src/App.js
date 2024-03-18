import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { GetBackground } from "./services/PexelsAPI";

function App() {
    const [bgImg, setBackgroundImg] = useState(null);
    useEffect(() => {
        GetBackground(AssignPhotos);
    }, []);

    function AssignPhotos(fetchedObj) {
        console.log("Assigned Photo: ", fetchedObj);
        setBackgroundImg(fetchedObj.src.landscape);
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
                        <Home />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default App;
