export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const CATALOG_VALUE = ' синапсов';

export const numberWithSpaces = (value: number) =>
	value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const settings = {};
