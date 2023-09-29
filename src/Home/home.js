export default function Home() {
    // make a component that just shows the title of the webpage along with the maker's name, using tailwindcss

    return (
        <div className="h-screen flex items-center">
            <div>
                <p className="font-mono text-7xl font-extrabold text-center">
                    Annotation with Konva
                </p>
                <p className="font-mono text-2xl font-extrabold text-center mt-3">
                    ~Harshavardhan Pandurangan
                </p>
                <div className="w-screen flex justify-center mt-20">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full center">
                        <a href="/konva">Start Annotating</a>
                    </button>
                </div>
            </div>
        </div>
    );
}
