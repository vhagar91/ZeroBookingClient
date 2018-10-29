import { User } from 'app/modules/admin/users/state/user';

export interface UserListState {
  users: User[] | null;
  page: number | null;
  total: number | null;
}
