import React from 'react';

import { Star } from 'react-feather';

const FiveStarsRating = ({ currentRating, onRatingChange, active=false, starSize=25 }) => {

	const onChange = (rating) => {

		if (!active) {

			return;
		}

		onRatingChange(rating)
	}

	return (

		<div className="flex items-center space-x-2">

			{ [...Array(currentRating)].map((e, index) => (
				
				<div key={index} onClick={() => onChange(index + 1)}>

					<Star size={starSize} className="text-amber-500"/>

				</div>
			)) }
			
		</div>
	)
}

export default FiveStarsRating;