import ISOString from '@/models/ISOString';

export interface IState {
    ISOString: ISOString[];
    HasData: boolean;
    StringToEdit?: ISOString;
}

export const state: IState = {
    ISOString: [],
    HasData: false,
    StringToEdit: undefined
};
