import { DefaultResponseTypes, instance } from './api';


export const authAPI = {
    createNewUser(  data:CreateNewUserType ) {
        return instance.post<DefaultResponseTypes<{ jwt: string, user: ResponseNewUser }>> ('auth/local/register', {...data}).then((res) => res);
    }
};

export type CreateNewUserType = {
    username: string,
        password: string,
        firstName: string,
        lastName: string,
        phone: string,
        email: string
}
export type ResponseNewUser = {
    blocked: boolean,
    confirmed: boolean,
    createdAt: string,
    id: number,
    provider: string,
    updatedAt: string,
    username: string,
        password: string,
        firstName: string,
        lastName: string,
        phone: string,
        email: string
}
