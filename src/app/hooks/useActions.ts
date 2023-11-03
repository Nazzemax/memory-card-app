import { useMemo } from "react";
import { useAppDispatch } from "./hooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions } from "../../features/auth/LoginSlice";
import { actions as registerActions } from "../../features/auth/RegisterSlice";
import { updateProfile } from '../../features/profile/ProfileActions';

import * as userActions from '../../features/auth/AuthActions'

const rootActions = {
    ...actions,
    ...userActions,
    ...registerActions,
    updateProfile,
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return useMemo(() =>
        bindActionCreators(rootActions,
            dispatch), [dispatch])
}