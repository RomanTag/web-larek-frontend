/**
 * Абстрактный базовый класс для компонентов пользовательского интерфейса.
 */
export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	/**
	 * Переключает наличие класса у элемента.
	 */
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

	/**
	 * Устанавливает текстовое содержимое элемента.
	 */
	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	/**
	 * Устанавливает или снимает атрибут 'disabled' у элемента.
	 */
	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	/**
	 * Скрывает элемент, устанавливая его стиль display в 'none'.
	 */
	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	/**
	 * Делает элемент видимым, удаляя у него стиль display.
	 */
	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	/**
	 * Устанавливает изображение для элемента <img>.
	 */
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	/**
	 * Абстрактный метод для рендеринга компонента.
	 */
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
