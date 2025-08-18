import React, { useState } from "react";
import SimpleFetch from "./SimpleFetch";
import RetryFetch from "./RetryFetch";
import HookFetch from "./HookFetch";
import ImageCarousel from "./ImageCarousel";
import LoopJSON from "./LoopJson";

const PopupComponent = () => {
    const [activeComponent, setActiveComponent] = useState("");

    return (
        <div>
            <button onClick={() => setActiveComponent("simpleFetch")}>
                Simple Fetch
            </button>

            <button onClick={() => setActiveComponent("retryFetch")}>
                Retry Fetch
            </button>

            <button onClick={() => setActiveComponent("hookFetch")}>
                Hook Fetch
            </button>

            <button onClick={() => setActiveComponent("imageFetch")}>
                Image Fetch
            </button>

            <button onClick={() => setActiveComponent("loopJSON")}>
                Loop JSON
            </button>

            <a
                href="https://github.com/WoodyLinwc/React-Modules/tree/main/react-demos/src/fetchapi"
                target="_blank"
            >
                GitHub
            </a>

            {activeComponent === "simpleFetch" && <SimpleFetch />}
            {activeComponent === "retryFetch" && <RetryFetch />}
            {activeComponent === "hookFetch" && <HookFetch />}
            {activeComponent === "imageFetch" && <ImageCarousel />}
            {activeComponent === "loopJSON" && <LoopJSON />}
        </div>
    );
};

export default PopupComponent;
