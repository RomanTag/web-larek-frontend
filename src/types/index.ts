export interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder | null;
	setCatalog(items: IProduct[]): void;
	getPrice(container: IProduct[], value: string): string;
	addProduct(item: IProduct, container: IProduct[]): void;
	clearBasket(container: IProduct[]): void;
	setOrder(state: IOrder): void;
}

export interface ITotalItems<T> {
	total: number;
	items: T[];
}

export interface IProduct {
	id: string;
	index?: number;
	description: string;
	image?: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export interface IOrderForm {
	email: string;
	phone: string;
	address: string;
	payment: string;
	total: number;
	[key: string]: unknown;
}

export interface IOrder extends IOrderForm {
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;
