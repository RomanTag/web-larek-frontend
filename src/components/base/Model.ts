import { IEvents } from './events';

// проверка на модель
export const isModel = (obj: unknown): obj is Model<any> => {
	return obj instanceof Model;
};

/**
 * Абстрактный класс Model для работы с данными модели.
 */
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		// Инициализация модели с переданными данными.
		// Object.assign позволяет скопировать значения всех собственных перечисляемых свойств
		// из одного или более исходных объектов в целевой объект (this).
		Object.assign(this, data);
	}

	/**
	 * Метод для генерации событий.
	 */
	emitChanges(event: string, payload?: object) {
		// Вызов метода emit системы событий, чтобы уведомить остальную часть приложения
		// об изменении данных в модели.
		this.events.emit(event, payload ?? {});
	}
}
