import moment from 'moment';

import { ArrowRight } from 'react-feather';

import { Link } from 'react-router-dom';

import { formatPrice } from '../ComponentsUtilities/ComponentsUtilities';

const Debt = ({ debt, payLink }) => {

	return (

		<div className="shadow-md bg-white p-4 rounded-xl flex items-center justify-between">

			<div className="text-stone-500">{ moment(debt.creationDate).format('DD MMMM YYYY') }</div>

			<div>

				<div className="text-stone-500">Dettes</div>

				<div className="font-bold text-red-500">{ formatPrice(debt.totalDebts) }</div>

			</div>

			<div>

				<div className="text-stone-500">Courses</div>

				<div className="font-bold">{ debt.totalRides}</div>

			</div>

			<div>
				
				<Link to={payLink} className="btn btn-sm btn-primary space-x-2">

					<span>régler</span>

					<ArrowRight size={16}/>

				</Link>

			</div>

		</div>
	)
}

export default Debt;