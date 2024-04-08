import { IEvents } from './events';

// проверка на модель
export const isModel = <T>(obj: unknown): obj is Model<T> => {
	return obj instanceof Model;
};

/**
 * Абстрактный класс Model для работы с данными модели.
 */
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	/**
	 * Метод для генерации событий.
	 */
	emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}
