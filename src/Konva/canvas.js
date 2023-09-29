import React, { useState, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

export default function Canvas() {
    // need a stage with 2 layers: one for the image, one for the annotations
    const [image] = useImage("/images/test1.jpg");
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [imageX, setImageX] = useState(0);
    const [imageY, setImageY] = useState(0);
    const [imageScale, setImageScale] = useState(1);

    useEffect(() => {
        if (image) {
            setImageWidth(image.width);
            setImageHeight(image.height);
        }
    }, [image]);

    useEffect(() => {
        if (imageWidth > 0 && imageHeight > 0) {
            const stageWidth = window.innerWidth * 0.56;
            const stageHeight = window.innerHeight * 0.7;
            const scaleX = stageWidth / imageWidth;
            const scaleY = stageHeight / imageHeight;
            const scale = Math.min(scaleX, scaleY);
            const x =
                (stageWidth - imageWidth * scale) / 2 +
                window.innerWidth * 0.05;
            const y =
                (stageHeight - imageHeight * scale) / 2 +
                window.innerHeight * 0.05;
            setImageX(x);
            setImageY(y);
            setImageScale(scale);
        }
    }, [imageWidth, imageHeight]);

    return (
        <Stage
            width={window.innerWidth * 0.66}
            height={window.innerHeight * 0.8}
        >
            <Layer>
                <KonvaImage
                    image={image}
                    x={imageX}
                    y={imageY}
                    scaleX={imageScale}
                    scaleY={imageScale}
                />
            </Layer>
            <Layer>{/*  */}</Layer>
        </Stage>
    );
}
