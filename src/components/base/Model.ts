import { IEvents } from './Events';

/**
 * Проверка объекта на принадлежность к классу Model.
 */
export const isModel = <T>(obj: unknown): obj is Model<T> => {
	return obj instanceof Model;
};

/**
 * Абстрактный класс Model для работы с данными модели.
 */
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
		console.log(this);
	}

	/**
	 * Метод для генерации событий изменений в модели.
	 */
	emitChanges(event: string, payload?: object): void {
		this.events.emit(event, payload ?? {});
	}
}
