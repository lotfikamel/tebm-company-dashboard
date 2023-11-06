import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

import useStateRef from './useStateRef';

const useFiles = (config) => {

	/**
	 * File array
	 * @var {Array<Object>}
	 */
	const [ files, setFiles, filesRef ] = useStateRef([]);

	const [ previews, setPreviews ] = useState([]);

	const onFilesSelected = (event) => {

		setFiles([]);

		setPreviews([]);

		for (let i=0; i<Math.min(config.maxFiles, event.target.files.length); i++) {

			const f = {

				id : nanoid(),
				file : event.target.files[i]
			}

			setFiles(prevFiles => [...prevFiles, f]);
		}
	}

	const setImagePreviews = () => {

		setPreviews([]);

		filesRef.current.forEach(file => {

			const p = {

				id : file.id,
				src : window.URL.createObjectURL(file.file)
			}

			setPreviews(prevPreviews => [...prevPreviews, p]);
		});
	}

	const deleteFile = (id) => {

		setFiles(prevFiles => prevFiles.filter(file => file.id !== id));

		setPreviews(prevPreviews => prevPreviews.filter(preview => preview.id !== id));

		setImagePreviews();
	}

	useEffect(() => {

		setPreviews([]);

		files.forEach(file => {

			const p = {

				id : file.id,
				src : window.URL.createObjectURL(file.file)
			}

			setPreviews(prevPreviews => [...prevPreviews, p]);
		});
	}, [files]);

	return {

		files,
		setFiles,
		filesRef,
		previews,
		onFilesSelected,
		deleteFile
	}
}

export default useFiles;