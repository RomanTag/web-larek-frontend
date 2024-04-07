import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';
import { IPage } from '../types';

/**
 * Класс Page отвечает за управление основными элементами на странице.
 */
export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		// Инициализация элементов страницы
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		// Обработка клика по корзине для отображения содержимого
		this._basket.addEventListener('click', () => {
			this.events.emit('basket:render');
		});
	}

	/**
	 * Установка значения счётчика товаров в корзине.
	 */
	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	/**
	 * Заполнение каталога товарами.
	 */
	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	/**
	 * Блокировка или разблокировка интерфейса страницы.
	 */
	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
