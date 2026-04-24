import React, { useEffect, useState } from 'react';
import { notification } from 'antd';

import { withPrivatePageLayout } from '@/components/layouts/private/page';
import PrivatePageContent from '@/components/layouts/private/content/PrivatePageContent';
import DefaultPageCard from '@/components/bases/card/default-page-card/DefaultPageCard';
import DataTable from '@/components/pages/private/master-item/DataTable';
import {
	I_MasterItemDetailResBody,
	I_MasterItemListReqQuery,
	I_MasterItemListResBody,
} from '@/shared/interfaces';
import { axiosErrorHandler } from '@/shared/helpers';
import {
	bulkDeleteMasterItem,
	deleteMasterItem,
	getMasterItemList,
} from '@/apis/masterItem';
import TableMenu from '@/components/pages/private/master-item/TableMenu';
import ModalCreation from '@/components/pages/private/master-item/ModalCreation';
import BulkDeleteConfirmModal from '@/components/bases/modal/BulkDeleteConfirmModal';

import '@/pages/private/master-item/masterItem.scss';

const MasterItem = () => {
	const [data, setData] = useState<I_MasterItemListResBody['data']>([]);
	const [loading, setLoading] = useState(false);
	const [debounceTerm, setDebouncedTerm] = useState<string>('');
	const [pagination, setPagination] = useState<
		I_MasterItemListResBody['pagination']
	>({});
	const [params, setParams] = useState<I_MasterItemListReqQuery>({
		page: 1,
		per_page: 50,
		sort_by: '',
		sort: '',
		filter_type: '',
		filter_category: '',
		search: '',
	});
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
	const [openModalCreation, setOpenModalCreation] = useState<boolean>(false);
	const [formCreationType, setFormCreationType] = useState<'create' | 'edit'>(
		'create',
	);
	const [detailData, setDetailData] = useState<
		I_MasterItemDetailResBody['data'] | null
	>(null);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

	const handleOpenModalCreation = (
		state: boolean,
		formType: 'create' | 'edit' = 'create',
		formData: I_MasterItemDetailResBody['data'] | null = null,
	) => {
		setFormCreationType(formType);
		setOpenModalCreation(state);
		setDetailData(formData);
	};

	const handleResetParams = () => {
		setParams((prev) => ({
			...prev,
			sort_by: '',
			sort: '',
			filter_type: '',
			filter_category: '',
			search: '',
		}));
	};

	const handleOpenModalDelete = (state: boolean) => {
		setOpenModalDelete(state);
	};

	const bulkDeleteData = async () => {
		setDeleteLoading(true);
		try {
			await bulkDeleteMasterItem({ ids: selectedRowKeys as number[] });
			notification.success({
				message: 'Master Data - Barang',
				description: 'Berhasil menghapus data',
				placement: 'bottomRight',
			});
			setSelectedRowKeys([]);
			handleResetParams();
			fetchData();
		} catch (e) {
			const error = axiosErrorHandler(e);
			const errorMessage = error && error.response?.data?.message;
			let description = 'Gagal menghapus data';
			if (errorMessage === 'Relation data exist') {
				description = 'Gagal! Data digunakan oleh data lain';
			}
			notification.error({
				message: 'Master Data - Barang',
				description,
				placement: 'bottomRight',
			});
		} finally {
			setDeleteLoading(false);
			handleOpenModalDelete(false);
		}
	};

	const deleteData = async (id: number) => {
		setDeleteLoading(true);
		try {
			await deleteMasterItem(id);
			notification.success({
				message: 'Master Data - Barang',
				description: 'Berhasil menghapus data',
				placement: 'bottomRight',
			});
			setSelectedRowKeys([]);
			handleResetParams();
			fetchData();
		} catch (e) {
			const error = axiosErrorHandler(e);
			const errorMessage = error && error.response?.data?.message;
			let description = 'Gagal menghapus data';
			if (errorMessage === 'Relation data exist') {
				description = 'Gagal! Data digunakan oleh data lain';
			}
			notification.error({
				message: 'Master Data - Barang',
				description,
				placement: 'bottomRight',
			});
		} finally {
			setDeleteLoading(false);
		}
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const { data: res } = await getMasterItemList(params);
			setData(res.data);
			setPagination(res.pagination);
		} catch (e) {
			axiosErrorHandler(e);
			notification.error({
				message: 'Master Data - Barang',
				description: 'Gagal memuat data',
				placement: 'bottomRight',
			});
		} finally {
			setLoading(false);
		}
	};

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
		params.filter_type,
		params.filter_category,
		params.sort_by,
		params.sort,
		debounceTerm,
	]);

	return (
		<>
			<PrivatePageContent pageName="Master Data Barang">
				<div className="master-item-content-wrapper">
					<DefaultPageCard>
						<TableMenu
							params={params}
							setParams={setParams}
							onOpenCreate={handleOpenModalCreation}
							selectedRowKeys={selectedRowKeys}
							onOpenDelete={handleOpenModalDelete}
						/>

						<DataTable
							data={data}
							setData={setData}
							setParams={setParams}
							loading={loading}
							pagination={pagination}
							deleteLoading={deleteLoading}
							deleteData={deleteData}
							onOpenEdit={handleOpenModalCreation}
							selectedRowKeys={selectedRowKeys}
							setSelectedRowKeys={setSelectedRowKeys}
						/>
					</DefaultPageCard>
				</div>
			</PrivatePageContent>

			<ModalCreation
				formType={formCreationType}
				open={openModalCreation}
				setOpen={handleOpenModalCreation}
				handleResetParams={handleResetParams}
				fetchData={fetchData}
				formData={detailData}
			/>

			<BulkDeleteConfirmModal
				loading={deleteLoading}
				open={openModalDelete}
				setOpen={handleOpenModalDelete}
				handleOk={bulkDeleteData}
				dataCount={selectedRowKeys.length}
			/>
		</>
	);
};

const Component = withPrivatePageLayout(MasterItem);

export default Component;
