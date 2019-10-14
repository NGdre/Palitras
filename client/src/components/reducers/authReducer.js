import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SET_AUTHORIZATION,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT_BEGIN,
  LOG_OUT_END
} from "../actions/actionTypes";

const initialState = {
  isLogged: false,
  message: null,
  logout: {
    status: false,
    message: "you are logged out"
  },
  shouldAnimate: false
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS: {
      const { email, password, message } = action.data;

      return {
        ...state,
        data: { email, password },
        message,
        shouldAnimate: true
      };
    }

    case SIGN_UP_FAIL:
      return { ...state, message: action.err.message };

    case LOGIN_SUCCESS:
      return { ...state, data: action.data, shouldAnimate: true };

    case LOGIN_FAIL:
      return { ...state, message: action.err.message };

    case SET_AUTHORIZATION:
      return { ...state, isLogged: action.value };

    case LOG_OUT_BEGIN:
      return {
        ...state,
        isLogged: false,
        logout: Object.assign(
          {},
          { message: state.logout.message },
          { status: action.status }
        )
      };

    case LOG_OUT_END:
      return {
        ...state,
        logout: Object.assign(
          {},
          { message: state.logout.message },
          { status: action.status }
        )
      };

    default:
      return state;
  }
}
