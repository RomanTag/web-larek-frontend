/**
 * Интерфейс для хранения состояния приложения.
 */
export interface IAppStateModel {
	catalog: IProduct[];
	basket: string[];
	order: IOrderForm | null;
}

/**
 * Интерфейс для данных корзины.
 */
export interface IBasketCard {
	title: string;
	price: number;
}

/**
 * Интерфейс для данных успешного выполнения операции.
 */
export interface ISuccess {
	total: number;
}

/**
 * Интерфейс для данных формы заказа.
 */
export interface IOrderForm {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

/**
 * Интерфейс для состояния формы.
 */
export interface IFormState {
	valid: boolean;
	errors: string[];
}

/**
 * Интерфейс для модального окна.
 */
export interface IModal {
	content: HTMLElement;
}

/**
 * Интерфейс для обработчика событий успешного выполнения операции.
 */
export interface ISuccessActions {
	onClick: () => void;
}

/**
 * Интерфейс для данных страницы.
 */
export interface IPage {
	counter: number | null;
	catalog: HTMLElement[];
	locked: boolean;
}

/**
 * Интерфейс для общего количества элементов с типом T.
 */
export interface ITotalItems<T> {
	total: number;
	items: T[];
}

/**
 * Интерфейс для представления данных в корзине.
 */
export interface IBasketData {
	items: HTMLElement[];
	total: number;
}

/**
 * Интерфейс для представления данных на странице.
 */
export interface IPageData {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

/**
 * Интерфейс для обработчика событий карточки товара.
 */
export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

/**
 * Интерфейс для представления данных формы заказа.
 */
export interface IOrderForm {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

/**
 * Интерфейс для представления товара.
 */
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

/**
 * Интерфейс для API ларька.
 */
export interface ILarekApi {
	getProductList: () => Promise<IProduct[]>;
	getProductItem: (id: string) => Promise<IProduct>;
	orderProduct: (order: IOrderForm) => Promise<IOrderResult>;
}

/**
 * Интерфейс для результата заказа.
 */
export interface IOrderResult {
	id: string;
	total: number;
}

/**
 * Интерфейс для данных успешного выполнения операции.
 */
export interface ISuccess {
	total: number;
}

/**
 * Интерфейс для обработчика событий успешного выполнения операции.
 */
export interface ISuccessActions {
	onClick: () => void;
}

/**
 * Интерфейс для данных заказа на доставку.
 */
export interface IContactsOrder {
	email: string;
	phone: string;
}

/**
 * Интерфейс для данных адреса заказа.
 */
export interface IOrderAddress {
	payment: PaymentMethod;
	address: string;
}

/**
 * Перечисление для метода оплаты.
 */
export type PaymentMethod = 'card' | 'cash';

/**
 * Тип для ошибок формы.
 */
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;
