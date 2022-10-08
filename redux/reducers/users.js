export const GET_TOKEN = "GET_TOKEN";
const SET_TOKEN_REQUEST = "SET_TOKEN_REQUEST";
const SET_TOKEN_SUCCESS = "SET_TOKEN_SUCCESS";
const SET_TOKEN_FAILURE = "SET_TOKEN_FAILURE";
export const GET_USERS = "GET_USERS";
const SET_USERS_SUCCESS = "SET_USERS_SUCCESS";
const SET_USERS_FAILURE = "SET_USERS_FAILURE";
const SET_USERS_REQUEST = "SET_USERS_REQUEST";
export const CREATE_USER = "CREATE_USER";
const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

export const getUsers = () => ({
  type: GET_USERS,
});

export const createUser = (username, password) => ({
  type: CREATE_USER,
  user: [username, password],
});

export const getToken = (username, password) => ({
  type: GET_TOKEN,
  user: [username, password],
});

export const setTokenRequest = () => ({
  type: SET_TOKEN_REQUEST,
});

export const setTokenSuccess = (token) => ({
  type: SET_TOKEN_SUCCESS,
  token,
  message: "User has been created",
});

export const setTokenFailure = (error) => ({
  type: SET_TOKEN_FAILURE,
  error,
});

export const setCreateUserRequest = () => ({
  type: CREATE_USER_REQUEST,
});

export const setCreateUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  user: null,
});

export const setCreateUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  error,
});

export const setUsersRequest = () => ({
  type: SET_USERS_REQUEST,
});

export const setUsersSuccess = (users) => ({
  type: SET_USERS_SUCCESS,
  users,
});
export const setUsersFailure = (error) => ({
  type: SET_USERS_FAILURE,
  error,
});

const initialState = {
  token: null,
  user: [],
  users: [],
  error: "",
  message: null,
  loading: false,
};

export const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_REQUEST:
      return { ...state, loading: true };
    case SET_USERS_SUCCESS:
      return { ...state, users: action.users, loading: false };
    case SET_USERS_FAILURE:
      return { ...state, error: action.error, loading: false };
    case CREATE_USER_REQUEST:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        message: "User has been created",
        loading: false,
      };
    case CREATE_USER_FAILURE:
      return { ...state, error: action.error, loading: false };
    case SET_TOKEN_REQUEST:
      return { ...state, loading: true };
    case SET_TOKEN_SUCCESS:
      return { ...state, token: action.token, loading: false };
    case SET_TOKEN_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};
