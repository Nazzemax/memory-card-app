import { useMemo } from "react";
import { useAppDispatch } from "./hooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions } from "../../features/auth/LoginSlice";
import { actions as registerActions } from "../../features/auth/RegisterSlice";

import * as userActions from '../../features/auth/AuthActions'

const rootActions = {
    ...actions,
    ...userActions,
    ...registerActions,
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return useMemo(() =>
        bindActionCreators(rootActions,
            dispatch), [dispatch])
}