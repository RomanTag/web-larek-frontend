import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IModal } from '../../types';

/**
 * Класс Modal представляет собой компонент для управления модальными окнами.
 */
export class Modal extends Component<IModal> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.close = this.close.bind(this);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton.addEventListener('click', this.close);
		this.container.addEventListener('click', this.close);
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	/**
	 * Устанавливает содержимое модального окна.
	 */
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	/**
	 * Открывает модальное окно.
	 */
	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	/**
	 * Закрывает модальное окно.
	 */
	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	/**
	 * Отображает модальное окно.
	 */
	render(data: IModal): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
