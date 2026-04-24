import { T_AvatarColorPair } from '@/shared/types';

export const APP_NAME = 'buana-erp-app';
export const APP_LABEL = 'Buana ERP';
export const APP_KEY =
	'10c4638843000b61ee8ef73576a35ea939f0a32da6a316ef561295626e562bd6';

export const ACCESS_TOKEN_KEY_NAME = 'access_token';
export const APP_THEME_KEY_NAME = 'app_theme';
export const APP_STATUS_KEY_NAME = 'app_status';

export const APP_THEME = [
	{
		key: 'light',
		value: '_theme-light',
	},
	{
		key: 'dark',
		value: '_theme-dark',
	},
];

export const APP_THEME_OPTIONS = [
	{
		key: 'auto',
		label: 'Automatic',
	},
	{
		key: 'light',
		label: 'Light',
	},
	{
		key: 'dark',
		label: 'Dark',
	},
];

export const AVATAR_COLOR_PAIRS: T_AvatarColorPair[] = [
	{ backgroundColor: '#fde3cf', color: '#f56a00' },
	{ backgroundColor: '#e6f7ff', color: '#1890ff' },
	{ backgroundColor: '#f6ffed', color: '#52c41a' },
	{ backgroundColor: '#fff1f0', color: '#f5222d' },
	{ backgroundColor: '#f9f0ff', color: '#722ed1' },
	{ backgroundColor: '#fcffe6', color: '#a0d911' },
	{ backgroundColor: '#e6fffb', color: '#13c2c2' },
];
