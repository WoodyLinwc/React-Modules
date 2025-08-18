import React, { useState } from "react";
import cat1 from "../assets/images/cat1.png";
import cat2 from "../assets/images/cat2.png";
import cat3 from "../assets/images/cat3.png";

const ImageCarousel = () => {
    const images = [cat1, cat2, cat3];
    const [currentCat, setCurrentCat] = useState(cat1);

    const randomCat = () => {
        let index;
        let newCat;
        // keep picking until it's different
        do {
            index = Math.floor(Math.random() * images.length);
            newCat = images[index];
        } while (newCat === currentCat);

        setCurrentCat(images[index]);
    };

    return (
        <div>
            <div>
                <h2>Random Image</h2>
                <p>Total images: {images.length}</p>
                <img src={currentCat} alt="random cat" width={100} />
                <button onClick={randomCat}>Random</button>
            </div>

            <div>
                <h2>Image Carousel</h2>
            </div>
        </div>
    );
};

export default ImageCarousel;
