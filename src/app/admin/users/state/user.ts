import { Group } from '@app/admin/users/state/group';

export class User {
  id?: string;
  username?: string;
  first_name: string;
  last_name: string;
  email?: string;
  is_staff: string;
  groups: Group[];

  public getGrops(): string {
    return 'Gropos';
  }
}
