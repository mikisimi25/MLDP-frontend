import { List } from "src/app/list/interfaces/list.interface";


export const indexOfList = ( lists: List[], targetList: List ) => {
  let index = -1;

  lists.forEach(({user_list_count}, listIndex) => {

    if( user_list_count === targetList.user_list_count ) {
      index = listIndex;
    }

  })

  return index;
}
