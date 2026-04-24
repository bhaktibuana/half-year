import React, { useEffect, useState } from 'react';

import { withPrivatePageLayout } from '@/components/layouts/private/page';
import PrivatePageContent from '@/components/layouts/private/content/PrivatePageContent';
import DefaultPageCard from '@/components/bases/card/default-page-card/DefaultPageCard';

import '@/pages/private/import-history/importHistory.scss';
import DataTable from '@/components/pages/private/import-history/DataTable';
import {
	I_FileImportListReqQuery,
	I_FileImportListResBody,
} from '@/shared/interfaces';
import { axiosErrorHandler } from '@/shared/helpers';
import { notification } from 'antd';
import { getFileImportList } from '@/apis/fileImport';
import { useNotificationContext } from '@/stores/contexts';
import dayjs from 'dayjs';
import TableMenu from '@/components/pages/private/import-history/TableMenu';
import { useSearchParams } from 'react-router-dom';

const ImportHistory = () => {
	const { isNewDataExist } = useNotificationContext();
	const [searchParams, setSearchParams] = useSearchParams();

	const [data, setData] = useState<I_FileImportListResBody['data']>([]);
	const [loading, setLoading] = useState(false);
	const [debounceTerm, setDebouncedTerm] = useState<string>('');
	const [pagination, setPagination] = useState<
		I_FileImportListResBody['pagination']
	>({});
	const [params, setParams] = useState<I_FileImportListReqQuery>({
		page: Number(searchParams.get('page')) || 1,
		per_page: Number(searchParams.get('per_page')) || 50,
		start_date:
			searchParams.get('start_date') ||
			dayjs().startOf('month').format('YYYY-MM-DD'),
		end_date:
			searchParams.get('end_date') ||
			dayjs().endOf('month').format('YYYY-MM-DD'),
		search: searchParams.get('search') || '',
	});

	const fetchData = async () => {
		setLoading(true);
		try {
			const { data: res } = await getFileImportList(params);
			setData(res.data);
			setPagination(res.pagination);
		} catch (e) {
			axiosErrorHandler(e);
			notification.error({
				message: 'Riwayat - Import Data',
				description: 'Gagal memuat data',
				placement: 'bottomRight',
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const newSearchParams = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value !== '' && value !== null && value !== undefined) {
				newSearchParams.set(key, String(value));
			}
		});

		setSearchParams(newSearchParams);
	}, [params, setSearchParams]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedTerm(params.search);
		}, 300); // debounce delay in ms

		return () => {
			clearTimeout(timer);
		};
	}, [params.search]);

	useEffect(() => {
		fetchData();
	}, [
		params.page,
		params.per_page,
		params.start_date,
		params.end_date,
		isNewDataExist,
		debounceTerm,
	]);

	return (
		<>
			<PrivatePageContent pageName="Riwayat Import Data">
				<div className="import-history-content-wrapper">
					<DefaultPageCard>
						<TableMenu params={params} setParams={setParams} />

						<DataTable
							data={data}
							setData={setData}
							setParams={setParams}
							loading={loading}
							pagination={pagination}
						/>
					</DefaultPageCard>
				</div>
			</PrivatePageContent>
		</>
	);
};

const Component = withPrivatePageLayout(ImportHistory);

export default Component;
