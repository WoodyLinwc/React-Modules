import React, { useEffect, useState } from "react";
import { images } from "../assets/images/images";
import cat1 from "../assets/images/cat1.png";
import cat2 from "../assets/images/cat2.png";
import cat3 from "../assets/images/cat3.png";

const ImageCarousel = () => {
    const cats = [cat1, cat2, cat3];
    const [currentCat, setCurrentCat] = useState(cat1);

    const [currentIndex, setCurrenIndex] = useState(0);
    const [auto, setAuto] = useState(false);

    const randomCat = () => {
        let index;
        let newCat;
        // keep picking until it's different
        do {
            index = Math.floor(Math.random() * cats.length);
            newCat = cats[index];
        } while (newCat === currentCat);

        setCurrentCat(cats[index]);
    };

    const left = () => {
        setCurrenIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const right = () => {
        setCurrenIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        if (!auto) return;

        let interval;

        interval = setInterval(() => {
            left();
        }, 2000);

        return () => {
            clearTimeout(interval);
        };
    });

    return (
        <div>
            <div>
                <h2>Random Image</h2>
                <p>Total images: {cats.length}</p>
                <img src={currentCat} alt="random cat" width={100} />
                <button onClick={randomCat}>Random</button>
            </div>

            <div>
                <h2>Image Carousel</h2>
                <p>Total images: {images.length}</p>
                <img src={images[currentIndex]} alt="image" />
                <br />
                <button onClick={left}>Left</button>
                <button onClick={right}>Right</button>
                <button onClick={() => setAuto(!auto)}>
                    {auto ? "Stop" : "Resume"}
                </button>
            </div>
        </div>
    );
};

export default ImageCarousel;
