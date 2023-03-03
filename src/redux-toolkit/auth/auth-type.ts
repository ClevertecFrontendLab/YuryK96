import { ResponseNewUser } from '../../api/auth';


export type InitialStateType = {
    user: null | ResponseNewUser,
    authError: null | string,
    authStatus: null | string,
}
