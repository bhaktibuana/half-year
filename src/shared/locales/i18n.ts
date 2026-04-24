import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/shared/locales/en.json';
import id from '@/shared/locales/id.json';

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		id: { translation: id },
	},
	lng: 'id', // bahasa default
	fallbackLng: 'en',

	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
