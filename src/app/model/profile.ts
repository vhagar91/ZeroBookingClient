import { Picture } from '@app/model/picture';

export class Profile {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  picture?: Picture;
  address?: string;
  city?: string;
  country?: string;
  about_me?: string;
}
