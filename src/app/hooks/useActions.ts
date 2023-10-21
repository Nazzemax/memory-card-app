import { useMemo } from "react";
import { useAppDispatch } from "./hooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions } from "../../features/auth/AuthSlice";
import * as userActions from '../../features/auth/AuthActions'

const rootActions = {
    ...actions,
    ...userActions
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return useMemo(() => 
    bindActionCreators(rootActions,
        dispatch), [dispatch])
}