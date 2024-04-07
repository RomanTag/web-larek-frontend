import { IAppState, IProduct, IOrder } from '../types/index';
import { CatalogItem } from './Card';
import { Model } from './base/Model';
import { Product } from './Product';
import { IEvents } from './base/events';

/**
 * Класс AppState представляет глобальное состояние приложения.
 * Он хранит информацию о продуктах в каталоге, товарах в корзине и текущем заказе.
 */
export class AppState extends Model<IAppState> {
	basket: IProduct[]; // Товары в корзине
	catalog: IProduct[]; // Каталог доступных товаров
	order: IOrder; // Текущий заказ

	constructor(data: Partial<IAppState>, events: IEvents) {
		super(data, events);
		// Инициализация свойств по умолчанию
		this.basket = [];
		this.catalog = [];
		this.order = {
			items: [],
			email: '',
			phone: '',
			address: '',
			payment: '',
			total: null,
		};
	}

	/**
	 * Заполняет каталог товарами.
	 */
	async setCatalog(items: IProduct[]) {
		this.catalog = items.map((item) => new Product(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	/**
	 * Вычисляет общую стоимость товаров в контейнере.
	 */
	getPrice(container: CatalogItem[], value: string): string {
		let totalAmount = 0;

		for (let i = 0; i < container.length; i++) {
			const current = container[i];
			totalAmount += current.price;
		}
		return totalAmount + value;
	}

	/**
	 * Добавляет продукт в указанный контейнер.
	 */
	addProduct(item: CatalogItem, container: CatalogItem[]) {
		if (item) {
			container.push(item);
		}
	}

	/**
	 * Очищает указанный контейнер товаров.
	 */
	clearBasket(container: CatalogItem[]) {
		container.length = 0;
	}

	/**
	 * Устанавливает данные текущего заказа.
	 */
	setOrder(state: IOrder) {
		this.order = Object.assign(this.order, state);
	}
}
