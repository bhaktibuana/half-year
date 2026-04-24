import { I_Router, I_TopNavMenu } from '@/shared/interfaces';

/**
 * Context Interfaces
 */
export type T_ThemeType = 'auto' | 'light' | 'dark';

export type T_ScreenType = 'desktop' | 'mobile';

/**
 * Router Types
 */
export type T_Routers = I_Router[];

/**
 * API Types
 */
export type T_ApiUrlType = 'app' | 'putraBuanaCloud';

/**
 * Icon Types
 */
export type T_IconName =
	| 'mail'
	| 'lock'
	| 'category-filled'
	| 'dashboard-filled'
	| 'layout-sidebar-left-collapse'
	| 'layout-sidebar-right-collapse'
	| 'plus'
	| 'trash-x-filled'
	| 'edit'
	| 'search'
	| 'devices-check'
	| 'restore'
	| 'map-pin-filled'
	| 'arrow-back-up'
	| 'user'
	| 'chevrons-up'
	| 'chevrons-down'
	| 'square-rounded-chevrons-up-filled'
	| 'square-rounded-chevrons-down-filled'
	| 'upload'
	| 'download'
	| 'bell'
	| 'filter-2'
	| 'shopping-cart';

/**
 * Avatar Types
 */
export type T_AvatarColorPair = { backgroundColor: string; color: string };

/**
 * Constant Type
 */
export type T_TopNavMenu = I_TopNavMenu[];
