import { takeLatest } from "redux-saga/effects";
import {
  handleGetUsers,
  handleCreateUser,
  handleGetToken,
} from "./handlers/users";
import { GET_USERS, CREATE_USER, GET_TOKEN } from "../reducers/users";
import {
  GET_COMPANIONS,
  GET_EVENTS,
  MODIFY_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  CREATE_COMPANION,
} from "../reducers/companions";
import {
  handleGetCompanions,
  handleGetEvents,
  handleModifyEvent,
  handleUpdateEvent,
  handleDeleteEvent,
  handleCreateCompanion,
} from "./handlers/companions";

export function* watcherSaga() {
  yield takeLatest(GET_USERS, handleGetUsers);
  yield takeLatest(CREATE_USER, handleCreateUser);
  yield takeLatest(GET_TOKEN, handleGetToken);
  yield takeLatest(GET_COMPANIONS, handleGetCompanions);
  yield takeLatest(GET_EVENTS, handleGetEvents);
  yield takeLatest(MODIFY_EVENT, handleModifyEvent);
  yield takeLatest(DELETE_EVENT, handleDeleteEvent);
  yield takeLatest(CREATE_COMPANION, handleCreateCompanion);
}
