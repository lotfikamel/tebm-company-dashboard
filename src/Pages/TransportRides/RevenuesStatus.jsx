import classNames from 'classnames';

import { formatTransportRideRevenueStatus } from '../../ComponentsUtilities/ComponentsUtilities';

import { TRANSPORT_RIDE_REVENUES_STATUS } from '../../Constants/Constants';

const RevenuesStatus = ({ status, className, ...rest }) => {

	const formats = {

		[TRANSPORT_RIDE_REVENUES_STATUS.PAID] : {

			classNames : 'bg-green-100 text-green-500'
		},

		[TRANSPORT_RIDE_REVENUES_STATUS.UNPAID] : {

			classNames : 'bg-red-100 text-red-500'
		},
	}

	return (

		<div className={classNames('rounded-xl px-3 py-1 font-semibold inline-flex first-letter:uppercase', className, formats[status].classNames)}>{ formatTransportRideRevenueStatus(status) }</div>
	)
}

export default RevenuesStatus;