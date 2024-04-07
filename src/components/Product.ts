import { IProduct } from '../types/index';
import { Model } from './base/Model';
import { IEvents } from './base/events';

export class Product extends Model<IProduct> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;

	constructor(data: IProduct, events: IEvents) {
		super(data, events);

		// Инициализация свойств продукта данными из параметра data
		this.id = data.id;
		this.description = data.description;
		this.image = data.image;
		this.title = data.title;
		this.price = data.price;
		this.category = data.category;
	}
}
