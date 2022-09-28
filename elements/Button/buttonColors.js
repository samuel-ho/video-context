import colors from '../../../styles/colors';

export default {
	red: {
		solid: '#e81a1a',
		top: colors.red.gradient.top,
		bottom: colors.red.gradient.bottom,
		hover: {
			top: colors.red.gradient.topDark,
			bottom: colors.red.gradient.bottomDark,
			color: 'white'
		},
	},
	blue: {
		solid: '#2629ef',
		top: colors.blue.gradient.top,
		bottom: colors.blue.gradient.bottom,
		hover: {
			top: colors.blue.gradient.topDark,
			bottom: colors.blue.gradient.bottomDark,
			color: 'white'
		},
	},
	orange: {
		solid: '#F6714D',
		top: '#ff5d0f',
		bottom: '#dc0a58',
		color: 'white',
		hover: {
			top: '#ea1616',
			bottom: '#b31a1a',
			color: 'white',
        },
	},
	white: {
		solid: "#000",
		top: 0,
		bottom: 0,
		color: "#000",
		hover: {
			top: 0,
			bottom: 0,
			color: 'black',
		}

	}
}