import React, { useState, useEffect } from "react";
import {
    Stage,
    Layer,
    Image as KonvaImage,
    Rect,
    Transformer,
} from "react-konva";
import useImage from "use-image";

export default function Canvas({ annotation, updateAnnotation }) {
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

    // annotation layer
    const [currentAnnotation, setCurrentAnnotation] = useState(annotation);
    const rectRef = React.useRef(null);
    const trRef = React.useRef(null);

    useEffect(() => {
        if (annotation) {
            trRef.current.nodes([rectRef.current]);
            trRef.current.getLayer().batchDraw();
        }
        setCurrentAnnotation(annotation);
    }, [annotation]);

    function updateCurrentAnnotation(annotation) {
        annotation.index = currentAnnotation.index;
        annotation.fill = currentAnnotation.fill;
        annotation.width = Math.max(5, annotation.width);
        annotation.height = Math.max(5, annotation.height);
        annotation.x = Math.max(0, annotation.x);
        annotation.y = Math.max(0, annotation.y);
        annotation.rotation = annotation.rotation % 360;

        setCurrentAnnotation(annotation);
        updateAnnotation(annotation);
    }

    return (
        <Stage
            width={window.innerWidth * 0.66}
            height={window.innerHeight * 0.8}
        >
            <Layer>
                {/* image layer */}
                <KonvaImage
                    image={image}
                    x={imageX}
                    y={imageY}
                    scaleX={imageScale}
                    scaleY={imageScale}
                />
            </Layer>
            <Layer>
                {/* annotation layer */}
                {/* do not make the rectangle if annotation is null */}
                {currentAnnotation && (
                    <>
                        <Rect
                            ref={rectRef}
                            x={
                                // if currentAnnotation.x is -1, then set it to the center of the canvas
                                currentAnnotation.x === -1
                                    ? window.innerWidth * 0.33 - 50
                                    : currentAnnotation.x
                            }
                            y={
                                // if currentAnnotation.y is -1, then set it to the center of the canvas
                                currentAnnotation.y === -1
                                    ? window.innerHeight * 0.4 - 50
                                    : currentAnnotation.y
                            }
                            width={currentAnnotation.width}
                            height={currentAnnotation.height}
                            fill={currentAnnotation.fill}
                            rotation={currentAnnotation.rotation}
                            rotateEnabled={true}
                            draggable
                            onDragEnd={(e) => {
                                updateCurrentAnnotation({
                                    ...currentAnnotation,
                                    x: e.target.x(),
                                    y: e.target.y(),
                                    rotation: e.target.rotation(),
                                });
                            }}
                            onTransformEnd={(e) => {
                                const node = e.target;
                                const scaleX = node.scaleX();
                                const scaleY = node.scaleY();

                                // we will reset it back
                                node.scaleX(1);
                                node.scaleY(1);
                                updateCurrentAnnotation({
                                    ...currentAnnotation,
                                    x: node.x(),
                                    y: node.y(),
                                    width: Math.max(5, node.width() * scaleX),
                                    height: Math.max(node.height() * scaleY),
                                });
                            }}
                            // rotationSnaps={[0, 90, 180, 270]}
                        />

                        <Transformer
                            ref={trRef}
                            rotateEnabled={true}
                            keepRatio={false}
                            enabledAnchors={[
                                "top-left",
                                "top-right",
                                "bottom-left",
                                "bottom-right",
                                "middle-left",
                                "middle-right",
                                "top-center",
                                "bottom-center",
                            ]}
                            rotateAnchorOffset={50}
                        />
                    </>
                )}
            </Layer>
        </Stage>
    );
}
