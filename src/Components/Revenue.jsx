import moment from 'moment';

import { formatPrice } from '../ComponentsUtilities/ComponentsUtilities';

import { REVENUES_GROUP_BY } from "../Constants/Constants";

const Revenue = ({ revenue, groupBy }) => {

	const formats = {

		[REVENUES_GROUP_BY.DAYS] : 'DD MMMM YYYY',
		[REVENUES_GROUP_BY.MONTHS] : 'MMMM YYYY',
		[REVENUES_GROUP_BY.YEARS] : 'YYYY'
	}

	return (

		<div className="shadow-lg bg-white p-4 rounded-xl">

			<div className="text-stone-500">{ moment(revenue.creationDate).format(formats[groupBy]) }</div>

			<div className="flex justify-between items-center">

				<div>revenus</div>

				<div className="font-bold text-green-500">{ formatPrice(revenue.totalRevenues) }</div>

			</div>

			<div className="flex justify-between items-center">

				<div>courses</div>

				<div className="font-bold">{ revenue.totalRides}</div>

			</div>

		</div>
	)
}

export default Revenue;