import classNames from 'classnames';

import { formatTransportRideStatus } from '../../ComponentsUtilities/ComponentsUtilities';

import { TRANSPORT_RIDE_STATUS } from '../../Constants/Constants';

const TransportRideStatus = ({ status, className, ...rest }) => {

	const formats = {

		[TRANSPORT_RIDE_STATUS.WAITING] : {

			classNames : 'bg-amber-100 text-amber-500'
		},

		[TRANSPORT_RIDE_STATUS.CANCELLED_BY_CLIENT] : {

			classNames : 'bg-red-100 text-red-500'
		},

		[TRANSPORT_RIDE_STATUS.CANCELLED_BY_DRIVER] : {

			classNames : 'bg-red-100 text-red-500'
		},

		[TRANSPORT_RIDE_STATUS.EXPIRED] : {

			classNames : 'bg-red-100 text-red-500'
		},

		[TRANSPORT_RIDE_STATUS.DRIVER_ON_THE_WAY] : {

			classNames : 'bg-blue-100 text-blue-500'
		},

		[TRANSPORT_RIDE_STATUS.ONGOING] : {

			classNames : 'bg-sky-100 text-sky-500'
		},

		[TRANSPORT_RIDE_STATUS.COMPLETED] : {

			classNames : 'bg-green-100 text-green-500'
		},
	}

	return (

		<div className={classNames('rounded-xl px-3 py-1 font-semibold inline-flex first-letter:uppercase', className, formats[status].classNames)}>{ formatTransportRideStatus(status) }</div>
	)
}

export default TransportRideStatus;