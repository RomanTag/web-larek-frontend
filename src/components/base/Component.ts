export abstract class Component<T> {
	// Конструктор компонента.
	protected constructor(protected readonly container: HTMLElement) {}

	// Переключает класс для элемента.
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

	// Устанавливает текстовое содержимое элемента.
	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	// Изменяет доступность элемента (disabled/enabled).
	setDisabled(element: HTMLElement, state: boolean) {
		// Проверяем, является ли элемент элементом формы, поддерживающим свойство disabled.
		if ('disabled' in element) {
			// Приведение типа элемента к HTMLButtonElement для обращения к свойству disabled.
			(element as HTMLButtonElement).disabled = state;
		}
	}

	// Устанавливает элементу стиль 'display: none', скрывая его.
	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	// Удаляет у элемента стиль 'display: none', делая его видимым.
	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	// Устанавливает атрибуты 'src' и 'alt' для элемента изображения.
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	// Абстрактный метод для рендеринга компонента.
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
