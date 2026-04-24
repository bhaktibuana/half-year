import React from 'react';

import { withPrivatePageLayout } from '@/components/layouts/private/page';
import PrivatePageContent from '@/components/layouts/private/content/PrivatePageContent';
import DefaultPageCard from '@/components/bases/card/default-page-card/DefaultPageCard';

import '@/pages/private/dashboard/dashboard.scss';

const Dashboard = () => {
	return (
		<>
			<PrivatePageContent pageName="Dashboard">
				<div className="dashboard-content-wrapper">
					<DefaultPageCard>
						<span>Halaman dashboard ada di sini</span>
					</DefaultPageCard>
				</div>
			</PrivatePageContent>
		</>
	);
};

const Component = withPrivatePageLayout(Dashboard);

export default Component;
