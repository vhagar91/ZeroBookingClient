// Users Api URLS
import { InjectionToken } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// URLS
export const userList = 'api/users/list/';
export const login = 'rest-auth/login/';
export const getAvatar = 'api/users/avatar/';
export const tokenRefresh = 'rest-auth/refresh/';
export const getProfile = 'api/users/profile/';
export const putProfilePicture = 'api/users/avatar/';
export const putProfile = 'api/users/profile/';
export const createUser = 'api/users/new/';
// Listing APIS EndPoints
export const listingsList = 'api/listings/list/';
export const listingsGet = 'api/listings/listing/';
export const listingsUpdateGeneral = 'api/listings/general/';
export const listingsUpdateTerms = 'api/listings/terms/';
export const listingsUpdateAddress = 'api/listings/address/';
export const listingsUpdatePrices = 'api/listings/prices/';
export const listingsGetGallery = 'api/listings/gallery/';
export const listingsUploadPictures = 'api/listings/add-picture/';
export const listingUpdatePicture = 'api/listings/update-picture/';
export const listingDeletePicture = 'api/listings/delete-picture/';
// ExtraConfigs
export const AppConfig: any = {
  routes: {
    profile: 'profile',
    error404: '404',
    admin: 'admin',
    adminUsers: 'users',
    adminSettings: 'settings',
    adminDashboard: 'dashboard',
    adminListings: 'listings'
  }
};
export const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
export let APP_CONFIG = new InjectionToken('app.config');
