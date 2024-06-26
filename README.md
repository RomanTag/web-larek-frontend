# Проект "Веб-ларек"

## Описание проекта
"Веб-ларек" - это интернет-магазин, предназначенный для веб-разработчиков. Пользователи могут просматривать каталог товаров, добавлять их в корзину и оформлять заказы.

## Архитектура проекта
Проект реализован с использованием шаблона архитектуры Model-View-Presenter (MVP), который обеспечивает четкое разделение логики и представления. Это позволяет создать масштабируемое и легко поддерживаемое приложение.

- **Model** - отвечает за бизнес-логику и данные приложения. Включает в себя работу с серверным API, обработку данных и их хранение.
- **View** - представляет пользовательский интерфейс приложения. Отвечает за отображение данных, полученных от Presenter, и взаимодействие с пользователем.
- **Presenter** - служит посредником между Model и View, обрабатывая действия пользователя, обновляя Model и обновляя View новыми данными.

### Стек технологий
- HTML & SCSS: Для создания структуры и стилей приложения.
- TypeScript: Обеспечивает типизацию и повышает надежность кода.
- Webpack: Служит для сборки модулей и оптимизации ресурсов.

### Структура проекта
```typescript
|   - `src/` — исходные файлы проекта.
|        |-- `components/` — компоненты приложения.
|           |--- `base/` — папка с базовым кодом

### Важные файлы:
│   - `src/`
│       |-- `pages/`
│           |--- `index.html` — HTML-файл главной страницы

│       |-- `types/`
│           |--- `index.ts` — файл с типами

│       |-- `index.ts` — точка входа приложения

│       |-- `scss/`
│           |--- `styles.scss` — корневой файл стилей

│       |-- `utils/`
│           |--- `constants.ts` — файл с константами
│           |--- `utils.ts` — файл с утилитами
```

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Об архитектуре

Взаимодействия в приложении основаны на событиях. Модели инициируют события, а в базовом коде слушатели выполняют передачу данных компонентам и вычисления, меняя состояние моделей.

# Базовый код

Проект "Веб-ларек" использует ряд базовых классов, обеспечивающих взаимодействие с сервером, управление событиями и создание компонентов.

## `class Api`

Класс `Api` предоставляет базовую функциональность для выполнения HTTP-запросов к серверу.

- **Конструктор:**
  - `baseUrl: string` — Базовый URL для доступа к API.
  - `options: RequestInit` — Настройки запроса.

- **Методы:**
  - `get(uri: string): Promise<object>` — Выполняет GET-запрос.
  - `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` — Выполняет POST-запрос.
  - `handleResponse(response: Response): Promise<object>` — Обрабатывает ответ сервера.

## `class EventEmitter`

Класс `EventEmitter` реализует паттерн "Наблюдатель", позволяя компонентам подписываться на события и реагировать на их выполнение.

- **Конструктор:**
  - Инициализирует хранилище событий.

- **Методы:**
  - `on` - Метод для подписки на событие в `EventEmitter`. 
  - `onAll(callback: (event: EmitterEvent) => void)` - Метод для подписки на все события в `EventEmitter`. Принимает функцию-обработчик.
  - `off(eventName: EventName, callback: Subscriber)` - Метод для отписки от события в `EventEmitter`.
  - `offAll(): void` - Метод для удаления всех обработчиков событий в `EventEmitter`.
  - `emit` - Метод для инициирования события в `EventEmitter`. 
  - `trigger` - Метод создает коллбек-триггер, который при вызове инициирует событие. 

## `abstract class Component`
базовый абстрактный класс `Component` является основой для всех компонентов UI проекта, обеспечивая методы для работы с DOM.

- **Конструктор:** 
  - Принимает DOM-элемент, служащий контейнером компонента.

- **Методы:**
Методы для управления классами, содержимым, доступностью элементов и их видимостью.
   - `render(data?: Partial<T>): HTMLElement` — Должен быть определен в производных классах для рендеринга компонента.

# Model (Модель)
Компоненты модели данных

## `abstract class Model`
Абстрактный класс `Model` служит основой для создания моделей данных. Модели предназначены для хранения, представления и манипуляции данными.

- **Конструктор:**
  - `constructor(data: Partial<T>, protected events: IEvents)` - инициализирует модель определенными данными и системой управления событиями.
  - 
- **Методы:**
  - `notifyChange()` - уведомляет систему управления событиями о том, что состояние модели изменилось, триггеря соответствующие действия или обработчики событий.

# Интерфейсы

В "Веб-лареке" определены ключевые интерфейсы, отражающие структуру данных приложения.

## Интерфейсы для управления пользовательским интерфейсом и модальными окнами:

## `ITotalItems`<T>
Интерфейс, представляющий общее количество элементов и сами элементы как часть некоторой коллекции.

- **Свойства:**
  - `total: number` — общее количество элементов.
  - `items: T[]` — массив элементов.

``` typescript
interface ITotalItems<T> {
  total: number;
  items: T[];
}
```

## `IBasketCard`
Интерфейс для представления отдельного товара в корзине.

- **Свойства:**
  - `title: string` — название товара.
  - `price: number` — цена товара.

``` typescript
Copy code
interface IBasketCard {
  title: string;
  price: number;
}
```

ILarekApi
Интерфейс для API ларька.

- **Свойства:**
  - `getProductList(): Promise<IProduct[]> `— получение списка товаров.
  - `getProductItem(id: string): Promise<IProduct> `— получение информации о товаре по идентификатору.
  - `orderProduct(order: IOrderForm): Promise<IOrderResult> `— размещение заказа.

```typescript
interface ILarekApi {
  getProductList(): Promise<IProduct[]>;
  getProductItem(id: string): Promise<IProduct>;
  orderProduct(order: IOrderForm): Promise<IOrderResult>;
}
```


## `IModal`

Интерфейс для модальных окон, управляющий отображением контента.

- **Свойства:**
  - `content: HTMLElement` — содержимое модального окна.

```typescript
interface IModal {
  content: HTMLElement;
}
```

## `IProduct`

Определяет структуру данных товара в каталоге.

- **Свойства:**
  - `id: string` — уникальный идентификатор товара.
  - `description: string` — описание товара.
  - `index?: number` - Опциональный индекс продукта в списке.
  - `image?: string` — URL изображения продукта, опционально.
  - `title: string` — название товара.
  - `category: string` — категория товара.
  - `price: number | null` — цена товара.

```typescript
 interface IProduct {
	id: string;
	index?: number;
	description: string;
	image?: string;
	title: string;
	category: string;
	price: number | null;
}
```

## `IPageData`

Интерфейс страницы, включая элементы управления и отображения содержимого.

- **Свойства:**
  - `counter: number` — счетчик товаров в корзине.
  - `catalog: HTMLElement[]` — карточки товаров.
  - `locked: boolean` — статус блокировки прокрутки страницы.

```typescript
 interface IPageData {
	counter: number;
	catalog: HTMLElement[]; 
	locked: boolean;
}
```

## `IBasketData`

Описывает структуру корзины покупок.

- **Свойства:**
  - `items: HTMLElement[]` — список HTML-элементов товаров в корзине.
  - `price: string` — строковое представление общей стоимости товаров в корзине.
  - `selected: CatalogItem[]` — массив выбранных товаров.

- **Методы:**
  - `set items(items: HTMLElement[])` — метод для установки элементов корзины и их отображения.
  - `set price(price: string)` — метод для установки и отображения общей стоимости товаров.
  - `get price(): string `— метод для получения общей стоимости товаров в корзине.

```typescript
interface IBasketData {
	items: HTMLElement[];
	price: string;
	selected: CatalogItem[];
}
```

## `IProductInBasket extends IProduct`

Описывает товар в списке корзины.

- **Свойства:**
  - `index` - порядковый номер в корзине

```typescript
interface IProductInBasket extends IProduct {
	index: number;
}
```

## `IOrder`

Интерфейс `IOrder` расширяет `IOrderForm` и описывает структуру данных заказа в системе.

- **Свойства:**
- `items`: `string[]` - Массив строковых идентификаторов, каждый из которых представляет товар в заказе.

Остальные свойства наследуются от интерфейса `IOrderForm`, который должен определять основные данные формы заказа, такие как информация о платеже и контактные данные.

```typescript
interface IOrder extends IContactsForm, IOrderForm { 
  items: string[]; 
  total: number; 
}
```

## `ISuccess`

Интерфейс `ISuccess` представляет собой структуру данных для отображения информации об успешном завершении операции.

- **Свойства:**

- `total`: `string` - Строка, представляющая итоговую сумму или результат операции, которая была успешно завершена.

## `ISuccessActions`

Интерфейс `ISuccessActions` определяет действия, доступные в контексте успешного выполнения операции.

- **Свойства:**

- `onClick`: `() => void` - Функция, которая будет вызвана при нажатии пользователя на элемент, связанный с успешным действием. Не принимает аргументов и не возвращает результат.

## `IOrderAddress`


## Интерфейсы форм:

## `IContactsForm`

Интерфейс формы контактных данных.

- **Свойства:**
  - `phone: string` — телефон.
  - `email: string` — email.

```typescript
interface IContactsForm {
	phone: string;
	email: string;
}
```

## `IOrderForm`

Интерфейс формы оплаты заказа.

- **Свойства:**
  - `address: string` — адрес.
  - `payment: string` — способ оплаты.

```typescript
interface IOrderForm {
	address: string;
	payment: string;
}
```

## `IOrderResult`

Интерфейс `IOrderResult` описывает результат обработки заказа.

- **Свойства:**
- `id`: `string` - Уникальный идентификатор обработанного заказа.
- `total`: `number` - Итоговая сумма заказа в числовом формате.


```typescript
interface IOrderResult {
	id: string;
	total: number;
}
```

# Архитектура
## (MVP)

## `class Product`

Класс `Product` представляет собой модель продукта в нашем приложении. Он наследует от абстрактного класса `Model` и добавляет специфические для продукта свойства и методы.

- **Свойства:**
  - `id: string` — уникальный идентификатор продукта.
  - `description: string` — текстовое описание продукта.
  - `image: string` — ссылка на изображение продукта.
  - `title: string` — название продукта.
  - `category: string` — категория, к которой относится продукт.
  - `price: number | null` — цена продукта. Может быть `null`, если цена не указана.

- **Конструктор:**
  Принимает объект с данными продукта и экземпляр системы событий. Инициализирует объект продукта с заданными значениями.


## `class AppStateModel`
Класс `AppState`, расширяющий базовый класс `Model` и реализующий интерфейс `IAppState`, отвечает за хранение и управление общим состоянием приложения.

  - `basket: Product[]` - Список продуктов, добавленных пользователем в корзину.
  - `catalog: Product[]` - Полный каталог доступных продуктов.
  - `order: IOrder` - Текущий заказ, включая выбранные товары и информацию для оформления.
  - `formErrors: FormErrors` - Сведения об ошибках, возникших при заполнении пользователем формы заказа.

- **Методы:**
  - `setCatalog(catalog: Product[])` - Обновляет каталог продуктов в состоянии приложения.
  - `addToBasket(product: Product)` - Добавляет указанный продукт в корзину.
  - `removeFromBasket(product: Product)` - Удаляет продукт из корзины.
  - `getTotalBasketPrice(): number` - Вычисляет и возвращает общую стоимость всех товаров в корзине.
  - `getEmptyOrder()` - Инициализирует заказ с пустыми полями, подготавливая форму заказа к новому вводу.
  - `getCountProductInBasket(): number` - Подсчитывает количество товаров, находящихся в корзине.
  - `setOrderFields(orderFields: IOrder)` - Задает значения для полей заказа.
  - `validateOrder(orderData: IOrder): boolean` - Проверяет, корректно ли заполнены поля формы заказа.
  - `validateContacts(contacts: IContactsForm): boolean` - Проверяет, корректно ли заполнены контактные данные пользователя.
  - `addProductsToOrder()` - Добавляет выбранные в корзине продукты в текущий заказ.
  - `clearBasket()` - Очищает корзину, удаляя из неё все продукты.
  - `resetSelected()` - Сбрасывает статус выбранности всех товаров, делая их снова доступными для добавления в корзину.
  - `clearOrder()` - Очищает все данные о текущем заказе, включая выбранные товары и информацию для оформления.

# View (Представление)
Компоненты представления

# `class ContactsOrder`

`ContactsOrder` расширяет базовый класс `Form`, предоставляя специализированные методы для установки значения телефона и электронной почты в форму контактов. ¸

## `class Page`

Класс `Page` предназначен для управления ключевыми элементами пользовательского интерфейса веб-страницы. Включает в себя управление счётчиком товаров в корзине, динамическое обновление каталога товаров и контроль за блокировкой интерактивных элементов интерфейса при определённых условиях.

- **Свойства:**
  - `counter`: Устанавливает количество товаров в корзине, отображаемое в счётчике.
  - `catalog`: Принимает массив HTML элементов товаров и отображает их в каталоге.
  - `locked`: Включает или отключает блокировку интерактивных элементов страницы, добавляя или удаляя соответствующий CSS класс.

- **Методы:**
  - Конструктор класса принимает два аргумента: элемент контейнера, в котором будут отображаться элементы страницы, и экземпляр `IEvents` для управления событиями.
  - `set counter(value: number)`: Метод для обновления счётчика товаров в корзине.
  - `set catalog(items: HTMLElement[])`: Метод для заполнения каталога товаров.
  - `set locked(value: boolean)`: Метод для управления блокировкой интерфейса страницы.

## `class Card`

Класс `Card` служит для представления карточки продукта, отображая его основные характеристики, такие как изображение, название, цену, категорию и описание. Этот компонент может быть использован в различных частях приложения, включая каталог товаров, страницу товара и корзину.

- **Свойства:**
  - `index: string` — Порядковый номер карточки, если применимо.
  - `id: string` — Уникальный идентификатор продукта, используется для операций, связанных с товаром.
  - `title: string` — Название продукта.
  - `category: ProductCategory` — Категория продукта, определяющая его принадлежность к определенной группе.
  - `image: string` — Ссылка на изображение продукта.
  - `price: number | null` — Цена продукта. Если цена не указана, отображается текст "Бесценно".
  - `description: string` — Описание продукта, предоставляющее дополнительную информацию о нем.

- **Методы:**
  - `constructor(blockName: string, container: HTMLElement, actions?: ICardActions)` — Инициализирует карточку, привязывая DOM элементы к свойствам класса и устанавливая обработчики событий.
  - `checkInBasket(item: Product, container: CatalogItem[])` — Проверяет, находится ли продукт в корзине, и обновляет состояние кнопки добавления.
  - Сеттеры и геттеры для обновления и получения свойств карточки.

## `class Basket`
Класс `Basket`, унаследованный от `Component` и реализующий `IBasketData`, управляет взаимодействием с корзиной покупок.

- **Основные поля:**
  - `list: HTMLElement` - DOM-элемент, представляющий список товаров в корзине.
  - `total: HTMLElement` - DOM-элемент, отображающий общую стоимость всех товаров в корзине.
  - `button: HTMLButtonElement` - DOM-элемент кнопки для оформления заказа.

- **Конструктор:**
  - `blockName: string` - Имя блока для CSS стилизации.
  - `container: HTMLElement` - DOM-элемент, служащий контейнером для компонента корзины.
  - `events: IEvents` - Ссылка на менеджер событий, обеспечивающий взаимодействие с товарами в корзине.

- **Методы:**
  - `set total(value: number)` - Обновляет и отображает итоговую стоимость товаров в корзине.
  - `set list(items: HTMLElement[])` - Обновляет и отображает список товаров в корзине.
  - `toggleButton(state: boolean)` - Управляет доступностью кнопки "Оформить заказ", блокируя её при пустой корзине или разблокируя при наличии товаров.
  - `updateIndices()` - Пересчитывает и обновляет индексы товаров в корзине, обеспечивая корректное отображение порядковых номеров после добавления новых товаров или удаления существующих.

## `class BasketCard`
Класс `BasketCard` представляет отдельный товар в корзине. Он отвечает за отображение информации о товаре, такой как название, цена и порядковый номер, а также за обработку событий, таких как удаление товара из корзины.

- **Основные поля:**
  - `_index` - HTML элемент для отображения порядкового номера товара.
  - `_title` - HTML элемент для отображения названия товара.
  - `_button` - HTML кнопка для удаления товара из корзины.
  - `_price` - HTML элемент для отображения цены товара.
  
- **Методы:**
`set title(value: string)` - Устанавливает название товара.
`set price(value: number)` - Устанавливает цену товара.
`set index(value: number)` - Устанавливает порядковый номер товара в корзине.

## `class Modal`
Класс `Modal` наследует функционал от `Component` и реализует интерфейс `IModal`, специализируясь на управлении модальными окнами в приложении.

- **Свойства:**
  - `content: HTMLElement` — содержимое модального окна, которое может быть динамически изменено.

- **Методы:**
  - `open()` - Открывает модальное окно, делая его видимым для пользователя.
  - `close()` - Закрывает модальное окно, скрывая его содержимое.
  - `render(data: IModal)` -  отображает модальное окно с заданным содержимым. Вызывает метод `open()` для открытия окна.

## `class Form`
Класс `Form` унаследован от `Component` и реализует интерфейс `IFormState`, предназначен для управления формой заказа. 

- **Свойства:**
  - `valid: boolean` - флаг валидности формы. Если true, форма считается валидной.
  - `errors: string` - текст сообщения об ошибках в форме.

- **Методы:**
  - `onInputChange(field: keyof T, value: string)` - вызывается при изменении значения в любом из полей формы. Генерирует событие изменения для конкретного поля.
  - `render(state: Partial<T> & IFormState)` - метод для отображения состояния формы. Принимает объект состояния, включая валидность, ошибки и значения полей.

## `class OrderForm`

Класс `OrderForm` представляет форму заказа с кнопками и полем адреса.

- **Параметры:**

  - `container` (`HTMLFormElement`): Контейнер формы заказа.
  - `events` (`IEvents`): Объект событий для обмена данными между компонентами.

- **Методы:**

  - `setButtonClass(name: string): void`

## `class Success`
Класс `Success`,  предназначен для отображения сообщения о успешно выполненной операции, например, о завершении заказа. Он предоставляет пользовательский интерфейс, который информирует пользователя о списанной сумме и предлагает дальнейшие действия.

- **Свойства:**
  - `total: string` — общая сумма, списанная с баланса пользователя. Строка, отформатированная для отображения в пользовательском интерфейсе.

- **Методы:**
  - `set total(value: string)` — устанавливает и отображает общую сумму списания в компоненте. Принимает строку, представляющую сумму списания.

# Presenter (Презентер)
Презентер выполняет роль посредника между моделью `Model` и представлением `View`, что позволяет разделить бизнес-логику приложения и пользовательский интерфейс. 

```typescript
enum AppEvents {
    ProductSelected = "product:selected", // Выбор продукта для подробного просмотра
    ProductAddToBasket = "product:addToBasket", // Добавление товара в корзину
    ProductRemoveFromBasket = "product:removeFromBasket", // Удаление товара из корзины
    BasketCheckout = "basket:checkout", // Оформление заказа
    OrderSubmitted = "order:submitted", // Подтверждение и отправка заказа
    OrderSuccessful = "order:successful", // Успешное оформление заказа
    ViewUpdated = "view:updated" //  обновление представления.
}
```

## `class LarekApi`
`LarekApi` предоставляет методы для работы с API веб-сервиса. Это включает в себя получение списка продуктов, получение информации о конкретном продукте и отправку заказа.

- **Методы:**
  - `getProductList`: Запрашивает список всех продуктов с сервера.
  - `getProductItem`: Получает данные о продукте по его уникальному идентификатору.
  - `orderProduct`: Отправляет информацию о заказе на сервер и получает результат обработки заказа.