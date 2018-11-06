// Users Api URLS
import { InjectionToken } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// URLS
export const BaseUrl = 'http://localhost:8000/';
export const ApiKey = '00a32714-f553-4564-af67-1025e59573df';
export const userList = 'api/users/list/';
export const login = 'api/login/';
export const getAvatar = 'api/users/avatar/';
export const tokenRefresh = 'api/token/refresh/';
export const getProfile = 'api/users/profile/';
export const putProfilePicture = 'api/users/avatar/';
export const putProfile = 'api/users/profile/';
export const createUser = 'api/users/new/';
// ExtraConfigs
export const AppConfig: any = {
  routes: {
    profile: 'profile',
    error404: '404',
    admin: 'admin',
    adminUsers: 'users',
    adminSettings: 'settings',
    adminDashboard: 'dashboard'
  }
};
export const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
export let APP_CONFIG = new InjectionToken('app.config');
