import { Listing } from '@app/modules/admin/listing/state/listing';

export interface ListingsListState {
  listings: Listing[] | null;
  page: number | null;
  total: number | null;
}
