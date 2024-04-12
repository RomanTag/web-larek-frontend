import { Api } from './base/Api';
import {
	IProduct,
	IOrderForm,
	IOrderResult,
	ITotalItems,
	ILarekApi,
} from '../types';

/**
 * Класс LarekApi для взаимодействия с сервером посредством API.
 */
export class LarekApi extends Api implements ILarekApi {
	readonly cdn: string;
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	/**
	 * Получает список продуктов с сервера и добавляет к изображениям CDN путь.
	 */
	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ITotalItems<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}
	/**
	 * Получает данные о продукте по ID.
	 */
	getProductItem(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	/**
	 * Отправляет данные о заказе на сервер и возвращает результат.
	 */
	orderProduct(order: IOrderForm): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
