import { COMPANY_ACCOUNT_STATUS, DRIVER_ACCOUNT_STATUS, TRANSPORT_RIDE_TYPES } from "../Constants/Constants";

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

	const isCompanyTransportRide = (ride) => {

		return !!ride && ride.type === TRANSPORT_RIDE_TYPES.COMPANY_RIDE;
	}

	return {

		isCompanyActive,
		isDriverActive,
		isDriverBlocked,
		isDriverInactive,
		hasEngineAttatched,
		isCompanyTransportRide
	}
}

export default usePermissions;