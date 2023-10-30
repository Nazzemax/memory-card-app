export interface User  {
    user:{
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
    isLoading:boolean;
    isAuthenticated:boolean;
}

export interface UserRegister {
    email:string;
    password:string;
    isSuccess:boolean;
    isLoading:boolean;
    error?:string;
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
}

export interface RegisterState {
    email:string;
    password:string;
    error?:string;
}




