import React, { useState, useEffect } from "react";

export default function Controls({
    annotation_list,
    annotation,
    createAnnotation,
    editAnnotation,
    deleleAnnotation,
}) {
    if (localStorage.getItem("annotations") === null) {
        localStorage.setItem("annotations", JSON.stringify([]));
    }

    const [currentAnnotation, setCurrentAnnotation] = useState(annotation);

    const [annotations, setAnnotations] = useState(
        JSON.parse(localStorage.getItem("annotations"))
    );

    useEffect(() => {
        setCurrentAnnotation(annotation);
        setAnnotations(JSON.parse(localStorage.getItem("annotations")));
    }, [annotation_list, annotation]);

    return (
        <div className="flex flex-col h-full mr-10">
            <div className="flex flex-col h-1/7 mt-3">
                <p className="font-mono text-4xl font-extrabold text-center">
                    Annotations list
                </p>
            </div>
            <div className="flex h-1/7 mt-3 justify-center">
                <button
                    className="w-1/2 h-full bg-blue-500 hover:bg-blue-700 text-white font-mono py-2 px-4 rounded-full center"
                    onClick={createAnnotation}
                >
                    Add annotation
                </button>
            </div>
            <div className="flex flex-col flex-grow h-4/7 overflow-auto mt-10">
                {/* list of annotations by mapping */}
                {annotations.map((annotation_, index) => {
                    return (
                        <div
                            key={annotation_.index}
                            className="flex flex-row w-full box-border border-4 p-2 border-gray-50 rounded-2xl mt-2"
                            style={{
                                backgroundColor:
                                    currentAnnotation.index ===
                                    annotation_.index
                                        ? "#FDE047"
                                        : "#FFFFFF",
                            }}
                        >
                            <div className="w-1/2 h-full text-center align-middle py-3">
                                {"Annotation " + annotation_.index}
                            </div>
                            <button
                                className="w-1/4 h-full bg-yellow-500 hover:bg-orange-700 text-white font-mono py-2 px-4 rounded-full center ml-4"
                                onClick={() =>
                                    editAnnotation(annotation_.index)
                                }
                            >
                                Edit
                            </button>
                            <button
                                className="w-1/6 h-full bg-red-500 hover:bg-red-700 text-white font-mono py-2 px-4 rounded-full center ml-4 flex flex-row justify-center"
                                onClick={() =>
                                    deleleAnnotation(annotation_.index)
                                }
                            >
                                <img
                                    src="/images/delete.png"
                                    className="align-center center h-full"
                                />
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-col h-1/7 mt-3"></div>
        </div>
    );
}

// <Transformer
//     ref={(node) => {
//         if (node) {
//             node.getLayer().batchDraw();
//         }
//     }}
//     rotateEnabled={true}
//     keepRatio={true}
//     enabledAnchors={[
//         "top-left",
//         "top-right",
//         "bottom-left",
//         "bottom-right",
//         "middle-left",
//         "middle-right",
//         "top-center",
//         "bottom-center",
//     ]}
// />
