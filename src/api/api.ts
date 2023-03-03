import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://strapi.cleverland.by/api/",
});


export type DefaultResponseTypes<D > = {
    user: any;
    data: D,
    config: any,
    headers: any,
    request: any,
    status: number,
    statusText: string,
};

