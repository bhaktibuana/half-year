import React from 'react';

import { withAuthPageLayout } from '@/components/layouts/auth/page';

import '@/pages/auth/login/login.scss';
import LoginForm from '@/components/pages/auth/login/LoginForm';
import { LogoPB } from '@/assets/images';
import { Divider } from 'antd';

const Login = () => {
	return (
		<>
			<div className="login-container">
				{/* Logo Section */}
				<section className="login-page-logo-section">
					<img className="app-logo" src={LogoPB} alt="logo-pb" />
					<Divider type="vertical" style={{ height: '2rem' }} />
					<h1>Putra Buana ERP</h1>
				</section>

				{/* Login Form Card */}
				<LoginForm />
			</div>
		</>
	);
};

const Component = withAuthPageLayout(Login);

export default Component;
