import { createAction, props } from '@ngrx/store';
import { User } from '../../user/interfaces/user.interface';

export const setFollowers = createAction(
  '[User Component] setFollowers',
  props<{ username: string }>()
);

export const setFollowersSuccess = createAction(
  '[User Component] setFollowersSuccess',
  props<{ followers: User[] }>()
);

export const follow = createAction(
  '[User Component] follow',
  props<{ userId: number, followId: number }>()
);

export const unFollow = createAction(
  '[User Component] unFollow',
  props<{ followId: number }>()
);

export const success = createAction(
  '[User component] success'
);

export const failure = createAction(
  '[User component] failure'
);
