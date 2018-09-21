import ISOString from '@/models/ISOString';

export default interface ISOStringToTranslate extends ISOString {
    RawString: boolean;
    Suggestion: string;
    Approve: boolean;
}

export const SOStringToTranslate: ISOStringToTranslate = {
    id: 0,
    key: '',
    familyKey: '',
    originalString: '',
    translation: '',
    variant: '',
    creationDate: '',
    suggestions: [],
    isUrgent: false,
    isIgnored: false,
    RawString: false,
    Suggestion: '',
    Approve: false
};

export class SoStringToTranslateClass implements ISOStringToTranslate {
    public RawString = false;
    public Suggestion = '';
    public Approve = false;
    public id = 0;
    public key = '';
    public familyKey = '';
    public originalString = '';
    public translation = '';
    public variant = '';
    public creationDate = '';
    public suggestions = [];
    public isUrgent = false;
    public isIgnored = false;
}
