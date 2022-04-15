import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
	return (
		<div
			className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
			<LoadingOutlined style={{ fontSize: "40px", color: "#FFFFFF" }} />
			<h2 className="text-center text-white text-xl font-semibold">
				Loading...
			</h2>
			<p className="w-1/3 text-center text-white">
				This may take a few seconds, please don't close this page.
			</p>
		</div>
	);
};

export default Loading;
