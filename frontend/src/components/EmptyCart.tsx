const EmptyCart = () => {
	return (
		<div
			className="
          flex
          items-center
          justify-center
          w-screen
          h-screen
          bg-gray-400
        "
		>
			<div className="px-40 py-20 bg-white rounded-md shadow-xl">
				<div className="flex flex-col items-center">
					<h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
						You don't have any items in your cart
					</h6>

					<p className="mb-8 text-center text-gray-500 md:text-lg">
						Please add an item to see your cart.
					</p>
				</div>
			</div>
		</div>
	);
};

export default EmptyCart;
