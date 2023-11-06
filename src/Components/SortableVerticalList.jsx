import React from 'react';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { NoDataAlert } from './Alerts';

export const SortableVerticalItem = React.memo(({ children, ...rest }) => {

	return (

		<Draggable {...rest}>

			{provided => (

				<div

					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>

					{ children }

				</div>
			)}

		</Draggable>
	)
});

export const SortableVerticalList = ({ listId, data, setData, onSortFinished, renderItems, showEmptyListComponent=true }) => {

	const reorder = (list, startIndex, endIndex) => {

		const result = Array.from(list);

		const [ removed ] = result.splice(startIndex, 1);

		result.splice(endIndex, 0, removed);

		return result;
	};

	const onDragEnd = (result) => {

		if (!result.destination) {

			return;
		}

		if (result.destination.index === result.source.index) {
			
			return;
		}

		const sortedData = reorder(

			data,
			result.source.index,
			result.destination.index
		);

		setData(sortedData);

		if (onSortFinished) {

			onSortFinished(result, sortedData);
		}
	}

	if (data.length === 0 && showEmptyListComponent) {

		return (

			<NoDataAlert/>
		)
	}

	return (

		<div className="sortable-vertical-list">

			<DragDropContext onDragEnd={onDragEnd}>

				<Droppable droppableId={listId}>

					{ provided => (

						<div ref={provided.innerRef} {...provided.droppableProps}>

							{ data.map(renderItems) }

							{provided.placeholder}

						</div>
					) }

				</Droppable>

			</DragDropContext>

		</div>
	)
}