import React from "react";
import Canvas from "./canvas";
import Controls from "./controls";

export default function Konva() {
    function createAnnotation() {
        console.log("create annotation");
    }

    function editAnnotation(index) {
        console.log("edit annotation ", index);
    }

    function deleleAnnotation(index) {
        console.log("delete annotation ", index);
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
                    <Canvas />
                </div>
                <div className="w-1/3 h-full">
                    <Controls
                        createAnnotation={createAnnotation}
                        editAnnotation={editAnnotation}
                        deleleAnnotation={deleleAnnotation}
                    />
                </div>
            </div>
        </div>
    );
}
