import { openLightbox } from "../ComponentsUtilities/ComponentsUtilities";

const Image = ({ src, className, alt='', ...rest }) => {

	const open = () => {

		openLightbox({

			images : [ src ],
			index : 0
		})
	}

	return (

		<img onClick={open} src={src} alt={alt} className={className} />
	)
}

export default Image;