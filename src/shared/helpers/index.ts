import CryptoJS from 'crypto-js';
import { AxiosError } from 'axios';
import { pathToRegexp } from 'path-to-regexp';

import { APP_KEY, AVATAR_COLOR_PAIRS } from '@/shared/constants';
import { T_AvatarColorPair, T_TopNavMenu } from '@/shared/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
	I_FileImportListResBody,
	I_FormatCompleteAddressParam,
	I_TopNavMenu,
} from '@/shared/interfaces';
import {
	IMPORT_JOB_NAME_LABEL_MASTER_ITEM_CLOVE,
	IMPORT_JOB_NAME_LABEL_MASTER_ITEM_SAUCE,
	IMPORT_JOB_NAME_LABEL_MASTER_ITEM_TOBACCO,
	IMPORT_JOB_NAME_LABEL_MASTER_SUPPLIER,
	IMPORT_JOB_NAME_LABEL_MASTER_WAREHOUSE,
	IMPORT_JOB_NAME_MASTER_ITEM_CLOVE,
	IMPORT_JOB_NAME_MASTER_ITEM_SAUCE,
	IMPORT_JOB_NAME_MASTER_ITEM_TOBACCO,
	IMPORT_JOB_NAME_MASTER_SUPPLIER,
	IMPORT_JOB_NAME_MASTER_WAREHOUSE,
} from '@/shared/constants/fileImport';

// Extend plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Crypto Helpers
 */
/**
 * AES Encrypt
 *
 * @param payload
 * @returns
 */
export const aesEncrypt = (payload: string) => {
	const IV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
	return CryptoJS.AES.encrypt(payload, CryptoJS.enc.Utf8.parse(APP_KEY), {
		iv: IV,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	}).toString();
};

/**
 * AES Decrypt
 *
 * @param payload
 * @returns
 */
export const aesDecrypt = (payload: string) => {
	try {
		const IV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

		const bytes = CryptoJS.AES.decrypt(
			payload,
			CryptoJS.enc.Utf8.parse(APP_KEY),
			{
				iv: IV,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7,
			},
		);

		const decrypted = bytes.toString(CryptoJS.enc.Utf8);

		if (!decrypted) throw new Error('Decryption failed');

		return decrypted;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return null;
	}
};

/**
 * Axios Helpers
 */
/**
 * Parse Axios error
 *
 * @param error
 * @returns
 */
export const axiosErrorHandler = (error: unknown) => {
	if (error instanceof AxiosError) return error;
	return null;
};

/**
 * Avatar Helpers
 */
/**
 * Generate Avatar Color Pair
 *
 * @param name
 * @returns
 */
export const getAvatarColor = (name: string = ''): T_AvatarColorPair => {
	const hashString = (str: string): number => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		return Math.abs(hash);
	};

	const hash = hashString(name);
	return AVATAR_COLOR_PAIRS[hash % AVATAR_COLOR_PAIRS.length];
};

/**
 * Generate Avatar Initial Chars
 *
 * @param name
 * @returns
 */
export const getAvatarInitials = (name: string = ''): string => {
	const words = name.trim().split(/\s+/);
	if (words.length === 1) {
		return words[0].substring(0, 2).toUpperCase();
	}
	return (words[0][0] + words[1][0]).toUpperCase();
};

/**
 * Format Timezone UTC+7 (Asia/Jakarta)
 *
 * @param date
 * @returns
 */
export const formatDateTime = (
	date: Date | undefined,
	dateOnly: boolean = false,
) => {
	if (dateOnly) return dayjs(date).tz('Asia/Jakarta').format('DD-MM-YYYY');
	return dayjs(date).tz('Asia/Jakarta').format('HH:mm DD-MM-YYYY');
};

/**
 * Format Complete Address
 *
 * @param value
 * @returns
 */
export const formatCompleteAddress = (value: I_FormatCompleteAddressParam) => {
	const address = value.address;
	const subdistrict = value.subdistrict ? `, ${value.subdistrict}` : '';
	const city = value.city ? `, ${value.city}` : '';
	const province = value.province ? `, ${value.province}` : '';
	const postalCode = value.postal_code ? ` (${value.postal_code})` : '';
	return address + subdistrict + city + province + postalCode;
};

/**
 * Split City Prefix
 *
 * @param value
 * @returns
 */
export const splitCity = (value: string) => {
	if (value === '' || !value) return { prefix: 'Kota', value: '' };
	const valueSplit = value.split(' ');
	return { prefix: valueSplit[0], value: valueSplit.slice(1).join(' ') };
};

/**
 * Generate Google Maps Link
 *
 * @param value
 * @returns
 */
export const generateGoogleMapsLink = (value: I_FormatCompleteAddressParam) => {
	if (value.latitude && value.longitude) {
		return `https://www.google.com/maps?q=${value.latitude},${value.longitude}`;
	}
	return '';
};

/**
 * Format Rupiah Currency
 *
 * @param value
 * @returns
 */
export const rupiahFormatter = (value: number) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
};

/**
 * Format Indonesia Number
 *
 * @param value
 * @returns
 */
export const indonesiaNumberFormatter = (value: number) => {
	return new Intl.NumberFormat('id-ID', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(Number(value));
};

/**
 * Get String Inside Braces
 *
 * @param str
 * @returns
 */
export const getInsideBraces = (str: string) => {
	const match = str.match(/\(([^)]+)\)/);
	const result = match ? match[1] : '';
	return result;
};

/**
 * Generate Breadcrumb Path
 *
 * @param menu
 * @param currentPath
 * @param path
 * @returns
 */
export const findBreadcrumbPath = (
	menu: T_TopNavMenu,
	currentPath: string,
	path: I_TopNavMenu[] = [],
): I_TopNavMenu[] | null => {
	for (const item of menu) {
		const newPath = [...path, item];

		if (pathToRegexp(item.key).regexp.test(currentPath)) {
			return newPath;
		}

		if (item.children) {
			const result = findBreadcrumbPath(
				item.children,
				currentPath,
				newPath,
			);
			if (result) return result;
		}
	}
	return null;
};

/**
 * Generate Sorter Params
 *
 * @param sorter
 * @returns
 */
export const generateSorterParam = (sorter: {
	field: string | undefined;
	order: string | undefined;
}) => {
	if (sorter.field && sorter.order) {
		const order = sorter.order === 'ascend' ? 'asc' : 'desc';
		return {
			sort_by: sorter.field,
			sort: order,
		};
	}
	return {
		sort_by: '',
		sort: '',
	};
};

/**
 * Format Flexible Date Time
 *
 * @param dateInput
 * @returns
 */
export const formatFlexDate = (dateInput: string | Date) => {
	const date = dayjs(dateInput);
	const today = dayjs();

	if (date.isSame(today, 'day')) {
		return date.format('HH.mm');
	} else {
		return date.format('D/M/YY');
	}
};

export const handleImportHistryData = (
	data: I_FileImportListResBody['data'][0],
) => {
	const output = {
		description: '',
		navigateTo: '',
	};

	switch (data.job_name) {
		case IMPORT_JOB_NAME_MASTER_ITEM_TOBACCO:
			output.description = IMPORT_JOB_NAME_LABEL_MASTER_ITEM_TOBACCO;
			output.navigateTo = '/master-data/item/tobacco';
			break;
		case IMPORT_JOB_NAME_MASTER_ITEM_CLOVE:
			output.description = IMPORT_JOB_NAME_LABEL_MASTER_ITEM_CLOVE;
			output.navigateTo = '/master-data/item/clove';
			break;
		case IMPORT_JOB_NAME_MASTER_ITEM_SAUCE:
			output.description = IMPORT_JOB_NAME_LABEL_MASTER_ITEM_SAUCE;
			output.navigateTo = '/master-data/item/sauce';
			break;
		case IMPORT_JOB_NAME_MASTER_WAREHOUSE:
			output.description = IMPORT_JOB_NAME_LABEL_MASTER_WAREHOUSE;
			output.navigateTo = '/master-data/warehouse';
			break;
		case IMPORT_JOB_NAME_MASTER_SUPPLIER:
			output.description = IMPORT_JOB_NAME_LABEL_MASTER_SUPPLIER;
			output.navigateTo = '/master-data/supplier';
			break;
		default:
			break;
	}
	return output;
};

/**
 * Parse to Decimal
 *
 * @param value
 * @param decimals
 * @returns
 */
export const toDecimal = (
	value: string | number,
	decimals: number = 4,
): number => {
	if (value === undefined || value === null) return 0;
	const num = typeof value === 'string' ? parseFloat(value) : value;

	if (isNaN(num)) return 0; // fallback kalau input kosong/invalid

	return parseFloat(num.toFixed(decimals));
};
