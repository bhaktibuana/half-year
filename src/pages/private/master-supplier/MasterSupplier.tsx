import React, { useEffect, useState } from 'react';

import { withPrivatePageLayout } from '@/components/layouts/private/page';
import PrivatePageContent from '@/components/layouts/private/content/PrivatePageContent';
import DefaultPageCard from '@/components/bases/card/default-page-card/DefaultPageCard';

import '@/pages/private/master-supplier/masterSupplier.scss';
import TableMenu from '@/components/pages/private/master-supplier/TableMenu';
import { useSearchParams } from 'react-router-dom';
import { axiosErrorHandler } from '@/shared/helpers';
import { notification } from 'antd';
import {
	I_MasterSupplierDetailResBody,
	I_MasterSupplierListReqQuery,
	I_MasterSupplierListResBody,
} from '@/shared/interfaces';
import { UploadFile } from 'antd/lib';
import { uploadFileImport } from '@/apis/fileImport';
import {
	bulkDeleteMasterSupplier,
	deleteMasterSupplier,
	getMasterSupplierList,
} from '@/apis/masterSupplier';
import { IMPORT_JOB_NAME_MASTER_SUPPLIER } from '@/shared/constants/fileImport';
import DataTable from '@/components/pages/private/master-supplier/DataTable';
import ModalCreation from '@/components/pages/private/master-supplier/ModalCreation';
import BulkDeleteConfirmModal from '@/components/bases/modal/BulkDeleteConfirmModal';
import ImportModal from '@/components/bases/modal/ImportModal';
import { MASTER_SUPPLIER_IMPORT_TEMPLATE_LINK } from '@/shared/constants/link';

const MasterSupplier = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [data, setData] = useState<I_MasterSupplierListResBody['data']>([]);
	const [loading, setLoading] = useState(false);
	const [debounceTerm, setDebouncedTerm] = useState<string>('');
	const [pagination, setPagination] = useState<
		I_MasterSupplierListResBody['pagination']
	>({});
	const [params, setParams] = useState<I_MasterSupplierListReqQuery>({
		page: Number(searchParams.get('page')) || 1,
		per_page: Number(searchParams.get('per_page')) || 50,
		sort_by: searchParams.get('sort_by') || '',
		sort: searchParams.get('sort') || '',
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
		I_MasterSupplierDetailResBody['data'] | null
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
			formData.append('job_name', IMPORT_JOB_NAME_MASTER_SUPPLIER);
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
		formData: I_MasterSupplierDetailResBody['data'] | null = null,
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
			await bulkDeleteMasterSupplier({
				ids: selectedRowKeys as number[],
			});
			notification.success({
				message: 'Master Data - Supplier',
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
				message: 'Master Data - Supplier',
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
			await deleteMasterSupplier(id);
			notification.success({
				message: 'Master Data - Supplier',
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
				message: 'Master Data - Supplier',
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
			const { data: res } = await getMasterSupplierList(params);
			setData(res.data);
			setPagination(res.pagination);
		} catch (e) {
			axiosErrorHandler(e);
			notification.error({
				message: 'Master Data - Supplier',
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
		params.filter_is_active,
		params.sort_by,
		params.sort,
		debounceTerm,
	]);

	return (
		<>
			<PrivatePageContent pageName="Master Data Supplier">
				<div className="master-supplier-content-wrapper">
					<DefaultPageCard>
						<TableMenu
							params={params}
							setParams={setParams}
							onOpenCreate={handleOpenModalCreation}
							selectedRowKeys={selectedRowKeys}
							onOpenDelete={handleOpenModalDelete}
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
				setOpen={handleOpenModalDelete}
				handleOk={bulkDeleteData}
				dataCount={selectedRowKeys.length}
			/>

			<ImportModal
				title="Import Master Data Supplier"
				open={openModalImport}
				setOpen={handleSetOpenModalImport}
				loading={importLoading}
				handleOk={importData}
				files={files}
				setFiles={setFiles}
				importSuccess={importSuccess}
				templateLink={MASTER_SUPPLIER_IMPORT_TEMPLATE_LINK}
				importCode={importCode}
			/>
		</>
	);
};

const Component = withPrivatePageLayout(MasterSupplier);

export default Component;
