import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/redux/auth.reducer';
import { userReducer, UserState } from './user/redux/user.reducer';
import { listReducer, ListState } from './list/redux/list.reducer';

export interface AppState {
  auth: AuthState,
  user: UserState
  list: ListState
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  user: userReducer,
  list: listReducer
}
