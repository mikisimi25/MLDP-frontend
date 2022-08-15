import { createReducer, on } from '@ngrx/store';
import { List } from '../../list/interfaces/list.interface';
import * as listActions from './list.actions';

export interface ListState {
  lists: List[],
}

export const initialState: ListState = {
  lists: [],
}

export const listReducer = createReducer(
  initialState,

  on(listActions.setLists, (state, { lists }) => ({
    ...state,
    lists: [...lists]
  })),

  on(listActions.createListSuccess, (state, { list }) => ({
    ...state,
    lists: [...state.lists, list]
  })),

  on(listActions.deleteList, (state, { list }) => ({
    ...state,
    lists: [
      ...state.lists.filter( item => item.id !== list.id)
    ]
  })),

  on(listActions.editListSuccess, (state, { list }) => ({
    ...state,
    lists: [
      ...state.lists.map( item => ( item.id === list.id) ? {...list} : item)
    ]
  })),

  on(listActions.addContentToList, (state, { list, content }) => ({
    ...state,
    lists: [
      ...state.lists.map( item => {
        if( item.user_list_count === list.user_list_count) {
          let newItem = {...item};
          let newContentId = JSON.parse(newItem.contentId!);

          newContentId.push(content);

          newItem.contentId = JSON.stringify(newContentId);

          return newItem
        } else {
          return item
        }
    })]
  })),

  on(listActions.deleteContentFromList, (state, { id, content }) => ({
    ...state,
    lists: [
      ...state.lists.map( item => {
        if( item.id === id) {
          let contentId = item.contentId?.split(',');
          contentId = contentId!.filter( item => item !== content );

          item.contentId = JSON.stringify(contentId);

          return {...item}
        } else {
          return item
        }
    })]
  })),
);
