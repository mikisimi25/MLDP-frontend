import { createReducer, on } from '@ngrx/store';
import { orderListCollection } from 'src/app/shared/utilities/list.utilities';
import { List } from '../../list/interfaces/list.interface';
import * as listActions from './list.actions';

export interface ListState {
  lists: List[],
  loaded: boolean,
  msg: string
}

export const initialState: ListState = {
  lists: [],
  loaded: false,
  msg: ''
}

export const listReducer = createReducer(
  initialState,

  on(listActions.setLists, (state, { lists }) => ({
    ...state,
    lists: [...lists]
  })),

  on(listActions.unSetLists, (state) => ({
    ...state,
    lists: []
  })),

  on(listActions.createListSuccess, (state, { list }) => ({
    ...state,
    lists: orderListCollection([...state.lists, list])
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
    loaded: false,
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

  on(listActions.addContentToListSuccess, (state) => ({
    ...state,
    loaded: true,
    msg: 'Película añadida a la lista'
  })),

  on(listActions.deleteContentFromList, (state, { id, content }) => ({
    ...state,
    lists: [
      ...state.lists.map( item => {
        let list = {...item};

        if( list.user_list_count == id) {
          let contentId = JSON.parse(list.contentId!);
          contentId = contentId.filter( (item: string) => item !== content );

          list.contentId = JSON.stringify(contentId);

          return {...list}
        } else {
          return list
        }
    })]
  })),
);
