import { Theme, type Options } from 'rehype-pretty-code';
import { createCssVariablesTheme } from 'shiki';
// import vercelLightTheme from "./lib/themes/vercel-light.json"

const myTheme = createCssVariablesTheme({
	name: 'snystrom',
	variablePrefix: '--code-',
	variableDefaults: {},
	fontStyle: true,
});

export const rehypeCodeOptions: Partial<Options> = {
	theme: myTheme as Theme,
	keepBackground: false,
	bypassInlineCode: true,
};
