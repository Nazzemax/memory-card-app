export interface User {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
}

export interface LoginState {
    password: string;
    email: string;
    rememberMe: boolean;
    error?: string;
    user?: {
        user: User;
        isLoading: boolean;
        isAuthenticated: boolean;
    };
    isLogout?:boolean;
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

export interface RegisterState {
    email: string;
    password: string;
    error?: string;
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
    cards:[
        {
            answer: string;
            question: string;
            cardsPack_id: string;
            grade: number; // средняя оценка карточек
            shots: number; // количество попыток
            user_id: string;
            created: string;
            updated: string;
            _id: string;
            answerImg?: string; // не обязателен
            questionImg?: string; // не обязателен
            questionVideo?: string; // не обязателен
            answerVideo?: string; // не обязателен
        }
    ],
    cardPacksTotalCount?: number; // количество колод
    cardsTotalCount?:number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
    isLoading:boolean;
    error?:string;
    packName?:string;
    isSorted?:string;
    cardQuestion?:string; 
    maxGrade?:number;
    minGrade?:number;
    packUserId?:string;
    grade?:number;
    name?:string;
    toggleState?:'My' | 'All';
    id?:string;
}

export interface CardsParams {
     packName?:string; // не обязательно
     min?:number; // не обязательно
     max?:number; // не обязательно
     sortPacks?:string; // не обязательно (0 или 1, название свойства)
     page?:number;
     pageCount?:number; // не обязательно
     user_id?:string; // чьи колоды // не обязательно, или прийдут все
}

export interface CardParams extends CardsParams {
    cardAnswer?:string;
    cardQuestion?:string;
    cardsPack_id?:string;
    sortCards?:string;
}

export interface CardPack {
        _id?: string;
        user_id?: string;
        name?: string;
        cardsCount?: number;
        created?: string;
        updated?: string;
        user_name?: string;
  }
  
 export type CardPacks = CardPack[];

 export interface ICards {
    answer?: string;
    question?: string;
    cardsPack_id?: string;
    grade?: number; // средняя оценка карточек
    shots?: number; // количество попыток
    user_id?: string;
    created?: string;
    updated?: string;
    _id?: string;
    answerImg?: string; // не обязателен
    questionImg?: string; // не обязателен
    questionVideo?: string; // не обязателен
    answerVideo?: string; // не обязателен
 }

 export type CardsList = ICards[]


 export interface IPostCardPack {
    name?:string;
    deckCover?:string;
    private?:boolean;
 }
