/** @type {import('tailwindcss').Config} */

module.exports = {

	content: [

		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],

	theme: {

		extend: {}
	},

	daisyui: {

		themes: [
			
			{
				light: {

					...require("daisyui/src/colors/themes")["[data-theme=light]"],
					primary : '#4669e8',
					'error-content' : '#fff'
				},
			},
		],
	},

	corePlugins : {

		aspectRatio : false
	},

	plugins: [

		require('@tailwindcss/aspect-ratio'),
		require("daisyui")
	],
}