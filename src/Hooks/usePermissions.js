import { COMPANY_ACCOUNT_STATUS, DRIVER_ACCOUNT_STATUS } from "../Constants/Constants";

const usePermissions = () => {

	const isCompanyActive = (company) => {

		return !!company && company.status === COMPANY_ACCOUNT_STATUS.ACTIVE
	}

	const isDriverActive = (driver) => {

		return !!driver && driver.status === DRIVER_ACCOUNT_STATUS.ACTIVE
	}

	const isDriverBlocked = (driver) => {

		return !!driver && driver.status === DRIVER_ACCOUNT_STATUS.BLOCKED
	}

	const isDriverInactive = (driver) => {

		return !!driver && driver.status === DRIVER_ACCOUNT_STATUS.INACTIVE
	}

	const hasEngineAttatched = (driver) => {

		return !!driver && ('engineId' in driver)
	}

	return {

		isCompanyActive,
		isDriverActive,
		isDriverBlocked,
		isDriverInactive,
		hasEngineAttatched
	}
}

export default usePermissions;