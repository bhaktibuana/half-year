import { aesDecrypt, aesEncrypt } from '@/shared/helpers';
import {
	ACCESS_TOKEN_KEY_NAME,
	APP_STATUS_KEY_NAME,
	APP_THEME,
	APP_THEME_KEY_NAME,
} from '@/shared/constants';
import { T_ThemeType } from '@/shared/types';

/**
 * Global Utils
 */
/**
 * Window Scroll to Top
 *
 * @returns (void)
 */
export const scrollTopTop = (): void => {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth',
	});
};

/**
 * Find localstorage encrypted key
 *
 * @param name
 * @returns
 */
const findLocalStorageKey = (name: string) => {
	const localStorageKeys = Object.keys(localStorage);
	return localStorageKeys.length > 0
		? localStorageKeys.find((key) => {
				const decryptedKey = aesDecrypt(key);
				return decryptedKey !== null && decryptedKey === name;
		  })
		: undefined;
};

/**
 * Get localstorage value by key
 *
 * @param name
 * @returns
 */
const getLocalStorageValue = (name: string) => {
	const value = localStorage.getItem(findLocalStorageKey(name) || '');
	return value === null ? null : aesDecrypt(value);
};

/**
 * Set localstorage value
 *
 * @param name
 * @param payload
 */
const setLocalStorageValue = (name: string, payload: string) => {
	const key = aesEncrypt(name);
	payload = aesEncrypt(payload);
	localStorage.setItem(key, payload);
};

/**
 * Remove local storage by key
 *
 * @param name
 */
const removeLocalStorageValue = (name: string) => {
	const key = findLocalStorageKey(name) || '';
	if (key !== null) localStorage.removeItem(key);
};

/**
 * Access Token Utils
 */
/**
 * Get access_token value
 *
 * @returns
 */
export const getAccessToken = () => {
	return getLocalStorageValue(ACCESS_TOKEN_KEY_NAME);
};

/**
 * Set access_token value
 *
 * @param payload
 */
export const setAccessToken = (payload: string) => {
	setLocalStorageValue(ACCESS_TOKEN_KEY_NAME, payload);
};

/**
 * Remove access_token value
 */
export const removeAccessToken = () => {
	removeLocalStorageValue(ACCESS_TOKEN_KEY_NAME);
};

/**
 * Theme Utils
 */
/**
 * Get app_theme value
 *
 * @returns
 */
export const getLocalTheme = () => {
	return getLocalStorageValue(APP_THEME_KEY_NAME);
};

/**
 * Set app_theme value
 *
 * @param payload
 */
export const setLocalTheme = (payload: string) => {
	setLocalStorageValue(APP_THEME_KEY_NAME, payload);
};

/**
 * Get OS system theme
 *
 * @returns
 */
export const getSystemTheme = () => {
	const systemPrefersDark = window.matchMedia(
		'(prefers-color-scheme: dark)',
	).matches;

	if (systemPrefersDark) {
		return 'dark';
	} else {
		return 'light';
	}
};

/**
 * Set app_theme global style
 *
 * @param theme
 */
export const setAppTheme = (theme: T_ThemeType) => {
	const themeValue = APP_THEME.map((item) => item.value);
	const selectedTheme = APP_THEME.find((item) => item.key === theme);
	document.body.classList.remove(...themeValue);
	document.body.classList.add(selectedTheme?.value || '_theme-light');
};

/**
 * Init app_theme
 */
export const initAppTheme = (
	ctxThemeSetter:
		| ((value: React.SetStateAction<T_ThemeType>) => void)
		| null = null,
) => {
	const defaultTheme: T_ThemeType = 'light';
	let localTheme = getLocalTheme();

	if (localTheme) {
		if (ctxThemeSetter !== null) ctxThemeSetter(localTheme as T_ThemeType);
		if (localTheme === 'auto') {
			localTheme = getSystemTheme();
		}
		setAppTheme(localTheme as T_ThemeType);
	} else {
		setLocalTheme(defaultTheme as T_ThemeType);
		setAppTheme(defaultTheme as T_ThemeType);
		if (ctxThemeSetter !== null)
			ctxThemeSetter(defaultTheme as T_ThemeType);
	}
};

/**
 * App Status Utils
 */
/**
 * Set app_status value
 *
 * @param payload
 */
export const setAppStatus = (payload: string) => {
	setLocalStorageValue(APP_STATUS_KEY_NAME, payload);
};

/**
 * Get app_status value
 *
 * @returns
 */
export const getAppStatus = () => {
	return getLocalStorageValue(APP_STATUS_KEY_NAME);
};
