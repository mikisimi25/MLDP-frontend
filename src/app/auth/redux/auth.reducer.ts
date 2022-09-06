import { createReducer, on } from '@ngrx/store';
import { User } from '../../user/interfaces/user.interface';
import * as authActions from './auth.actions';

export interface AuthState {
  user: User | undefined,
  isLoggedIn: boolean,
  guest: boolean,
  token: string,
  error: any
}

export const initialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
  guest: false,
  token: '',
  error: null
}

export const authReducer = createReducer(
  initialState,

  on(authActions.login, (state) => ({
    ...state,
    guest: false
  })),

  on(authActions.guestAccess, (state) => ({
    ...state,
    guest: true
  })),

  on(authActions.setUserToken, (state,{ token }) => ({
    ...state,
    token: token,
    error: null
  })),

  on(authActions.setUserSuccess, (state,{ user }) => ({
    ...state,
    user: { ...user},
    isLoggedIn: true,
    error: null
  })),

  on(authActions.setUserFailure, (state,{ payload }) => ({
    ...state,
    error: { ...payload }
  })),

  on(authActions.unSetUser, (state) => ({
    ...state,
    user: undefined,
    isLoggedIn: false,
  })),

  on(authActions.changeUserData, (state, { user }) => ({
    ...state,
    user: <User>{ ...user },
  })),

  on(authActions.success, (state) => ({
    ...state,
    error: null
  })),

  on(authActions.failure, (state) => ({
    ...state,
    error: 'error'
  })),
);
