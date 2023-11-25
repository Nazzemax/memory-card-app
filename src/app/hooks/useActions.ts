import { useMemo } from "react";
import { useAppDispatch } from "./hooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions } from "../../features/auth/LoginSlice";
import { actions as registerActions } from "../../features/auth/RegisterSlice";
import { updateProfile } from '../../features/profile/ProfileActions';
import { actions as CardActions } from '../../features/cards/CardSlice'
import { getCard, getCards } from "../../features/cards/CardActions";

import * as userActions from '../../features/auth/AuthActions'

const rootActions = {
    ...actions,
    ...userActions,
    ...registerActions,
    updateProfile,
    ...CardActions,
    getCard,
    getCards,
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return useMemo(() =>
        bindActionCreators(rootActions,
            dispatch), [dispatch])
}