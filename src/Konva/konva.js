import Canvas from "./canvas";
import Controls from "./controls";

export default function Konva() {
    return (
        <div class="flex flex-col h-screen">
            <div>
                <p class="font-mono text-6xl font-extrabold text-center mt-7">
                    Annotation with Konva
                </p>
            </div>
            <div class="flex flex-grow mt-7">
                <div class="w-2/3 h-full">
                    <Canvas />
                </div>
                <div class="w-1/3 h-full">
                    <Controls />
                </div>
            </div>
        </div>
    );
}
