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
          username: action.payload.username,
          token: action.payload.token,
          email: action.payload.email,
          avatar: action.payload.avatar
        },
        errorMessage: null
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {
          id: null,
          username: null,
          token: null,
          email: null,
          avatar: null
        },
        errorMessage: null
      };
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload.user.id,
          username: action.payload.user.username,
          token: action.payload.token,
          email: action.payload.user.email,
          avatar: action.payload.user.avatar
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
          username: null,
          token: null,
          email: null,
          avatar: null
        },
        errorMessage: 'Incorrect User or Password'
      };
    }
    default:
      return state;
  }
}
