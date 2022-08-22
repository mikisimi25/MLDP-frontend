import { createAction, props } from '@ngrx/store';
import { List } from '../../list/interfaces/list.interface';

export const initApp = createAction('[List Component] initApp');

export const setLists = createAction(
  '[List Component] setLists',
  props<{ lists: List[] }>()
);

export const unSetLists = createAction(
  '[List Component] unSetLists'
);

export const createList = createAction(
  '[List Component] createList',
  props<{ list: List }>()
);

export const createListSuccess = createAction(
  '[List Component] createListSuccess',
  props<{ list: List }>()
);

export const deleteList = createAction(
  '[List Component] deleteList',
  props<{ list: List }>()
);

export const deleteListSuccess = createAction(
  '[List Component] deleteListSuccess'
);

export const editList = createAction(
  '[List Component] editList',
  props<{ list: List }>()
);

export const editListSuccess = createAction(
  '[List Component] editListSuccess',
  props<{ list: List }>()
);

export const saveList = createAction(
  '[List Component] saveList',
  props<{ list: List }>()
);

export const saveListSuccess = createAction(
  '[List Component] saveListSuccess',
  props<{ list: List }>()
);

export const deleteSavedList = createAction(
  '[List Component] saveList',
  props<{ list: List }>()
);

export const deleteSavedSuccess = createAction(
  '[List Component] saveListSuccess',
  props<{ list: List }>()
);

export const addContentToList = createAction(
  '[List Component] addContentToList',
  props<{ list: List, content: string }>()
);

export const addContentToListSuccess = createAction(
  '[List Component] addContentToListSuccess',
  props<{ list: List }>()
);

export const deleteContentFromList = createAction(
  '[List Component] deleteContentFromList',
  props<{ id: number, content: string }>()
);
