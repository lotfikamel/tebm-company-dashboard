import React from "react";

import { nanoid } from 'nanoid';

import { Trash2 } from "react-feather";

import Image from "./Image";

import { SortableVerticalList, SortableVerticalItem } from "./SortableVerticalList";

const UploadFiles = ({ files, setFiles, deleteFile }) => {

	const onFileSelected = (e) => {

		const [ selectedFile ] = e.target.files;

		if (selectedFile) {

			const file = {

				_id : nanoid(),
				file : selectedFile,
				preview : window.URL.createObjectURL(selectedFile),
				fromServer : false
			}

			setFiles(prevFiles => [ ...prevFiles, file ]);
		}
	}

	const sortFiles = (newFiles) => {

		setFiles(newFiles);
	}

	const deletePhoto = (file) => {

		setFiles(prevFiles => prevFiles.filter(p => p._id !== file._id));

		if (deleteFile) {

			deleteFile(file);
		}
	}

	return (

		<div className="file-files">

			<div>
							
				<SortableVerticalList

					listId="files"
					data={files}
					setData={sortFiles}
					showEmptyListComponent={false}
					renderItems={(file, index) => (

						<SortableVerticalItem key={file._id} draggableId={file._id.toString()} index={index}>

							<div className="mb-4">

								<div className="flex justify-between items-center">

									<div className="uk-width-expand">

										<Image src={file.preview} className="rounded-lg w-32 border border-slate-200"/>

									</div>

									<button type="button" onClick={() => deletePhoto(file)} className="btn btn-ghost bg-stone-200 btn-square text-lg">
											
										<Trash2 size={20}/>

									</button>

								</div>

							</div>

						</SortableVerticalItem>
					)}
				/>

			</div>

			<div className="text-center">

				<input type="file" className="file-input file-input-bordered w-full max-w-xs" accept="image/png, image/jpeg" onChange={onFileSelected}/>

			</div>
			
		</div>
	)
}

export default UploadFiles;