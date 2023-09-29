import React, { useState } from "react";
import Canvas from "./canvas";
import Controls from "./controls";

export default function Konva() {
    if (localStorage.getItem("annotations") === null) {
        localStorage.setItem("annotations", JSON.stringify([]));
    }

    const [currentAnnotation, setCurrentAnnotation] = useState(
        JSON.parse(localStorage.getItem("annotations"))[0] || null
    );
    const [annotation_list, setAnnotation_list] = useState(
        JSON.parse(localStorage.getItem("annotations"))
    );

    function createAnnotation() {
        // find the least index that is not used
        let index = 0;
        while (
            JSON.parse(localStorage.getItem("annotations")).filter(
                (annotation) => annotation.index === index
            ).length > 0
        ) {
            index++;
        }
        const annotation = {
            index: index,
        };

        setCurrentAnnotation(annotation);
        localStorage.setItem(
            "annotations",
            JSON.stringify(
                JSON.parse(localStorage.getItem("annotations")).concat(
                    annotation
                )
            )
        );
        setAnnotation_list(JSON.parse(localStorage.getItem("annotations")));
    }

    function editAnnotation(index) {
        setCurrentAnnotation(
            JSON.parse(localStorage.getItem("annotations")).filter(
                (annotation) => annotation.index === index
            )[0]
        );
    }

    function updateAnnotation(annotation) {}

    function deleleAnnotation(index) {
        localStorage.setItem(
            "annotations",
            JSON.stringify(
                JSON.parse(localStorage.getItem("annotations")).filter(
                    (annotation) => annotation.index !== index
                )
            )
        );
        if (currentAnnotation.index === index) {
            setCurrentAnnotation(
                JSON.parse(localStorage.getItem("annotations"))[0]
            );
        }
        setAnnotation_list(JSON.parse(localStorage.getItem("annotations")));
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
                        annotation_list={annotation_list}
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
