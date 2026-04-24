import React, { ReactNode } from 'react';
import Decimal from 'decimal.js';

import { T_ScreenType, T_ThemeType } from '@/shared/types';

/**
 * Provider Interfaces
 */
export interface I_DefaultProviderProps {
	children?: ReactNode;
}

/**
 * Context Interfaces
 */
export interface I_UserContext {
	user: I_UserMeResBody['data'];
	setUser: (value: I_UserMeResBody['data']) => void;
	userLoading: boolean;
	setUserLoading: (value: boolean) => void;
}

export interface I_ThemeContext {
	theme: T_ThemeType;
	setTheme: (value: T_ThemeType) => void;
	initTheme: () => void;
}

export interface I_ScreenContext {
	type: T_ScreenType;
	size: I_ScreenSize;
	setType: (value: T_ScreenType) => void;
	setSize: (value: I_ScreenSize) => void;
}

export interface I_AppStatusContext {
	appVersion: string;
	apiVersion: string;
}

export interface I_NotificationContext {
	totalUnreadNotif: number;
	getTotalUnreadNotif: () => Promise<void>;
	isNewDataExist: boolean;
	setIsNewDataExist: (value: boolean) => void;
	newData: I_NotificationDetailResBody['data'] | null;
}

export interface I_NavigationContext {
	defaultSiderWidth: number;
	defaultSiderCollapsedWidth: number;
	privateCollapsed: boolean;
	setPrivateCollapsed: (value: boolean) => void;
	selectedKey: string;
	setSelectedKey: (value: string) => void;
	pageName: string;
	setPageName: (value: string) => void;
	openedGroups: string[];
	setOpenedGroups: (value: string[]) => void;
}

export interface I_ScreenSize {
	width: number;
	height: number;
}

/**
 * Constat Interface
 */
export interface I_TopNavMenu {
	key: string;
	label: string;
	show: boolean;
	children?: I_TopNavMenu[];
}

/**
 * Helper Interface
 */
export interface I_FormatCompleteAddressParam {
	address: string;
	latitude: string | null;
	longitude: string | null;
	province: string | null;
	city: string | null;
	subdistrict: string | null;
	postal_code: string | null;
}

/**
 * Router Interfaces
 */
export interface I_Router {
	id: string;
	path?: string;
	element: React.JSX.Element;
	children?: I_RouterChild[];
}

export interface I_RouterChild {
	id: string;
	path: string;
	element: React.JSX.Element;
}

/**
 * Access Token Interfaces
 */
export interface I_AccessTokenPayload {
	id: number;
}

/**
 * API Interfaces
 */
export interface I_ApiUrl {
	app: string;
	putraBuanaCloud: string;
}

/**
 * API Req Body Interfaces
 */
export interface I_UserLoginReqBody {
	username: string;
	password: string;
}

export interface I_CreateMasterItemReqBody {
	code: string;
	name: string;
	type: string;
	category: string;
	is_active: boolean;
}

export interface I_CreateMasterWarehouseReqBody {
	code: string;
	name: string;
	address: string;
	latitude: string;
	longitude: string;
	province: string;
	city: string;
	subdistrict: string;
	postal_code: string;
	is_active: boolean;
}

export interface I_CreateMasterSupplierReqBody {
	code: string;
	name: string;
	phone: string;
	address: string;
	latitude: string;
	longitude: string;
	province: string;
	city: string;
	subdistrict: string;
	postal_code: string;
	is_active: boolean;
}

export interface I_PayBillPurchasingTobaccoReqBody {
	settlement: Decimal;
}

export interface I_CreatePurchasingTobaccoReqBody {
	purchase_date: Date;
	supplier_id: number;
	warehouse_id: number;
	total_bale: number;
	total_gross_weight: Decimal;
	total_net_weight: Decimal;
	total_tare_weight: Decimal;
	delivery_fee: Decimal;
	handling_fee: Decimal;
	accommodation_fee: Decimal;
	other_fee: Decimal;
	is_other_cost_included: boolean;
	total_item_cost: Decimal;
	total_other_cost: Decimal;
	total_cost: Decimal;
	settlement: Decimal;
	purchasing_type: string;
	status: string;
	note: string;
	tobacco_items: I_CreatePurchasingTobaccoItemReqBody[];
}

export interface I_CreatePurchasingTobaccoItemReqBody {
	bale_no: string;
	tobacco_item_id: number;
	year: string;
	grade: string;
	code: string;
	gross_weight: Decimal;
	net_weight: Decimal;
	tare_weight: Decimal;
	packaging: string;
	raw_price_per_unit: Decimal;
	final_price_per_unit: Decimal;
	raw_price_per_bale: Decimal;
	final_price_per_bale: Decimal;
	note: string;
}

export interface I_BulkDeleteMasterItemReqBody {
	ids: number[];
}

export interface I_BulkDeleteMasterWarehouseReqBody {
	ids: number[];
}

export interface I_BulkDeleteMasterSupplierReqBody {
	ids: number[];
}

/**
 * API Req Query Interfaces
 */
export interface I_MasterItemListReqQuery {
	page: number;
	per_page: number;
	sort_by: string;
	sort: string;
	filter_type: string;
	filter_category: string;
	filter_is_active: string;
	search: string;
}

export interface I_MasterWarehouseListReqQuery {
	page: number;
	per_page: number;
	sort_by: string;
	sort: string;
	filter_is_active: string;
	search: string;
}

export interface I_MasterSupplierListReqQuery {
	page: number;
	per_page: number;
	sort_by: string;
	sort: string;
	filter_is_active: string;
	search: string;
}

export interface I_FileImportListReqQuery {
	page: number;
	per_page: number;
	search: string;
	start_date: string;
	end_date: string;
}

export interface I_NotificationListReqQuery {
	page: number;
	per_page: number;
	is_read: string;
}

export interface I_PurchasingTobaccoScoreboardReqQuery {
	start_date: string;
	end_date: string;
}

export interface I_PurchasingTobaccoListReqQuery {
	page: number;
	per_page: number;
	sort_by: string;
	sort: string;
	search: string;
	start_date: string;
	end_date: string;
	filter_purchasing_type: string;
	filter_status: string;
	supplier_id: string;
	warehouse_id: string;
}

/**
 * API Response Interfaces
 */
export interface I_ResponsePagination {
	total_items?: number;
	total_pages?: number;
	per_page?: number;
	current_page?: number;
	next_page?: number | null;
	previous_page?: number | null;
}

export interface I_AppStatusPingResBody {
	data: {
		app_version: string;
		api_version: string;
	};
}

export interface I_UserMeResBody {
	data: {
		id: number;
		created_at: Date;
		updated_at: Date;
		deleted_at: Date | null;
		name: string;
		username: string;
		role: string;
		is_active: true;
	};
}

export interface I_UserLoginResBody {
	data: {
		access_token: string;
	};
}

export interface I_MasterItemDetailResBody {
	data: {
		id: number;
		created_at: Date;
		updated_at: Date;
		deleted_at: Date | null;
		created_by: string;
		updated_by: string;
		deleted_by: string | null;
		code: string;
		name: string;
		type: string;
		category: string | null;
		is_active: boolean;
	};
}

export interface I_MasterWarehouseDetailResBody {
	data: {
		id: number;
		created_at: Date;
		updated_at: Date;
		deleted_at: Date | null;
		created_by: string;
		updated_by: string;
		deleted_by: string | null;
		code: string;
		name: string;
		address: string;
		latitude: string | null;
		longitude: string | null;
		province: string | null;
		city: string | null;
		subdistrict: string | null;
		postal_code: string | null;
		is_active: boolean;
	};
}

export interface I_MasterSupplierDetailResBody {
	data: {
		id: number;
		created_at: Date;
		updated_at: Date;
		deleted_at: Date | null;
		created_by: string;
		updated_by: string;
		deleted_by: string | null;
		code: string;
		name: string;
		phone: string;
		address: string;
		latitude: string | null;
		longitude: string | null;
		province: string | null;
		city: string | null;
		subdistrict: string | null;
		postal_code: string | null;
		is_active: boolean;
	};
}

export interface I_FileImportDetailResBody {
	data: {
		id: number;
		created_at: Date;
		file_link: string;
		job_name: string;
		status: string;
		user_id: number;
		total_data: number;
		total_success: number;
		total_failed: number;
		code: string;
	};
}

export interface I_NotificationDetailResBody {
	data: {
		id: number;
		created_at: Date;
		user_id: number;
		title: string;
		message: string;
		category: string;
		type: string;
		is_read: boolean;
		related_code: string;
	};
}

export interface I_PurchasingDetailResBody {
	data: {
		id: number;
		created_at: Date;
		code: string;
	};
}

export interface I_PurcashingTobaccoItemDetailResBody {
	data: {
		id: number;
		created_at: Date;
		updated_at: Date;
		deleted_at: Date | null;
		created_by: string;
		updated_by: string;
		deleted_by: string | null;
		purchasing_tobacco_id: number;
		purchase_date: Date;
		bale_no: string;
		tobacco_item_id: number;
		year: string;
		grade: string;
		code: string;
		gross_weight: string;
		net_weight: string;
		tare_weight: string;
		unit: string;
		packaging: string;
		raw_price_per_unit: string;
		final_price_per_unit: string;
		raw_price_per_bale: string;
		final_price_per_bale: string;
		note: string;
		prcs_tbc_itm_master_item: I_MasterItemDetailResBody['data'];
	};
}

export interface I_PurchasingTobaccoDetailResBody {
	data: {
		id: number;
		created_at: Date;
		updated_at: Date;
		deleted_at: Date | null;
		created_by: string;
		updated_by: string;
		deleted_by: string | null;
		purchasing_id: number;
		purchase_date: Date;
		supplier_id: number;
		warehouse_id: number;
		total_bale: number;
		total_gross_weight: string;
		total_net_weight: string;
		total_tare_weight: string;
		unit: string;
		delivery_fee: string;
		handling_fee: string;
		accommodation_fee: string;
		other_fee: string;
		is_other_cost_included: boolean;
		total_item_cost: string;
		total_other_cost: string;
		total_cost: string;
		settlement: string;
		purchasing_type: string;
		status: string;
		note: string;
		prcs_tbc_purchasing: I_PurchasingDetailResBody['data'];
		prcs_tbc_supplier: I_MasterSupplierDetailResBody['data'];
		prcs_tbc_warehouse: I_MasterWarehouseDetailResBody['data'];
		prcs_tbc_items: I_PurcashingTobaccoItemDetailResBody['data'][];
	};
}

export interface I_PurchasingTobaccoScoreboardResBody {
	data: {
		all: {
			count: number;
			total_cost: string;
		};
		cash: {
			count: number;
			total_cost: string;
		};
		credit: {
			count: number;
			total_cost: string;
		};
	};
}

export interface I_NotificationReadAllResBody {
	data: {
		read_all: boolean;
	};
}

export interface I_NotificationCountUnreadResBody {
	data: {
		total_unread: number;
	};
}

export interface I_MasterItemListResBody {
	data: {
		id: number;
		created_at: Date;
		updated_at: Date;
		created_by: string;
		updated_by: string;
		deleted_by: string | null;
		code: string;
		name: string;
		type: string;
		category: string | null;
		is_active: boolean;
	}[];
	pagination: I_ResponsePagination;
}

export interface I_MasterWarehouseListResBody {
	data: {
		id: number;
		created_at: Date;
		updated_at: Date;
		created_by: string;
		updated_by: string;
		deleted_by: string | null;
		code: string;
		name: string;
		address: string;
		latitude: string | null;
		longitude: string | null;
		province: string | null;
		city: string | null;
		subdistrict: string | null;
		postal_code: string | null;
		is_active: boolean;
	}[];
	pagination: I_ResponsePagination;
}

export interface I_MasterSupplierListResBody {
	data: {
		id: number;
		created_at: Date;
		updated_at: Date;
		created_by: string;
		updated_by: string;
		deleted_by: string | null;
		code: string;
		name: string;
		phone: string;
		address: string;
		latitude: string | null;
		longitude: string | null;
		province: string | null;
		city: string | null;
		subdistrict: string | null;
		postal_code: string | null;
		is_active: boolean;
	}[];
	pagination: I_ResponsePagination;
}

export interface I_FileImportListResBody {
	data: {
		id: number;
		created_at: Date;
		user_id: number;
		status: string;
		job_name: string;
		total_data: number;
		total_success: number;
		total_failed: number;
		import_log_user: {
			id: number;
			name: string;
			role: string;
		};
	}[];
	pagination: I_ResponsePagination;
}

export interface I_NotificationListResBody {
	data: {
		id: number;
		created_at: Date;
		user_id: number;
		title: string;
		message: string;
		category: string;
		type: string;
		is_read: boolean;
		related_code: string;
	}[];
	pagination: I_ResponsePagination;
}

export interface I_PurchasingTobaccoListResBody {
	data: {
		id: number;
		created_at: Date;
		updated_at: Date;
		deleted_at: Date | null;
		created_by: string;
		updated_by: string;
		deleted_by: string | null;
		purchasing_id: number;
		purchase_date: Date;
		supplier_id: number;
		warehouse_id: number;
		total_bale: number;
		total_gross_weight: string;
		total_net_weight: string;
		total_tare_weight: string;
		unit: string;
		delivery_fee: string;
		handling_fee: string;
		accommodation_fee: string;
		other_fee: string;
		is_other_cost_included: boolean;
		total_item_cost: string;
		total_other_cost: string;
		total_cost: string;
		settlement: string;
		purchasing_type: string;
		status: string;
		note: string;
		prcs_tbc_purchasing: {
			id: number;
			code: string;
		};
		prcs_tbc_supplier: {
			id: number;
			code: string;
			name: string;
		};
		prcs_tbc_warehouse: {
			id: number;
			code: string;
			name: string;
		};
	}[];
	pagination: I_ResponsePagination;
}

export interface I_DeleteMasterItemResBody {
	data: {
		deleted: boolean;
	};
}

export interface I_DeletePurchasingTobaccoResBody {
	data: {
		deleted: boolean;
	};
}

export interface I_DeleteMasterWarehouseResBody {
	data: {
		deleted: boolean;
	};
}

export interface I_DeleteMasterSupplierResBody {
	data: {
		deleted: boolean;
	};
}

export interface I_MasterItemBulkDeleteResBody {
	data: {
		success: number;
		failed: number;
	};
}

export interface I_MasterWarehouseBulkDeleteResBody {
	data: {
		success: number;
		failed: number;
	};
}

export interface I_MasterSupplierBulkDeleteResBody {
	data: {
		success: number;
		failed: number;
	};
}
