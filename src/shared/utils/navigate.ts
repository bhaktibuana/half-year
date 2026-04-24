// utils/navigate.ts
let navigate: (path: string) => void;

export const setNavigator = (nav: typeof navigate) => {
	navigate = nav;
};

export const goTo = (path: string) => {
	if (navigate) {
		navigate(path);
	}
};
