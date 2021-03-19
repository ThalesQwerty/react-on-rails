import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React from "react";

export const theme = createMuiTheme({
	spacing: 16,
	palette: {
		type: 'dark',
		primary: {
			main: '#9925f8',
			dark: '#8007e4',
			light: '#b156fa'
		},
		secondary: {
			main: '#23df64',
			dark: '#1ab751',
			light: '#51e685'
		}
	},
	typography: {
		fontWeight: 400,
		fontSize: 16,
		h1: {
			fontSize: "4rem",
			fontWeight: 800
		},
		h2: {
			fontSize: "2.5rem",
			fontWeight: 800
		},
		body1: {
			fontSize: "1rem",
			fontWeight: 400
		},
		body2: {
			fontSize: "0.9rem",
			fontWeight: 400
		}
	},
});

export default function Theming({ children }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
