import React from 'react';

import { X } from 'react-feather';

import EventEmitter from '../System/EventEmitter';

import { modalAction } from '../ComponentsUtilities/ComponentsUtilities';

const ImageLightbox = () => {

	const modalId = 'image-lightbox';

	const [ photo, setPhoto ] = React.useState('');

	const onOpen = ({ detail : { images, index } }) => {

		setPhoto(images[0])
	}

	const onModalAction = ({ detail : { id, action } }) => {

		if (modalId != id) {

			return;
		}

		if (action == 'close') {

			setPhoto('');
		}
	}

	React.useEffect(() => {

		EventEmitter.on('ImageLightbox', onOpen);

		EventEmitter.on('ModalAction', onModalAction);

		return () => {

			EventEmitter.remove('ImageLightbox', onOpen);

			EventEmitter.remove('ModalAction', onModalAction);
		}
	}, []);

	return (

		<div>

			<input type="checkbox" id={modalId} className="modal-toggle" />

			<label onClick={() => modalAction(modalId, 'close')} className="modal">

				<div onClick={() => modalAction(modalId, 'close')} className="cursor-pointer flex justify-center items-center bg-black/50 w-12 h-12 rounded-full absolute top-10 right-10">

					<X size={27} className="text-white"/>

				</div>

				<div className="flex justify-center items-center w-screen h-screen bg-black/70">

					<div className="flex justify-center items-center">

						<img src={photo}/>

					</div>	

				</div>

			</label>

		</div>
	)
}

export default ImageLightbox;