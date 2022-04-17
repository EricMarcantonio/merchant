const HeroImage = () => {
	return (
		<div className="w-full relative h-screen">
			<div
				className="w-full h-5/6 flex flex-col absolute top-0 left-0 justify-center items-center animate-pulse">
				<div className="text-6xl font-bold text-white">
					Welcome to Merchant
				</div>
				<div className="text-lg text-white">
					We got the tech covered.
				</div>
			</div>
			<img className={'h-full w-full'} src="https://pbs.twimg.com/media/Es0FNXyXEAMqoBK?format=jpg&name=4096x4096" />
		</div>
	);
};

export default HeroImage;
