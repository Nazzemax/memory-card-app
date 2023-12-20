import { useAppSelector } from "../../../app/hooks/hooks";
import { RootState } from "../../../app/store";

export const useAuthSelectors = () => {
    const isAuthenticated = useAppSelector(
        (state: RootState) => state.auth.user.isAuthenticated || ''
    );
    const isLoading = useAppSelector(
        (state: RootState) => state.auth.user.isLoading || ''
    );
    const regLoading = useAppSelector(
        (state: RootState) => state.register.isLoading || ''
    );
    const registerSuccess = useAppSelector(
        (state: RootState) => state.register.isSuccess || ''
    );
    const error = useAppSelector((state) => state.auth.error) || '';

    return { isAuthenticated, isLoading, regLoading, registerSuccess, error };
};
