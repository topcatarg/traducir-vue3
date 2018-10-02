import { UserType } from '@/models/UserType.ts';

export default interface IUser {
    id: number;
    displayName: string;
    userType: UserType;
    creationDate: string;
    lastSeenDate: string;
    isModerator: boolean;
}
