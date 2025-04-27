


function LoadingScreen() {

    return (
        <div className="loading-container">
            <div className="text-[48px] font-bold tracking-[2px] text-white relative inline-block">
                <span className="letter">N</span>
                <span className="letter">E</span>
                <span className="letter">Z</span>
                <span className="letter">T</span>
                <span className="letter">O</span>
            </div>
            <div className="loading-line"></div>
            <div className="flicker"></div>
        </div>
    )
};

export default LoadingScreen;