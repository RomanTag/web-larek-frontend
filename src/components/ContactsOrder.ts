import { Form } from './common/Form';
import { IContactsOrder } from '../types';
import { IEvents } from './base/Events';

/**
 * Класс ContactsOrder управляет формой контактов, обрабатывая ввод телефона и email.
 */
export class ContactsOrder extends Form<IContactsOrder> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	/**
	 * Устанавливает номер телефона в форму.
	 */
	set phone(value: string) {
		const phoneInput = this.container.elements.namedItem(
			'phone'
		) as HTMLInputElement;
		if (phoneInput) {
			phoneInput.value = value;
		}
	}

	/**
	 * Устанавливает адрес электронной почты в форму.
	 */
	set email(value: string) {
		const emailInput = this.container.elements.namedItem(
			'email'
		) as HTMLInputElement;
		if (emailInput) {
			emailInput.value = value;
		}
	}
}
