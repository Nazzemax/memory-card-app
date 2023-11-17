export interface User {
    user: {
        _id: string;
        email: string;
        name: string;
        avatar?: string;
        publicCardPacksCount: number;  // количество колод
        created: string;
        updated: string;
        isAdmin: boolean;
        verified: boolean; // подтвердил ли почту
        rememberMe: boolean;
        error?: string;
    }
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface UserRegister {
    email: string;
    password: string;
    isSuccess: boolean;
    isLoading: boolean;
    error?: string;
}

export interface FormData {
    email?: string;
    password?: string;
    secondPassword?: string;
    rememberMe?: boolean;
    confirmPassword?: boolean;
}

export interface LoginState {
    password: string;
    email: string;
    rememberMe: boolean;
    error?: string;
    user?:User | null;
}

export interface RegisterState {
    email: string;
    password: string;
    error?: string;
}

export interface ProfileState {
    user:User | null;
    isLoading:boolean;
    error:string | null;
}

export interface ProfileFormData {
    name?:string;
    avatar?:string;
}

export interface Cards {
    cardPacks:[{
        _id: string;
        user_id: string;
        name: string;
        cardsCount: number;
        created: string;
        updated: string;
        user_name:string;
    }],
    cardPacksTotalCount: number; // количество колод
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
    isLoading:boolean;
    error?:string;
}

export interface CardsParams {
     packName?:string; // не обязательно
     min?:number; // не обязательно
     max?:number; // не обязательно
     sortPacks?:number; // не обязательно (0 или 1, название свойства)
     page?:number;
     pageCount?:number; // не обязательно
     user_id?:string; // чьи колоды // не обязательно, или прийдут все
}

export interface CardParams extends CardsParams {
    cardAnswer?:string;
    cardQuestion?:string;
    cardsPack_id:string;
    sortCards?:number;
}

export interface CardPack {
    _id: string;
    user_id: string;
    name: string;
    cardsCount: number;
    created: string;
    updated: string;
    user_name: string;
  }
  
 export type CardPacks = CardPack[];