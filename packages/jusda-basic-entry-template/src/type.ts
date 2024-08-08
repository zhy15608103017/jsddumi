
import { API } from "./api";

export type BasicType = keyof typeof API

export type UniformRequestProps = {
	url: string;
	keyword: string;
	page: number;
	size?: number;
}

export type useGetBasicOptionsProps = {
	type: BasicType;
	keyword: string;
	page: number;

}

export type ObtainBasicDataThroughTypesProps = {
	type: BasicType;
	keyword?: string;
	page?: number;
	sort?: {
		sortField: string;
		order: 'asc' | 'desc';

	};
	nameLike?: string;
	nameIn?: string[];
	languageEq?: string;
	size?: number;
	generalCodeIn?: string[];
	assignmentGeneralCodeIn?: string[]
	relationGeneralCodeIn?: string[]
	relationGeneralTypeEq?: string
	standardCodeIn?: string[]
	tenantCodeEq?: string
}