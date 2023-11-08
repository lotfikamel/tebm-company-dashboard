import moment from 'moment';

import { Link } from 'react-router-dom';

import { ArrowRight } from 'react-feather';

import { formatPrice } from '../ComponentsUtilities/ComponentsUtilities';

import { REVENUES_GROUP_BY } from '../Constants/Constants';

const Debt = ({ debt, payLink, groupBy=REVENUES_GROUP_BY.DAYS }) => {

	const formats = {

		[REVENUES_GROUP_BY.DAYS] : 'DD MMMM YYYY',
		[REVENUES_GROUP_BY.MONTHS] : 'MMMM YYYY',
		[REVENUES_GROUP_BY.YEARS] : 'YYYY'
	}

	return (

		<div className="shadow-md bg-white p-4 rounded-xl flex items-center justify-between">

			<div className="text-stone-500">{ moment(debt.creationDate).format(formats[groupBy]) }</div>

			<div>

				<div className="text-stone-500">Dettes</div>

				<div className="font-bold text-red-500">{ formatPrice(debt.totalDebts) }</div>

			</div>

			<div>

				<div className="text-stone-500">Courses</div>

				<div className="font-bold">{ debt.totalRides}</div>

			</div>

			{ payLink && (

				<div>
				
					<Link to={payLink} className="btn btn-sm btn-primary space-x-2">

						<span>régler</span>

						<ArrowRight size={16}/>

					</Link>

				</div>
			) }

		</div>
	)
}

export default Debt;