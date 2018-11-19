import { Listing } from '@app/modules/admin/listing/state/listing';
import { SelectedListing } from '@app/modules/admin/listing/state/selectedListing';

export interface ListingsListState {
  listings: Listing[] | null;
  page: number | null;
  total: number | null;
  selected: SelectedListing | null;
}
