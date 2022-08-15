import { createAction, props } from '@ngrx/store';
import { User } from '../../user/interfaces/user.interface';

export const initApp = createAction('[Auth Component] initApp');

export const login = createAction(
  '[Auth Component] login',
  props<{ email: string, password: string }>()
);

export const setUserToken = createAction(
  '[Auth component] setUserToken',
  props<{ token: string }>()
);

export const guestAccess = createAction(
  '[Auth Component] guestAccess',
);

export const setUserSuccess = createAction(
  '[Auth component] setUserSuccess',
  props<{ user: User }>()
);

export const setUserFailure = createAction(
  '[Auth component] setUserFailure',
  props<{ payload: any }>()
);

export const unSetUser = createAction('[User component] unSetUser');

export const changeUserData = createAction(
  '[Auth component] changeUserData',
  props<{ user: User }>()
);

export const success = createAction(
  '[Auth component] success'
);

export const failure = createAction(
  '[Auth component] failure'
);
