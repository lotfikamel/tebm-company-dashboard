import { nanoid } from 'nanoid';

import DAYS_OF_WEEK from '../Constants/DaysOfWeek';

import EventEmitter from '../System/EventEmitter';

import WILAYAS from '../Constants/Wilayas';

import { COMPANY_ACCOUNT_STATUS, DRIVER_ACCOUNT_STATUS, DRIVER_ACCOUNT_TYPES, DRIVER_DRIVING_STATUS, ENGINE_OWNERSHIP_TYPES, ENGINE_STATUS, REVENUES_GROUP_BY, TRANSPORT_OFFER_STATUS, TRANSPORT_RIDE_REVENUES_STATUS, TRANSPORT_RIDE_STATUS, TRANSPORT_RIDE_TYPES } from '../Constants/Constants';

export function formatFullName (firstName, lastName) {

	return `${firstName} ${lastName}`
}

export function formatDayName (day) {

	return DAYS_OF_WEEK[day];
}

export function formatWilayaName (day) {

	return WILAYAS[parseInt(day) - 1];
}

export function formatPrice (price) {

	return `${price} DA`
}

export function formatRating (rating) {

	return parseFloat(rating.toFixed(1)).toString()
}

export function formatNumber (number) {

	const formats = [

		{
			divider : 1000000,
			abbr : 'M'
		},

		{
			divider : 1000,
			abbr : 'K'
		}
	]

	for (let format of formats) {

		if (number >= format.divider) {

			return parseFloat((number / format.divider).toFixed(1)).toString() + format.abbr;
		}
	}

	return number
}

export function formatPercentage (percentage) {

	return `${percentage*100}%`;
}

export function capitalizeFirstLetter (text) {

	return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatCodeId (id) {

	return `#${id}`;
}

export function closeDrawer (id) {

	const drawerController = document.getElementById(id);

	if (!drawerController) {

		return;
	}

	if (drawerController.checked) {

		drawerController.click();
	}
}

export function modalAction (id, action='open') {

	const modalController = document.getElementById(id);

	if (!modalController) {

		return;
	}

	EventEmitter.emit('ModalAction', { action, id });

	modalController.checked = action === 'open';
}

export function openLightbox ({ images, index=0 }) {

	EventEmitter.emit('ImageLightbox', { images, index });

	modalAction('image-lightbox', 'open');
}

export function toast ({ message, type='danger', timeout=5000 }) {

	const types = {

		danger : {

			classes : 'bg-red-100 text-red-700'
		},

		success : {

			classes : 'bg-green-100 text-green-700'
		},

		infos : {

			classes : 'bg-blue-100 text-blue-700'
		}
	}

	const toastId = 'toast-' + nanoid();

	const toast = `<div id="${toastId}" class="flex items-center ${types[type]?.classes} rounded-lg px-6 py-4 max-w-sm">

		<p class="font-medium first-letter:uppercase">${message}</p>

	</div>`;

	const toastTopPlaceholder = document.getElementById('toast-top-placeholder');

	toastTopPlaceholder.innerHTML = toast + toastTopPlaceholder.innerHTML;

	const toastTimeout = setTimeout(() => {

		const toastElement = document.getElementById(toastId);

		if (toastElement) {

			toastElement.remove();
		}

		clearInterval(toastTimeout);
	}, timeout);
}

export function formatTransportRideStatus (status) {

	const formats = {

		[TRANSPORT_RIDE_STATUS.WAITING] : 'en attente d\'offres de chauffeurs...',
	
		[TRANSPORT_RIDE_STATUS.EXPIRED] : 'expiré',
	
		[TRANSPORT_RIDE_STATUS.CANCELLED_BY_CLIENT] : 'annulé par le client',
	
		[TRANSPORT_RIDE_STATUS.DRIVER_ON_THE_WAY] : 'chauffeur en route vers le client...',
	
		[TRANSPORT_RIDE_STATUS.ONGOING] : 'en cours de route...',
	
		[TRANSPORT_RIDE_STATUS.CANCELLED_BY_DRIVER] : 'annulé par le chauffeur',
	
		[TRANSPORT_RIDE_STATUS.COMPLETED] : 'terminé',
	}

	return formats[status]
}

export function formatTransportRideType (type) {

	const formats = {

		[TRANSPORT_RIDE_TYPES.COMPANY_RIDE] : 'course d\'entreprise',
	
		[TRANSPORT_RIDE_TYPES.INDEPENDENT_RIDE] : 'course indépendante'
	}

	return formats[type]
}

export function formatTransportRideRevenueStatus (status) {

	const formats = {

		[TRANSPORT_RIDE_REVENUES_STATUS.PAID] : 'revenus payés',
	
		[TRANSPORT_RIDE_REVENUES_STATUS.UNPAID] : 'revenus non payés'
	}

	return formats[status]
}

export function formatTransportOfferStatus (status) {

	const formats = {

		[TRANSPORT_OFFER_STATUS.WAITING] : 'en attente...',
	
		[TRANSPORT_OFFER_STATUS.CANCELLED] : 'annulé',
	
		[TRANSPORT_OFFER_STATUS.ACCEPTED] : 'accepté',
	
		[TRANSPORT_OFFER_STATUS.REJECTED] : 'rejeté',
	
		[TRANSPORT_OFFER_STATUS.IGNORED] : 'ignoré'
	}

	return formats[status]
}

export function formatDriverAccountStatus (status) {

	const formats = {

		[DRIVER_ACCOUNT_STATUS.ACTIVE] : 'actif',
	
		[DRIVER_ACCOUNT_STATUS.INACTIVE] : 'inactif',
	
		[DRIVER_ACCOUNT_STATUS.BLOCKED] : 'bloqué'
	}

	return formats[status]
}

export function formatDriverAccountType (type) {

	const formats = {

		[DRIVER_ACCOUNT_TYPES.INDEPENDENT_DRIVER] : 'indépendant',
	
		[DRIVER_ACCOUNT_TYPES.COMPANY_DRIVER] : 'chauffeur d\'entreprise'
	}

	return formats[type]
}

export function formatDriverDrivingStatusType (status) {

	const formats = {

		[DRIVER_DRIVING_STATUS.FREE] : 'libre',
	
		[DRIVER_DRIVING_STATUS.DRIVING] : 'conduit'
	}

	return formats[status]
}

export function formatCompanyAccountStatus (status) {

	const formats = {

		[COMPANY_ACCOUNT_STATUS.ACTIVE] : 'actif',
	
		[COMPANY_ACCOUNT_STATUS.BLOCKED] : 'bloqué'
	}

	return formats[status]
}

export function formatEngineOwnershipType (type) {

	const formats = {

		[ENGINE_OWNERSHIP_TYPES.COMPANY_ENGINE] : 'engin d\'entreprise',
	
		[ENGINE_OWNERSHIP_TYPES.DRIVER_ENGINE] : 'engin de chauffeur'
	}

	return formats[type]
}

export function formatEngineStatus (status) {

	const formats = {

		[ENGINE_STATUS.ATTATCHED] : 'attaché',
	
		[ENGINE_STATUS.FREE] : 'non attaché'
	}

	return formats[status]
}

export const formatRevenueGroupBy = (by) => {

	const formats = {

		[REVENUES_GROUP_BY.DAYS] : 'par jours',
		[REVENUES_GROUP_BY.MONTHS] : 'par mois',
		[REVENUES_GROUP_BY.YEARS] : 'par années'
	}

	return formats[by];
}

export const openDirectionInMap = ({ origin, destination }) => {

	let link =  "https://www.google.com/maps/dir/?api=1";

	if (origin) {

		const [ longitudeO, latitudeO ] = origin;

		link += '&origin=' + latitudeO + "," + longitudeO;
	}

	if (destination) {

		const [ longitudeD, latitudeD ] = destination;

		link += '&destination=' + latitudeD + "," + longitudeD;
	}	

	return link;
}

export const formatTime = (time) => {

	if (time === 0) {

		return '0 min';
	}

	let format = '';

	const hours = Math.floor(time / 60);

	const minutes = Math.floor( (time%60) );

	if (hours > 0) {

		format =  `${hours} heures`;
	}

	format = `${format} ${minutes} min`;

	return format.trim();
}

export const formatDistance = (distance) => {

	return `${parseFloat(distance).toFixed(1)} km`;
}

export const formatDriverPayLink = ({ driverId, startDate, endDate }) => {

	return `/revenues/driver-pay-debts/${driverId}?startDate=${startDate}&endDate=${endDate}`;
}

export const getPermittedTransportRidesStatus = () => {

	const status = {

		...TRANSPORT_RIDE_STATUS
	};

	delete status.WAITING;

	delete status.EXPIRED;

	return status;
}