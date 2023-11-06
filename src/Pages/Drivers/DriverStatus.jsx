import classNames from 'classnames';

import { formatDriverAccountStatus } from '../../ComponentsUtilities/ComponentsUtilities';

import { DRIVER_ACCOUNT_STATUS } from '../../Constants/Constants';

const DriverStatus = ({ status, className, ...rest }) => {

	const formats = {

		[DRIVER_ACCOUNT_STATUS.ACTIVE] : {

			classNames : 'bg-green-100 text-green-500'
		},

		[DRIVER_ACCOUNT_STATUS.INACTIVE] : {

			classNames : 'bg-orange-100 text-orange-500'
		},

		[DRIVER_ACCOUNT_STATUS.BLOCKED] : {

			classNames : 'bg-red-100 text-red-500'
		},
	}

	return (

		<div className={classNames('rounded-xl px-3 py-1 font-semibold inline-flex first-letter:uppercase', className, formats[status].classNames)}>{ formatDriverAccountStatus(status) }</div>
	)
}

export default DriverStatus;