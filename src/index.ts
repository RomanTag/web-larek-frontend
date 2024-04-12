import './scss/styles.scss';
import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import {
	AppStateModel,
	CatalogChangeEvent,
	Product,
} from './components/AppState';
import { Page } from './components/Page';
import { Card } from './components/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { BasketCard } from './components/common/BasketCard';
import { IContactsOrder, PaymentMethod, IOrderAddress } from './types';
import { ContactsOrder } from './components/ContactsOrder';
import { OrderForm } from './components/OrderForm';
import { Success } from './components/common/Success';

// Создаю экземпляр EventEmitter для управления событиями
const events = new EventEmitter();

// Создаю экземпляр LarekApi для взаимодействия с API
const api = new LarekApi(CDN_URL, API_URL);

// Обработка всех событий для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Загружаю все шаблоны
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// Создаю модель состояния приложения
export const appState = new AppStateModel({}, events);

// Создаю экземпляры глобальных компонентов
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new OrderForm(cloneTemplate(orderTemplate), events);
const contacts = new ContactsOrder(cloneTemplate(contactsTemplate), events);

// Обработка изменений в каталоге товаров
events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appState.catalog.map((item) => {
		const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});

	page.counter = appState.fullBasket().length;
});

// Загрузка списка товаров с сервера
api
	.getProductList()
	.then(appState.setCatalog.bind(appState))
	.catch((err) => {
		console.error(err);
	});

// Обработка выбора товара
events.on('card:select', (item: Product) => {
	appState.setPreview(item);
});

// Обработка изменения превью товара
events.on('preview:changed', (item: Product) => {
	if (item) {
		const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
			onClick: () => {
				if (appState.checkBasket(item)) {
					events.emit('webproduct:delete', item);
				} else {
					events.emit('webproduct:added', item);
				}
			},
		});
		modal.render({
			content: card.render({
				title: item.title,
				image: item.image,
				category: item.category,
				description: item.description,
				price: item.price,
				button: appState.checkBasket(item) ? 'Убрать' : 'Купить',
			}),
		});
	} else {
		modal.close();
	}
});

// Обработка добавления товара в корзину
events.on('webproduct:added', (item: Product) => {
	appState.putInBasket(item);
	modal.close();
});

// Обработка удаления товара из корзины
events.on('webproduct:delete', (item: Product) => {
	appState.deleteFromBasket(item.id);
	modal.close();
});

// Обработка изменений данных в корзине
events.on('itemsBasket:changed', () => {
	const fullBasket = appState.fullBasket();
	page.counter = fullBasket.length;
	let total = 0;
	basket.items = fullBasket.map((item, index) => {
		const card = new BasketCard(index, cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				appState.deleteFromBasket(item.id);
				basket.total = appState.getTotal();
			},
		});
		total = total + item.price;
		return card.render({
			title: item.title,
			price: item.price,
		});
	});
	basket.total = total;
});

// Открытие корзины
events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

// Открытие формы заказа
events.on('order:open', () => {
	order.setButtonClass('');
	modal.render({
		content: order.render({
			payment: null,
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// Выбор метода оплаты
events.on('payment:changed', (data: { target: PaymentMethod }) => {
	appState.checkPayment(data.target);
});

// Отправка формы доставки
events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

// Обработка изменений валидации формы с адресом
events.on('formAddresErrors:change', (errors: Partial<IOrderAddress>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join(', ');
});

// Обработка изменений поля формы с контактами
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IContactsOrder; value: string }) => {
		appState.setContactField(data.field, data.value);
	}
);

// Обработка изменений валидации формы с контактами
events.on('formContactErrors:change', (errors: Partial<IContactsOrder>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join(', ');
});

// Обработка изменений адреса доставки
events.on('order.address:change', (data: { value: string }) => {
	appState.checkAddress(data.value);
});

// Отправляю формы заказа
events.on('contacts:submit', () => {
	appState.setOrder();
	api
		.orderProduct(appState.order)
		.then(() => {
			const success = new Success(
				cloneTemplate(successTemplate),
				{
					onClick: () => {
						modal.close();
						appState.clearBasket();
						order.setButtonClass('');
						events.emit('itemsBasket:changed');
					},
				},
				appState.order.total
			);
			modal.render({ content: success.render({}) });
		})
		.catch((err) => {
			console.error(err);
		});
});

// Блокирую прокрутки страницы при открытии модального окна
events.on('modal:open', () => {
	page.locked = true;
});

// Отчистка корзины после успешного заказа
events.on('modal:close', () => {
	page.locked = false;
	// Проверяю, был ли только что выполнен заказ
	if (appState.order && appState.order.total > 0) {
		// Если заказ выполнен, очищаю корзину
		appState.clearBasket();
		// Сбрасываю состояние заказа
		appState.defaultOrder();
		// Обновляю интерфейс корзины
		events.emit('itemsBasket:changed');
	}
});
