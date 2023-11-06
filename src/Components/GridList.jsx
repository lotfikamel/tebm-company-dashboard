import React from 'react';

import classNames from 'classnames';

import { ChevronRight } from 'react-feather';

import { NoDataAlert } from './Alerts';

import { Spinner } from './Loaders';

const GridList = ({

	data,
	renderElements,
	isFetchingNextPage,
	hasNextPage,
	fetchNextPage,
	className,
	enablePagination=true
}) => {

	const classes = classNames('grid', className);

	if (data.length === 0) {

		return (

			<NoDataAlert/>
		)
	}

	return (

		<div className="grid-list">

			<div className={classes}>

				{ data.map(renderElements) }

			</div>

			{ enablePagination && hasNextPage && (

				<div className="flex mt-4">

					<div className="ml-auto">

						{ isFetchingNextPage ? (

							<Spinner/>
						) : (

							<div onClick={fetchNextPage} className="flex justify-center items-center text-stone-500 cursor-pointer">

								<span className="mr-2">Charger plus</span>

								<ChevronRight/>

							</div>
						) }

					</div>

				</div>
			) }

		</div>
	);
}

export default React.memo(GridList);