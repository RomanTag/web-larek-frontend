import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { catalogValue, ProductCategory } from '../utils/constants';
import { Product } from './Product';
import { IProduct } from '../types/index';

// Определение интерфейса для обработчика событий карточки
interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

// Словарь для маппинга категорий продуктов на CSS классы
const cardCategories: Record<ProductCategory, string> = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	кнопка: 'card__category_button',
	дополнительное: 'card__category_additional',
	другое: 'card__category_other',
};
/*
 * Класс Card для представления карточки продукта
 */
export class Card extends Component<IProduct> {
	// Защищенные свойства класса для работы с элементами DOM
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _category: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;

	// Конструктор класса
	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		// Инициализация DOM элементов карточки
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		container.querySelector(`.${blockName}__image`)
			? (this._image = ensureElement<HTMLImageElement>(
					`.${blockName}__image`,
					container
			  ))
			: null;
		this._index = container.querySelector(`.${blockName}__index`);
		this._category = container.querySelector(`.${blockName}__category`);
		this._price = container.querySelector(`.${blockName}__price`);
		this._description = container.querySelector(`.${blockName}__text`);
		this._button = container.querySelector(`.${blockName}__button`);

		// Привязка обработчика клика, если он предоставлен
		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}
	/*
	 * Проверка наличия элемента в корзине
	 */
	checkInBasket(item: Product, container: CatalogItem[]) {
		this.setDisabled(this._button, false);
		this.setText(this._button, 'В корзину');

		container.forEach((element) => {
			if (item.id === element.id) {
				this.setDisabled(this._button, true);
				this.setText(this._button, 'Уже добавлено');
			}
		});
	}

	/*
	 * Сеттеры для установки свойств карточки и обновления DOM элементов
	 */
	set index(value: string) {
		this.setText(this._index, value);
	}

	/*
	 *  Установить индефикатор элемента
	 */
	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	/*
	 *  Получение заголовка товара
	 */
	get title(): string {
		return this._title.textContent || '';
	}

	set category(value: ProductCategory) {
		Object.values(cardCategories).forEach((categoryClass) => {
			this._category.classList.remove(categoryClass);
		});
		this._category.classList.add(cardCategories[value]);
		this.setText(this._category, value);
	}

	/*
	 *  Установить изображение
	 */
	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set price(value: number | null) {
		if (value) {
			this.setText(this._price, value + catalogValue);
		} else {
			this.setText(this._price, 'Бесценно');
			this._button ? this.setHidden(this._button) : null;
		}
	}

	get price(): number {
		return parseInt(this._price.textContent);
	}
	set description(value: string) {
		this.setText(this._description, value);
	}
}

export class CatalogItem extends Card {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
	}
}
