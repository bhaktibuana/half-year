import { T_TopNavMenu } from '@/shared/types';

export const NAV_MENU: T_TopNavMenu = [
	{
		key: '/dashboard',
		label: 'Dashboard',
		show: true,
	},
	{
		key: '/master-data',
		label: 'Master Data',
		show: true,
		children: [
			{
				key: '/master-data/item',
				label: 'Barang',
				show: true,
				children: [
					{
						key: '/master-data/item/tobacco',
						label: 'Tembakau',
						show: true,
					},
					{
						key: '/master-data/item/clove',
						label: 'Cengkeh',
						show: true,
					},
					{
						key: '/master-data/item/sauce',
						label: 'Caos',
						show: true,
					},
				],
			},
			{
				key: '/master-data/supplier',
				label: 'Supplier',
				show: true,
			},
			{
				key: '/master-data/warehouse',
				label: 'Gudang',
				show: true,
			},
			{
				key: '/master-data/user',
				label: 'User',
				show: true,
				children: [
					{
						key: '/master-data/user/employee',
						label: 'Karyawan',
						show: true,
					},
					{
						key: '/master-data/user/admin',
						label: 'Admin',
						show: true,
					},
				],
			},
		],
	},
	{
		key: '/purchasing',
		label: 'Pembelian',
		show: true,
		children: [
			{
				key: '/purchasing/tobacco',
				label: 'Tembakau',
				show: true,
				children: [
					{
						key: '/purchasing/tobacco/create',
						label: 'Buat Pembelian Tembakau',
						show: false,
					},
					{
						key: '/purchasing/tobacco/edit/:code',
						label: 'Edit Pembelian Tembakau',
						show: false,
					},
					{
						key: '/purchasing/tobacco/:code',
						label: 'Detail Pembelian Tembakau',
						show: false,
					},
				],
			},
			{
				key: '/purchasing/clove',
				label: 'Cengkeh',
				show: true,
			},
			{
				key: '/purchasing/flavour',
				label: 'Saos',
				show: true,
			},
			{
				key: '/purchasing/paper',
				label: 'Kertas',
				show: true,
			},
			{
				key: '/purchasing/glue',
				label: 'Lem',
				show: true,
			},
		],
	},
	{
		key: '/inventory',
		label: 'Persediaan',
		show: true,
		children: [
			{
				key: '/inventory/tobacco',
				label: 'Tembakau',
				show: true,
			},
			{
				key: '/inventory/clove',
				label: 'Cengkeh',
				show: true,
			},
			{
				key: '/inventory/flavour',
				label: 'Saos',
				show: true,
			},
		],
	},
	{
		key: '/processing',
		label: 'Pengolahan',
		show: true,
		children: [
			{
				key: '/processing/tobacco',
				label: 'Tembakau',
				show: true,
			},
			{
				key: '/processing/clove',
				label: 'Cengkeh',
				show: true,
			},
			{
				key: '/processing/flavour',
				label: 'Saos',
				show: true,
			},
		],
	},
	{
		key: '/production',
		label: 'Produksi',
		show: true,
	},
	{
		key: '/finance',
		label: 'Keuangan',
		show: true,
	},
	{
		key: '/report',
		label: 'Laporan',
		show: true,
		children: [
			{
				key: '/report/balance-of-sheet',
				label: 'Neraca',
				show: true,
			},
			{
				key: '/report/cash-flow',
				label: 'Arus Kas',
				show: true,
			},
			{
				key: '/report/profit-loss',
				label: 'Laba Rugi',
				show: true,
			},
		],
	},
	{
		key: '/history',
		label: 'Riwayat',
		show: true,
		children: [
			{
				key: '/history/import',
				label: 'Import Data',
				show: true,
			},
			{
				key: '/history/export',
				label: 'Export Data',
				show: true,
			},
		],
	},
];
