import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { ISuccess, ISuccessActions } from '../../types';

/**
 * Компонент успешного выполнения операции.
 */
export class Success extends Component<ISuccess> {
	protected _close: HTMLElement;
	protected _total: HTMLElement;

	/**
	 * Создает экземпляр компонента Success.
	 */
	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);

		// Использование стрелочной функции для обработчика события
		if (actions?.onClick) {
			this._close.addEventListener('click', () => actions.onClick());
		}
	}

	/**
	 * Устанавливает общую сумму списания.
	 */
	set total(value: string) {
		const resValue = `Списано ${value}`;
		this.setText(this._total, resValue);
	}
}
