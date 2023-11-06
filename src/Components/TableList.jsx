import React from 'react';

import classNames from 'classnames';

import { ChevronRight } from 'react-feather';

import { NoDataAlert } from './Alerts';

import { Spinner } from './Loaders';

const TableList = ({

	data,
	headers,
	renderElements,
	isFetchingNextPage,
	hasNextPage,
	fetchNextPage,
	className,
	enablePagination=true
}) => {

	const classes = classNames('table table-zebra w-full', className)

	if (data.length === 0) {

		return (

			<NoDataAlert/>
		)
	}

	return (

		<div className="table-list overflow-x-auto">

			<table className={classes}>

				<thead>

					<tr>
						
						{ headers.map(h => (

							<th key={h}>{ h }</th>
						))  }

					</tr>
					
				</thead>

				<tbody>

					{ data.map(renderElements) }

				</tbody>

			</table>

			{ enablePagination && hasNextPage && (

				<div className="flex">

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

export default React.memo(TableList);