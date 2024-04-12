import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IFormState } from '../../types';

/*
 * Класс предназначен для управления формой заказа
 */
export class Form<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		/*
		 * Установка элементов корзины и их отображение
		 */
		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		/*
		 * Навешиваем обработчики событий
		 */
		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});
		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	/*
	 * Метод, вызываемый при изменении значения поля формы
	 */
	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	/*
	 * Установка состояния валидности формы
	 */
	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	/*
	 * Установка текста сообщения об ошибках
	 */
	set errors(value: string) {
		this.setText(this._errors, value);
	}

	/*
	 * Метод для отображения состояния формы
	 */
	render(state: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
