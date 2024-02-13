import 'styled-components';

import { darkTheme } from './darkTheme';

export type ITheme = typeof darkTheme;

declare module 'styled-components' {
	export interface DefaultTheme extends ITheme {}
}
