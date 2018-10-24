import { User } from '@app/admin/users/state/user';

export interface UserListState {
  users: User[] | null;
  page: number | null;
  total: number | number;
}
