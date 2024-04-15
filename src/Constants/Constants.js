export const APP_NAME = 'T.E.B.M';

export const URL = process.env.NODE_ENV === 'development' ? 'http://tebm.com:3000/company' : 'https://api.tebm-dz.com/company';

export const APP_KEY = '9AHgPCSP/PkzUinayPElBkB25qbj0+4/HWlupPVnsuQ=';

export const TRANSPORT_RIDE_STATUS = {

	WAITING : 'waiting',
	EXPIRED : 'expired',
	CANCELLED_BY_CLIENT : 'cancelled_by_client',
	CANCELLED_BY_DRIVER : 'cancelled_by_driver',
	DRIVER_ON_THE_WAY : 'driver_on_the_way',
	ONGOING : 'ongoing',
	COMPLETED : 'completed'
}

export const TRANSPORT_RIDE_REVENUES_STATUS = {

	PAID : 'paid',
	UNPAID : 'unpaid'
}

export const TRANSPORT_OFFER_STATUS = {

	WAITING : 'waiting',
	CANCELLED : 'cancelled',
	REJECTED : 'rejected',
	IGNORED : 'ignored',
	ACCEPTED : 'accepted'
}

export const TRANSPORT_RIDE_TYPES = {

	COMPANY_RIDE : 'company_ride',
	INDEPENDENT_RIDE : 'independent_ride'
}

export const DRIVER_ACCOUNT_STATUS = {

	ACTIVE : 'active',
	INACTIVE : 'inactive',
	BLOCKED : 'blocked'
}

export const DRIVER_ACCOUNT_TYPES = {

	COMPANY_DRIVER : 'company_driver',
	INDEPENDENT_DRIVER : 'independent_driver'
}

export const DRIVER_DRIVING_STATUS = {

	DRIVING : 'driving',
	FREE : 'free'
}

export const COMPANY_ACCOUNT_STATUS = {

	ACTIVE : 'active',
	BLOCKED : 'blocked'
}

export const ENGINE_OWNERSHIP_TYPES = {

	DRIVER_ENGINE : 'driver_engine',
	COMPANY_ENGINE : 'company_engine'
}

export const ENGINE_STATUS = {

	ATTATCHED : 'attached',
	FREE : 'free'
}

export const REVENUES_GROUP_BY = {

	DAYS : 'days',
	MONTHS : 'months',
	YEARS : 'years'
}