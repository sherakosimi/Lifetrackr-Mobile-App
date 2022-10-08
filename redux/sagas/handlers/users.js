import { call, put } from "redux-saga/effects";
import {
  setUsersFailure,
  setUsersSuccess,
  setUsersRequest,
  setCreateUserRequest,
  setCreateUserSuccess,
  setCreateUserFailure,
  setTokenRequest,
  setTokenSuccess,
  setTokenFailure,
} from "../../reducers/users";
import {
  requestGetUsers,
  requestCreateUser,
  requestToken,
} from "../requests/users";
import * as SecureStore from "expo-secure-store";

export function* handleGetUsers(action) {
  console.log(action);
  yield put(setUsersRequest());
  try {
    const response = yield call(requestGetUsers);
    const { data } = response;
    yield put(setUsersSuccess(data));
  } catch (error) {
    yield put(setUsersFailure(error));
    console.log(error);
  }
}
export function* handleCreateUser(action) {
  console.log(action);
  yield put(setCreateUserRequest());
  try {
    const response = yield call(
      requestCreateUser,
      action.user[0],
      action.user[1]
    );
    const { data } = response;
    yield put(setCreateUserSuccess(data));
  } catch (error) {
    yield put(setCreateUserFailure(error));
    console.log(error);
  }
}

export function* handleGetToken(action) {
  const qs = require("qs");
  yield put(setTokenRequest());
  try {
    const response = yield call(
      requestToken,
      action.user[0],
      action.user[1],
      qs
    );
    const { data } = response;
    console.log("This is handler");
    save(data.access_token);
    console.log(data.access_token);
    yield put(setTokenSuccess(data.access_token));
  } catch (error) {
    yield put(setTokenFailure(error));
    console.log(error);
  }
}
async function save(key) {
  await SecureStore.setItemAsync("token", key);
}
