import { AuthState } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          token: action.payload.token,
          email: action.payload.email,
          refresh: action.payload.refresh
        },
        errorMessage: null
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {
          id: null,
          name: null,
          token: null,
          email: null,
          refresh: null
        },
        errorMessage: null
      };
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          token: action.payload.token,
          email: action.payload.email,
          refresh: action.payload.refresh
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        user: {
          id: null,
          name: null,
          token: null,
          email: null,
          refresh: null
        },
        errorMessage: 'Incorrect User or Password'
      };
    }
    default:
      return state;
  }
}
