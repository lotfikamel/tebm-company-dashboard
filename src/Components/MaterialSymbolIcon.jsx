import classNames from 'classnames';

const MaterialSymbolIcon = ({ name, size, className }) => {

	const classes = classNames([
		
		'material-symbols-outlined',
		className
	])

	return (

		<span className={classes} style={{ fontSize : `${size}px` }}>{ name }</span>
	)
}

export default MaterialSymbolIcon;