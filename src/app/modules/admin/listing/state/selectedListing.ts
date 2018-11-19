import { Address } from '@app/model/address';

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
  cost?: number;
  currency?: string;
  minNights?: number;
  maxNights?: number;
  address?: Address;
  description?: string;
}
