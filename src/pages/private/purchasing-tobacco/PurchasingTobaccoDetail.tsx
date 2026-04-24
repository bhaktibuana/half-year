import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { withPrivatePageLayout } from '@/components/layouts/private/page';
import PrivatePageContent from '@/components/layouts/private/content/PrivatePageContent';
import DefaultPageCard from '@/components/bases/card/default-page-card/DefaultPageCard';

import '@/pages/private/purchasing-tobacco/purchasingTobaccoDetail.scss';
import { getDetailPurchasingTobacco } from '@/apis/purchasingTobacco';
import { axiosErrorHandler } from '@/shared/helpers';
import { notification, Spin } from 'antd';
import DetailForm from '@/components/pages/private/purchasing-tobacco/DetailForm';
import CreationForm from '@/components/pages/private/purchasing-tobacco/CreationForm';
import { PURCHASING_PAYMENT_STATUS_DRAFT } from '@/shared/constants/purchasing';

const PurchasingTobacco = () => {
	const { code: purchaseOrderCode } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const isEditPage = location.pathname.includes('edit');
	const [loading, setLoading] = useState<boolean>(true);

	const fetchDetail = async () => {
		setLoading(true);
		try {
			const { data: res } = await getDetailPurchasingTobacco(
				purchaseOrderCode as string,
			);

			if (
				res.data.status !== PURCHASING_PAYMENT_STATUS_DRAFT &&
				isEditPage
			) {
				navigate(`/purchasing/tobacco/${purchaseOrderCode}`);
			} else if (
				res.data.status === PURCHASING_PAYMENT_STATUS_DRAFT &&
				!isEditPage
			) {
				navigate(`/purchasing/tobacco/edit/${purchaseOrderCode}`);
			}
		} catch (e) {
			axiosErrorHandler(e);
			notification.error({
				message: 'Pembelian Tembakau',
				description: 'Gagal memuat data pembelian',
				placement: 'bottomRight',
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDetail();
	}, []);

	return (
		<>
			<PrivatePageContent
				pageName={
					isEditPage
						? 'Edit Pembelian Tembakau'
						: 'Detail Pembelian Tembakau'
				}
			>
				<div className="purchasing-tobacco-detail-content-wrapper">
					<DefaultPageCard>
						{loading ? (
							<Spin
								size="large"
								style={{ marginTop: 80, marginBottom: 80 }}
							/>
						) : (
							<>
								{isEditPage ? <CreationForm /> : <DetailForm />}
							</>
						)}
					</DefaultPageCard>
				</div>
			</PrivatePageContent>
		</>
	);
};

const Component = withPrivatePageLayout(PurchasingTobacco);

export default Component;
