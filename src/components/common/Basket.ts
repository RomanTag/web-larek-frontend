import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { CatalogItem } from '../Card';

interface IBasket {
	items: HTMLElement[];
	price: string;
	selected: CatalogItem[];
}

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLElement;

	selected: CatalogItem[];
	total: string;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		// Инициализация элементов корзины
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._price = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('address:render');
			});
		}
		this.selected = [];

		this.total = '';
	}

	/*
	 * Определение состояния кнопки корзины
	 */
	protected setButtonStatus(price: string) {
		parseInt(price) === 0
			? this.setDisabled(this._button, true)
			: this.setDisabled(this._button, false);
	}

	/*
	 * Установка элементов корзины и их отображение
	 */
	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	/*
	 * Устновить стоимость товаров в корзине
	 */
	set price(price: string) {
		this.setText(this._price, price);
		this.setButtonStatus(price);
		this.total = price;
	}

	/*
	 * Получить стоимость товаров в корзине
	 */

	get price(): string {
		return this.total;
	}
}
