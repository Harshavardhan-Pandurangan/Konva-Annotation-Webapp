import React, { useState, useEffect } from "react";

export default function Controls({
    createAnnotation,
    editAnnotation,
    deleleAnnotation,
}) {
    if (localStorage.getItem("annotations") === null) {
        localStorage.setItem("annotations", JSON.stringify([{ index: 0 }]));
    }

    const [annotations, setAnnotations] = useState(
        JSON.parse(localStorage.getItem("annotations"))
    );

    useEffect(() => {
        setAnnotations(JSON.parse(localStorage.getItem("annotations")));
    }, [localStorage.getItem("annotations")]);

    function setAnnotation(index) {
        return () => {
            console.log(index);
        };
    }

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
                {annotations.map((annotation, index) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-row w-full box-border border-4 p-2 border-gray-50 rounded-2xl mt-2"
                        >
                            <div className="w-1/2 h-full text-center align-middle py-3">
                                {"Annotation " + annotation.index}
                            </div>
                            <button
                                className="w-1/4 h-full bg-yellow-500 hover:bg-orange-700 text-white font-mono py-2 px-4 rounded-full center ml-4"
                                onClick={() => editAnnotation(annotation.index)}
                            >
                                Edit
                            </button>
                            <button
                                className="w-1/6 h-full bg-red-500 hover:bg-red-700 text-white font-mono py-2 px-4 rounded-full center ml-4 flex flex-row justify-center"
                                onClick={() => deleleAnnotation(index)}
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
