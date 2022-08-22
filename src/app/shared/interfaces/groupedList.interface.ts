import { List } from '../../list/interfaces/list.interface';

export interface GroupedList {
  label: string,
  value: string,
  items: List[]
}
