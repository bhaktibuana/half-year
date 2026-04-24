import { getLocalTheme, getSystemTheme } from '@/shared/utils';

const light = {
	'color-primary': '#CD853F',
	'color-primary-hover': '#d89a5a',
	'color-primary-active': '#a3622c',
	'color-primary-selected': '#fde2c5',
	'color-primary-selected-hover': '#f1c195',
	'color-white': '#ffffff',
	'color-danger-primary': '#ff4d4f',
	'color-danger-secondary': '#fff2f0',
	'color-warning-primary': '#faad14',
	'color-warning-secondary': '#fffbe6',
	'color-info-primary': '#1677ff',
	'color-info-secondary': '#e6f4ff',
	'color-success-primary': '#52c41a',
	'color-success-secondary': '#f6ffed',
	'color-backdrop': '#00000080',
	'color-background-001': '#fdfdfc',
	'color-background-002': '#f5f5f5',
	'color-background-003': 'rgba(28, 28, 2, 0.075)',
	'color-background-004': 'rgba(255, 255, 255, 0.949)',
	'color-background-005': '#f9f9f9',
	'color-border-001': '#d9d9d9',
	'color-text-primary': '#fff8e7',
	'color-text-001': '#1b1b18',
	'color-text-002': '#706f6c',
	'color-text-003': '#1677FF',
	'color-stroke-001': '#0000000f',
	'color-shadow-001': '0px 1px 4px #92a1b03d',
	'skeleton-gradient-from-color': 'rgba(22, 22, 21, 0.06)',
	'skeleton-gradient-to-color': 'rgba(22, 22, 21, 0.15)',
};

const dark = {
	'color-primary': '#CD853F',
	'color-primary-hover': '#d89a5a',
	'color-primary-active': '#a3622c',
	'color-primary-selected': '#fde2c5',
	'color-primary-selected-hover': '#f1c195',
	'color-white': '#ffffff',
	'color-danger-primary': '#ff4d4f',
	'color-danger-secondary': '#fff2f0',
	'color-warning-primary': '#faad14',
	'color-warning-secondary': '#fffbe6',
	'color-info-primary': '#1677ff',
	'color-info-secondary': '#e6f4ff',
	'color-success-primary': '#52c41a',
	'color-success-secondary': '#f6ffed',
	'color-backdrop': '#00000080',
	'color-background-001': '#161615',
	'color-background-002': 'rgba(21, 21, 20, 0.8)',
	'color-background-003': 'rgba(253, 253, 237, 0.078)',
	'color-background-004': 'rgba(15, 15, 15, 0.949)',
	'color-background-005': '#f9f9f9',
	'color-border-001': '#d9d9d9',
	'color-text-primary': '#fff8e7',
	'color-text-001': '#ededec',
	'color-text-002': '#a1a09a',
	'color-text-003': '#1677FF',
	'color-stroke-001': '#f8f8f80f',
	'color-shadow-001': '0px 1px 4px #2f2f5666',
	'skeleton-gradient-from-color': 'rgba(253, 253, 252, 0.06)',
	'skeleton-gradient-to-color': 'rgba(253, 253, 252, 0.15)',
};

export const theme = () => {
	let localTheme = getLocalTheme();
	if (localTheme === 'auto') {
		localTheme = getSystemTheme();
	}
	if (localTheme === 'dark') return dark;
	return light;
};
