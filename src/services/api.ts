import { apiService as axios } from "./apiService";

export const callApi = async (method:'get'|'post'|'put'|'delete', url:string,data?:any) => {
    try {
        const response = await axios[method](url, data);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response ? error.response.data.error : (error.message + ', more details in the console');
        console.error(errorMessage);
        throw errorMessage;
      }
}