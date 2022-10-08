import { call, put } from "redux-saga/effects";
import {
  setCompanionsRequest,
  setCompanionsSuccess,
  setCompanionsFailure,
  setEventsRequest,
  setEventsSuccess,
  setEventsFailure,
  setModifyEventRequest,
  setModifyEventFailure,
  setModifyEventSuccess,
  setUpdateEventRequest,
  setUpdateEventSuccess,
  setUpdateEventFailure,
  setDeleteEventRequest,
  setDeleteEventFailure,
  setDeleteEventSuccess,
  setCreateCompanionRequest,
  setCreateCompanionSuccess,
  setCreateCompanionFailure,
} from "../../reducers/companions";
import {
  requestGetCompanions,
  requestGetEvents,
  requestModifyEvent,
  requestUpdateEvent,
  requestDeleteEvent,
  requestCreateCompanion,
} from "../requests/companions";
import * as SecureStore from "expo-secure-store";

export function* handleGetCompanions(action) {
  yield put(setCompanionsRequest());
  try {
    // console.log("Token Companions");
    // console.log(action.token);
    const response = yield call(requestGetCompanions, action.token);
    const { data } = response;
    yield put(setCompanionsSuccess(data));
  } catch (error) {
    yield put(setCompanionsFailure(error));
  }
}

export function* handleGetEvents(action) {
  yield put(setEventsRequest());
  try {
    const response = yield call(requestGetEvents, action.token);
    const { data } = response;
    // save(JSON.stringify(data));
    yield put(setEventsSuccess(data));
  } catch (error) {
    yield put(setEventsFailure(error));
  }
}

export function* handleModifyEvent(action) {
  yield put(setModifyEventRequest());
  try {
    let myJson = JSON.stringify(action.event);
    console.log(action.token);
    console.log(myJson);
    console.log(action.id);
    const response = yield call(
      requestModifyEvent,
      action.token,
      myJson,
      action.id
    );
    const { data } = response;
    yield put(setModifyEventSuccess(null));
    console.log(data);
  } catch (error) {
    console.log(error);
    yield put(setModifyEventFailure(error));
  }
}

export function* handleUpdateEvent(action) {
  yield put(setUpdateEventRequest());
  try {
    console.log(action.id);

    console.log(action.token);
    const response = yield call(requestUpdateEvent, action.id, action.token);
    const { data } = response;
    yield put(setUpdateEventSuccess(null));
    console.log(data);
  } catch (error) {
    console.log(error.response);
    yield put(setUpdateEventFailure(error));
  }
}

export function* handleDeleteEvent(action) {
  yield put(setDeleteEventRequest());
  try {
    console.log(action.id);
    console.log(action.token);
    const response = yield call(requestDeleteEvent, action.id, action.token);
    const { data } = response;
    yield put(setDeleteEventSuccess(null));
    console.log(data);
  } catch (error) {
    console.log(error.response);
    yield put(setDeleteEventFailure(error));
  }
}

export function* handleCreateCompanion(action) {
  yield put(setCreateCompanionRequest());
  try {
    console.log(action.companion);
    console.log(action.token);
    const response = yield call(
      requestCreateCompanion,
      action.token,
      action.companion
    );
    const { data } = response;
    yield put(setCreateCompanionSuccess(null));
    console.log(data);
  } catch (error) {
    console.log(error.response);
    yield put(setCreateCompanionFailure(error));
  }
}
