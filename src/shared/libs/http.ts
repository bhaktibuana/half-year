import axios, { AxiosResponse, AxiosError, AxiosInstance } from 'axios';

import { getAccessToken, removeAccessToken } from '@/shared/utils';
import { env } from '@/configs';
import { I_ApiUrl } from '@/shared/interfaces';
import { T_ApiUrlType } from '@/shared/types';
import { notification } from 'antd';
import { goTo } from '@/shared/utils/navigate';

const apiUrl: I_ApiUrl = {
	app: env.APP_API_URL,
	putraBuanaCloud: env.PUTRA_BUANA_CLOUD_API_URL,
};

const globalResponseHandler = (response: AxiosResponse) => response;

const globalErrorHandler = (error: AxiosError) => {
	const status = error.response?.status;
	const isTokenExpired = status === 401;

	if (isTokenExpired) {
		removeAccessToken();
		goTo('/login');

		notification['error']({
			message: 'Autentikasi',
			description: 'Sesi login berakhir',
			placement: 'bottomRight',
		});
	}

	return Promise.reject(error);
};

const clientConfig = (
	urlType: T_ApiUrlType = 'app',
	accessToken: string | null = getAccessToken(),
): AxiosInstance =>
	axios.create({
		baseURL: apiUrl[urlType],
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

export const http = (
	urlType: T_ApiUrlType = 'app',
	accessToken: string | null = getAccessToken(),
): AxiosInstance => {
	const axiosClient = clientConfig(urlType, accessToken);
	axiosClient.interceptors.response.use(
		globalResponseHandler,
		globalErrorHandler,
	);
	return axiosClient;
};
