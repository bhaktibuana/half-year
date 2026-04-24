import React, { useEffect, useState } from 'react';

import { withPrivatePageLayout } from '@/components/layouts/private/page';
import PrivatePageContent from '@/components/layouts/private/content/PrivatePageContent';
import DefaultPageCard from '@/components/bases/card/default-page-card/DefaultPageCard';
import PageMenu from '@/components/pages/private/purchasing-tobacco/PageMenu';
import Scoreboard from '@/components/pages/private/purchasing-tobacco/Scoreboard';
import { useSearchParams } from 'react-router-dom';

import '@/pages/private/purchasing-tobacco/purchasingTobacco.scss';
import dayjs from 'dayjs';
import {
	I_PurchasingTobaccoListReqQuery,
	I_PurchasingTobaccoListResBody,
} from '@/shared/interfaces';
import TableMenu from '@/components/pages/private/purchasing-tobacco/TableMenu';
import {
	getDetailPurchasingTobacco,
	getPurchasingTobaccoList,
} from '@/apis/purchasingTobacco';
import { axiosErrorHandler } from '@/shared/helpers';
import { notification } from 'antd';
import DataTable from '@/components/pages/private/purchasing-tobacco/DataTable';
import FilterDrawer from '@/components/pages/private/purchasing-tobacco/FilterDrawer';
import { useNotificationContext } from '@/stores/contexts';

const PurchasingTobacco = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { newData } = useNotificationContext();

	const [data, setData] = useState<I_PurchasingTobaccoListResBody['data']>(
		[],
	);
	const [loading, setLoading] = useState(false);
	const [debounceTerm, setDebouncedTerm] = useState<string>('');
	const [pagination, setPagination] = useState<
		I_PurchasingTobaccoListResBody['pagination']
	>({});
	const [params, setParams] = useState<I_PurchasingTobaccoListReqQuery>({
		page: Number(searchParams.get('page')) || 1,
		per_page: Number(searchParams.get('per_page')) || 50,
		sort_by: searchParams.get('sort_by') || '',
		sort: searchParams.get('sort') || '',
		filter_purchasing_type:
			searchParams.get('filter_purchasing_type') || 'all',
		filter_status: searchParams.get('filter_status') || 'all',
		start_date:
			searchParams.get('start_date') ||
			dayjs().startOf('month').format('YYYY-MM-DD'),
		end_date:
			searchParams.get('end_date') ||
			dayjs().endOf('month').format('YYYY-MM-DD'),
		search: searchParams.get('search') || '',
		supplier_id: searchParams.get('supplier_id') || '',
		warehouse_id: searchParams.get('warehouse_id') || '',
	});
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const { data: res } = await getPurchasingTobaccoList(params);
			setData(res.data);
			setPagination(res.pagination);
		} catch (e) {
			axiosErrorHandler(e);
			notification.error({
				message: 'Pembelian Tembakau',
				description: 'Gagal memuat data',
				placement: 'bottomRight',
			});
		} finally {
			setLoading(false);
		}
	};

	const fetchNewDetail = async () => {
		try {
			const newCode = newData?.related_code as string;

			const { data: res } = await getDetailPurchasingTobacco(newCode);

			setData((prev) => {
				return prev.map((item) => {
					if (item.prcs_tbc_purchasing.code === newCode) {
						return {
							...res.data,
						};
					}
					return item;
				});
			});
		} catch (e) {
			axiosErrorHandler(e);
		}
	};

	useEffect(() => {
		fetchNewDetail();
	}, [newData]);

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
		params.sort_by,
		params.sort,
		params.start_date,
		params.end_date,
		params.filter_purchasing_type,
		params.filter_status,
		params.supplier_id,
		params.warehouse_id,
		debounceTerm,
	]);

	return (
		<>
			<PrivatePageContent pageName="Pembelian Tembakau">
				<div className="purchasing-tobacco-content-wrapper">
					<PageMenu params={params} setParams={setParams} />

					<Scoreboard params={params} setParams={setParams} />

					<DefaultPageCard>
						<TableMenu
							params={params}
							setParams={setParams}
							selectedRowKeys={selectedRowKeys}
							setOpenFilterDrawer={setOpenFilterDrawer}
						/>

						<DataTable
							data={data}
							setData={setData}
							setParams={setParams}
							loading={loading}
							pagination={pagination}
							selectedRowKeys={selectedRowKeys}
							setSelectedRowKeys={setSelectedRowKeys}
						/>
					</DefaultPageCard>
				</div>
			</PrivatePageContent>

			<FilterDrawer
				openFilterDrawer={openFilterDrawer}
				setOpenFilterDrawer={setOpenFilterDrawer}
				setParams={setParams}
			/>
		</>
	);
};

const Component = withPrivatePageLayout(PurchasingTobacco);

export default Component;
