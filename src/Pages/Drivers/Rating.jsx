import React from "react";

import { ExternalLink } from "react-feather";

import { Link } from "react-router-dom";

import FiveStarsRating from "../../Components/FiveStarsRating";

import { formatFullName } from "../../ComponentsUtilities/ComponentsUtilities";

const Rating = ({ review }) => {

	return (

		<div className="bg-white p-4 space-y-2 shadow-lg rounded-xl">

			<Link to={`/users/profile/${review.userId}`}>

				<div className="flex">

					<img src={review.user.photo.src} className="w-12 h-12 rounded-full" />

					<div className="ml-2">

						<div className="font-medium">{ formatFullName(review.user.firstName, review.user.lastName) }</div>

						<FiveStarsRating currentRating={review.rating} starSize={20}/>

					</div>

				</div>

			</Link>

			{ review.reviewNote && <p>{ review.reviewNote }</p> }

			<Link to={`/rides/details/${review._id}`} className="px-4 py-2 rounded-xl bg-blue-100 inline-flex items-center w-auto">

				<span className="mr-1">voir la course</span>

				<ExternalLink size={20}/>

			</Link>

		</div>
	)
}

export default React.memo(Rating);