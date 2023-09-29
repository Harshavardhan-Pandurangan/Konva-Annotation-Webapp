import React, { useState } from "react";
import Canvas from "./canvas";
import Controls from "./controls";

export default function Konva() {
    const [currentAnnotation, setCurrentAnnotation] = useState(
        JSON.parse(localStorage.getItem("annotations"))[0]
    );

    function createAnnotation() {
        console.log("create annotation");
    }

    function editAnnotation(index) {
        console.log("edit annotation ", index);
        setCurrentAnnotation(
            JSON.parse(localStorage.getItem("annotations")).filter(
                (annotation) => annotation.index === index
            )[0]
        );
    }

    function updateAnnotation(annotation) {}

    function deleleAnnotation(index) {
        console.log("delete annotation ", index);
        if (currentAnnotation.index === index) {
            setCurrentAnnotation(
                JSON.parse(localStorage.getItem("annotations"))[0]
            );
        }
        localStorage.setItem(
            "annotations",
            JSON.stringify(
                JSON.parse(localStorage.getItem("annotations")).filter(
                    (annotation) => annotation.index !== index
                )
            )
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <div>
                <p className="font-mono text-6xl font-extrabold text-center mt-7">
                    Annotation with Konva
                </p>
            </div>
            <div className="flex flex-grow mt-7">
                <div className="w-2/3 h-full">
                    <Canvas
                        annotation={currentAnnotation}
                        updateAnnotation={updateAnnotation}
                    />
                </div>
                <div className="w-1/3 h-full">
                    <Controls
                        annotation_list={JSON.parse(
                            localStorage.getItem("annotations")
                        )}
                        annotation={currentAnnotation}
                        createAnnotation={createAnnotation}
                        editAnnotation={editAnnotation}
                        deleleAnnotation={deleleAnnotation}
                    />
                </div>
            </div>
        </div>
    );
}
