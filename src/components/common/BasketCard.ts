import { IBasketCard } from '../../types';
import { Component } from '../base/Component';
import { ICardActions } from '../../types';
import { ensureElement } from '../../utils/utils';
import { CATALOG_VALUE, numberWithSpaces } from '../../utils/constants';

/**
 * Класс BasketCard представляет отдельный товар в корзине.
 */
export class BasketCard extends Component<IBasketCard> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _price: HTMLElement;

	constructor(idx: number, container: HTMLElement, events: ICardActions) {
		super(container);

		// Инициализация элементов товара
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);

		// Установка порядкового номера товара
		this.setText(this._index, idx + 1);

		// Добавление обработчика клика на кнопку удаления товара
		this._button.addEventListener('click', events.onClick);
	}

	/**
	 * Устанавливает название товара.
	 */
	set title(value: string) {
		this.setText(this._title, value);
	}

	/**
	 * Устанавливает цену товара.
	 */
	set price(value: number) {
		this.setText(this._price, numberWithSpaces(value) + ' ' + CATALOG_VALUE);
	}

	/**
	 * Устанавливает порядковый номер товара в корзине.
	 */
	set index(value: number) {
		this.setText(this._title, value);
	}
}
