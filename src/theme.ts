import { extendTheme } from '@chakra-ui/react';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const fonts = {
	base: 'Inter',
	heading: 'Space Mono',
};

const styles = {
	global: {
		body: {
			fontFamily: 'base',
			bg: 'gray.900',
			overflowX: 'hidden',
		},
		'*': {
			scrollbarWidth: 'thin',
			scrollbarColor: '#A2A2A2 #0A192F',
		},
		'*::-webkit-scrollbar': {
			width: '8px',
		},
		'*::-webkit-scrollbar-track': {
			background: '#252525',
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: '#A2A2A2',
			borderRadius: '10px',
		},
		'*::selection': {
			background: '#FF2E63',
			color: '#fff',
		},
		'*::-moz-selection': {
			background: '#FF2E63',
			color: '#fff',
		},
	},
};

const components = {
	Button: {
		variants: {
			outline: () => ({
				fontFamily: 'heading',
				fontWeight: 'regular',
				color: 'teal.100',
				borderColor: 'teal.100',
				borderRadius: '5px',
				_hover: {
					borderColor: 'teal.300',
				},
			}),
		},
	},
};

const colors = {
	gray: {
		200: '#64ffda',
		800: '#0a192f',
		900: '#0a192f',
	},
	teal: {
		100: '#f72a49',
		200: '#fa1e3f',
		300: '#fa0f33',
	},
};

const theme = extendTheme({
	config,
	fonts,
	styles,
	components,
	colors,
});

export default theme;
