import { createReducer, on } from '@ngrx/store';
import { User } from '../../user/interfaces/user.interface';
import * as userActions from './user.actions';

export interface UserState {
  data: User | undefined,
  successMsg: string,
  error: any
}

export const initialState: UserState = {
  data: undefined,
  successMsg: '',
  error: null
}

export const userReducer = createReducer(
  initialState,

  on(userActions.setFollowers, (state) => ({
    ...state,
    successMsg: 'Cargando seguidores'
  })),

  on(userActions.setFollowersSuccess, (state, { followers }) => ({
    ...state,
    successMsg: 'Seguidores cargados'
  })),

  on(userActions.follow, (state) => ({
    ...state,
    successMsg: 'Ahora sigues a este usuario'
  })),

  on(userActions.unFollow, (state) => ({
    ...state,
    successMsg: 'Has dejado de seguir a este usuario'
  })),

  on(userActions.success, (state) => ({
    ...state,
    error: null
  })),

  on(userActions.failure, (state) => ({
    ...state,
    error: 'error'
  })),
);
