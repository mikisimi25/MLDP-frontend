import { createReducer, on } from '@ngrx/store';
import { User } from '../../user/interfaces/user.interface';
import * as userActions from './user.actions';

export interface UserState {
  data: User | undefined,
  followers: User[],
  loaded: boolean,
  loading: boolean,
  successMsg: string,
  error: any
}

export const initialState: UserState = {
  data: undefined,
  followers: [],
  loaded: false,
  loading: false,
  successMsg: '',
  error: null
}

export const userReducer = createReducer(
  initialState,

  on(userActions.setFollowers, (state) => ({
    ...state,
    loading: true,
    successMsg: 'Cargando seguidores'
  })),

  on(userActions.setFollowersSuccess, (state, { followers }) => ({
    ...state,
    followers: followers,
    loading: false,
    successMsg: 'Seguidores cargados'
  })),

  on(userActions.follow, (state) => ({
    ...state,
    loading: true,
    successMsg: 'Ahora sigues a este usuario'
  })),

  on(userActions.unFollow, (state) => ({
    ...state,
    loading: true,
    successMsg: 'Has dejado de seguir a este usuario'
  })),

  on(userActions.success, (state) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null
  })),

  on(userActions.failure, (state) => ({
    ...state,
    loading: false,
    loaded: true,
    error: 'error'
  })),
);
