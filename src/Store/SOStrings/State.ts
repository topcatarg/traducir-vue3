import ISOString from '@/models/ISOString';

export interface IState {
    ISOString: ISOString[];
    HasData: boolean;
}

export const state: IState = {
    ISOString: [],
    HasData: false
};
