import { Address } from '@app/model/address';
import { Price } from '@app/model/price';
import { PictureListing } from '@app/model/pictureListing';
export class SelectedListing {
  pk?: string;
  nickname?: string;
  publicName?: string;
  roomType?: number;
  propertyType?: number;
  isActive?: boolean;
  accommodates?: number;
  bedrooms?: number;
  beds?: number;
  checkInTime?: string;
  checkOutTime?: string;
  price?: Price;
  minNights?: number;
  maxNights?: number;
  address?: Address;
  description?: string;
  gallery?: PictureListing[];
}
