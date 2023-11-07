import classNames from 'classnames';

import { formatEngineStatus } from '../../ComponentsUtilities/ComponentsUtilities';

import { ENGINE_STATUS } from '../../Constants/Constants';

const EngineStatus = ({ status, className, ...rest }) => {

	const formats = {

		[ENGINE_STATUS.ATTATCHED] : {

			classNames : 'bg-green-100 text-green-500'
		},

		[ENGINE_STATUS.FREE] : {

			classNames : 'bg-orange-100 text-orange-500'
		},
	}

	return (

		<div className={classNames('rounded-xl px-3 py-1 font-semibold inline-flex first-letter:uppercase', className, formats[status].classNames)}>{ formatEngineStatus(status) }</div>
	)
}

export default EngineStatus;