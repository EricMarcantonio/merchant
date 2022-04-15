const HeroImage = () => {
    return (
        <div className="w-full relative">
            <div
                className="w-full h-full flex flex-col absolute top-0 left-0 justify-center items-center animate-pulse">
                <div className="text-6xl font-bold text-white">
                    Let's make it happen
                </div>
                <div className="text-lg text-white">
                    We'll give you the tech to put your best work forward.
                </div>
            </div>
            <img src="https://pbs.twimg.com/media/Es0FNXyXEAMqoBK?format=jpg&name=4096x4096"></img>
        </div>
    );
};

export default HeroImage;
