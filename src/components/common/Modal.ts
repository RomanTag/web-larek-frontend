import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { IModal } from '../../types';

/**
 * Класс Modal для управления модальными окнами
 */
export class Modal extends Component<IModal> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		// Привязка метода close к текущему контексту this
		this.close = this.close.bind(this);

		// Находим элементы в DOM
		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		// Навешиваем обработчики событий
		this._closeButton.addEventListener('click', this.close);
		this.container.addEventListener('click', this.close);
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	/**
	 * Метод для установки содержимого модального окна
	 */
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	/**
	 * Метод для открытия модального окна
	 */
	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	/**
	 * Метод для закрытия модального окна
	 */
	close() {
		this.events.emit('modal:close');
		this.container.classList.remove('modal_active');
		this.content = null;
	}

	/**
	 * Метод для отображения модального окна
	 */
	render(data: IModal): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
