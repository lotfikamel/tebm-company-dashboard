const Stat = ({ title, stat, IconComponent }) => {

	return (

		<div className="flex shadow-lg p-4 rounded-xl bg-white">

			<div className="flex justify-center items-center">

				<div className="bg-gray-100 p-3 rounded-full flex justify-center items-center">

					{ IconComponent }

				</div>

			</div>

			<div className="ml-4">			

				<div className="text-lg font-medium first-letter:uppercase text-stone-400">{ title }</div>

				<div className="text-3xl font-semibold">{ stat }</div>

			</div>

		</div>
	)
}

export default Stat;