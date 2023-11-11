import classNames from 'classnames';

import { formatCompanyAccountStatus } from '../../ComponentsUtilities/ComponentsUtilities';

import { COMPANY_ACCOUNT_STATUS } from '../../Constants/Constants';

const Status = ({ status, className, ...rest }) => {

	const formats = {

		[COMPANY_ACCOUNT_STATUS.ACTIVE] : {

			classNames : 'bg-green-100 text-green-500'
		},

		[COMPANY_ACCOUNT_STATUS.BLOCKED] : {

			classNames : 'bg-red-100 text-red-500'
		},
	}

	return (

		<div className={classNames('rounded-xl px-3 py-1 font-semibold inline-flex first-letter:uppercase', className, formats[status].classNames)}>{ formatCompanyAccountStatus(status) }</div>
	)
}

export default Status;