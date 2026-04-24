import React from 'react';

import { withPrivatePageLayout } from '@/components/layouts/private/page';
import PrivatePageContent from '@/components/layouts/private/content/PrivatePageContent';
import DefaultPageCard from '@/components/bases/card/default-page-card/DefaultPageCard';
import CreationForm from '@/components/pages/private/purchasing-tobacco/CreationForm';

import '@/pages/private/purchasing-tobacco/purchasingTobaccoCreation.scss';

const PurchasingTobacco = () => {
	return (
		<>
			<PrivatePageContent pageName="Buat Pembelian Tembakau">
				<div className="purchasing-tobacco-creation-content-wrapper">
					<DefaultPageCard>
						<CreationForm />
					</DefaultPageCard>
				</div>
			</PrivatePageContent>
		</>
	);
};

const Component = withPrivatePageLayout(PurchasingTobacco);

export default Component;
