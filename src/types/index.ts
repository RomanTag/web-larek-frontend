export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder | null;
	setCatalog(catalog: IProduct[]): void;
	addToBasket(product: IProduct): void;
	removeFromBasket(productId: IProduct): void;
	createOrder(order: IOrder): void;
	getTotalBasketPrice(): number;
}

export interface IModal {
	content: HTMLElement;
	open(): void;
	close(): void;
}

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export interface IBasket {
	list: IProduct[];
	total: number;
}

export interface IProductInBasket extends IProduct {
	index: number;
}

export interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IContactsForm {
	phone: string;
	email: string;
}

export interface IOrderForm {
	address: string;
	payment: string;
}

export interface ISuccessForm {
	description: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IOrderValidate {
	phone: string;
	email: string;
	address: string;
	payment: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
