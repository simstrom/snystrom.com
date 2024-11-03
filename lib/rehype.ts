import fs from 'fs';
import { type Options } from 'rehype-pretty-code';

export const rehypeCodeOptions: Partial<Options> = {
	theme: JSON.parse(fs.readFileSync('./lib/themes/snystrom-theme.json', 'utf-8')),
	keepBackground: false,
	bypassInlineCode: true,
};
