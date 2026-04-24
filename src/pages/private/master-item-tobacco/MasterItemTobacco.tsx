import React, { useEffect, useState } from 'react';
import { notification, UploadFile } from 'antd';

import { withPrivatePageLayout } from '@/components/layouts/private/page';
import PrivatePageContent from '@/components/layouts/private/content/PrivatePageContent';
import DefaultPageCard from '@/components/bases/card/default-page-card/DefaultPageCard';
import DataTable from '@/components/pages/private/master-item-tobacco/DataTable';
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
import TableMenu from '@/components/pages/private/master-item-tobacco/TableMenu';
import ModalCreation from '@/components/pages/private/master-item-tobacco/ModalCreation';
import BulkDeleteConfirmModal from '@/components/bases/modal/BulkDeleteConfirmModal';
import { TYPE_ITEM_TOBACCO } from '@/shared/constants/item';
import ImportModal from '@/components/bases/modal/ImportModal';

import '@/pages/private/master-item-tobacco/masterItemTobacco.scss';
import { uploadFileImport } from '@/apis/fileImport';
import { IMPORT_JOB_NAME_MASTER_ITEM_TOBACCO } from '@/shared/constants/fileImport';
import { MASTER_ITEM_TOBACCO_IMPORT_TEMPLATE_LINK } from '@/shared/constants/link';
import { useSearchParams } from 'react-router-dom';

const MasterItemTobacco = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [data, setData] = useState<I_MasterItemListResBody['data']>([]);
	const [loading, setLoading] = useState(false);
	const [debounceTerm, setDebouncedTerm] = useState<string>('');
	const [pagination, setPagination] = useState<
		I_MasterItemListResBody['pagination']
	>({});
	const [params, setParams] = useState<I_MasterItemListReqQuery>({
		page: Number(searchParams.get('page')) || 1,
		per_page: Number(searchParams.get('per_page')) || 50,
		sort_by: searchParams.get('sort_by') || '',
		sort: searchParams.get('sort') || '',
		filter_type: TYPE_ITEM_TOBACCO,
		filter_category: searchParams.get('filter_category') || '',
		filter_is_active: searchParams.get('filter_is_active') || '',
		search: searchParams.get('search') || '',
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
	const [openModalImport, setOpenModalImport] = useState<boolean>(false);
	const [files, setFiles] = useState<UploadFile[]>([]);
	const [importLoading, setImportLoading] = useState<boolean>(false);
	const [importSuccess, setImportSuccess] = useState<boolean>(false);
	const [importCode, setImportCode] = useState<string>('');

	const handleSetOpenModalImport = (state: boolean) => {
		setOpenModalImport(state);
		setFiles([]);
		setImportLoading(false);
		setImportSuccess(false);
	};

	const importData = async () => {
		setImportLoading(true);
		try {
			const formData = new FormData();
			formData.append('job_name', IMPORT_JOB_NAME_MASTER_ITEM_TOBACCO);
			formData.append('file', files[0].originFileObj as File);

			const { data: res } = await uploadFileImport(formData);
			setImportCode(res.data.code);
			setImportSuccess(true);
		} catch (e) {
			axiosErrorHandler(e);
			notification.error({
				message: 'Master Data - Tembakau',
				description: 'Gagal mengunggah file',
				placement: 'bottomRight',
			});
		} finally {
			setImportLoading(false);
		}
	};

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
			filter_type: TYPE_ITEM_TOBACCO,
			filter_category: '',
			filter_is_active: '',
			search: '',
		}));
	};

	const bulkDeleteData = async () => {
		setDeleteLoading(true);
		try {
			await bulkDeleteMasterItem({ ids: selectedRowKeys as number[] });
			notification.success({
				message: 'Master Data - Tembakau',
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
				message: 'Master Data - Tembakau',
				description,
				placement: 'bottomRight',
			});
		} finally {
			setDeleteLoading(false);
			setOpenModalDelete(false);
		}
	};

	const deleteData = async (id: number) => {
		setDeleteLoading(true);
		try {
			await deleteMasterItem(id);
			notification.success({
				message: 'Master Data - Tembakau',
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
				message: 'Master Data - Tembakau',
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
				message: 'Master Data - Tembakau',
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
			if (
				key !== 'filter_type' &&
				value !== '' &&
				value !== null &&
				value !== undefined
			) {
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
		params.filter_type,
		params.filter_category,
		params.filter_is_active,
		params.sort_by,
		params.sort,
		debounceTerm,
	]);

	return (
		<>
			<PrivatePageContent pageName="Master Data Tembakau">
				<div className="master-item-tobacco-content-wrapper">
					<DefaultPageCard>
						<TableMenu
							params={params}
							setParams={setParams}
							onOpenCreate={handleOpenModalCreation}
							selectedRowKeys={selectedRowKeys}
							onOpenDelete={setOpenModalDelete}
							onOpenImport={handleSetOpenModalImport}
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
				setOpen={setOpenModalDelete}
				handleOk={bulkDeleteData}
				dataCount={selectedRowKeys.length}
			/>

			<ImportModal
				title="Import Master Data Tembakau"
				open={openModalImport}
				setOpen={handleSetOpenModalImport}
				loading={importLoading}
				handleOk={importData}
				files={files}
				setFiles={setFiles}
				importSuccess={importSuccess}
				templateLink={MASTER_ITEM_TOBACCO_IMPORT_TEMPLATE_LINK}
				importCode={importCode}
			/>
		</>
	);
};

const Component = withPrivatePageLayout(MasterItemTobacco);

export default Component;
