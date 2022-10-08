export const GET_COMPANIONS = "GET_COMPANIONS";
export const GET_EVENTS = "GET_EVENTS";
const SET_EVENTS_REQUEST = "SET_EVENTS_REQUEST";
const SET_EVENTS_SUCCESS = "SET_EVENTS_SUCCESS";
const SET_EVENTS_FAILURE = "SET_EVENTS_FAILURE";
const SET_COMPANIONS_REQUEST = "SET_COMPANIONS_REQUEST";
const SET_COMPANIONS_SUCCESS = "SET_COMPANIONS_SUCCESS";
const SET_COMPANIONS_FAILURE = "SET_COMPANIONS_FAILURE";
export const MODIFY_EVENT = "MODIFY_EVENT";
const SET_MODIFY_EVENT_REQUEST = "SET_MODIFY_EVENT_REQUEST";
const SET_MODIFY_EVENT_SUCCESS = "SET_MODIFY_EVENT_SUCCESS";
const SET_MODIFY_EVENT_FAILURE = "SET_MODIFY_EVENT_FAILURE";
export const UPDATE_EVENT = "UPDATE_EVENT";
const SET_UPDATE_EVENT_REQUEST = "SET_UPDATE_EVENT_REQUEST";
const SET_UPDATE_EVENT_SUCCESS = "SET_UPDATE_EVENT_SUCCESS";
const SET_UPDATE_EVENT_FAILURE = "SET_UPDATE_EVENT_FAILURE";
export const DELETE_EVENT = "DELETE_EVENT";
const SET_DELETE_EVENT_REQUEST = "SET_DELETE_EVENT_REQUEST";
const SET_DELETE_EVENT_SUCCESS = "SET_DELETE_EVENT_SUCCESS";
const SET_DELETE_EVENT_FAILURE = "SET_DELETE_EVENT_FAILURE";
export const CREATE_COMPANION = "CREATE_COMPANION";
const SET_CREATE_COMPANION_REQUEST = "SET_CREATE_COMPANION_REQUEST";
const SET_CREATE_COMPANION_SUCCESS = "SET_CREATE_COMPANION_SUCCESS";
const SET_CREATE_COMPANION_FAILURE = "SET_CREATE_COMPANION_FAILURE";

export const getCompanions = (token) => ({
  type: GET_COMPANIONS,
  token,
});

export const setCompanionsRequest = () => ({
  type: SET_COMPANIONS_REQUEST,
});

export const setCompanionsSuccess = (companions) => ({
  type: SET_COMPANIONS_SUCCESS,
  companions,
});
export const setCompanionsFailure = (error) => ({
  type: SET_COMPANIONS_FAILURE,
  error,
});

export const getEvents = (token) => ({
  type: GET_EVENTS,
  token,
});

export const setEventsRequest = () => ({
  type: SET_EVENTS_REQUEST,
});

export const setEventsSuccess = (events) => ({
  type: SET_EVENTS_SUCCESS,
  events,
});

export const setEventsFailure = (error) => ({
  type: SET_EVENTS_FAILURE,
  error,
});

export const modifyEvent = (token, event, id) => ({
  type: MODIFY_EVENT,
  token,
  event,
  id,
});

export const setModifyEventRequest = () => ({
  type: SET_MODIFY_EVENT_REQUEST,
});

export const setModifyEventSuccess = (event) => ({
  type: SET_MODIFY_EVENT_SUCCESS,
  event,
});

export const setModifyEventFailure = (error) => ({
  type: SET_MODIFY_EVENT_FAILURE,
  error,
});

export const updateEvent = (id, token) => ({
  type: UPDATE_EVENT,
  id,
  token,
});

export const setUpdateEventRequest = () => ({
  type: SET_UPDATE_EVENT_REQUEST,
});

export const setUpdateEventSuccess = (event) => ({
  type: SET_UPDATE_EVENT_SUCCESS,
  event,
});

export const setUpdateEventFailure = (error) => ({
  type: SET_UPDATE_EVENT_FAILURE,
  error,
});

export const deleteEvent = (id, token) => ({
  type: UPDATE_EVENT,
  id,
  token,
});

export const setDeleteEventRequest = () => ({
  type: SET_DELETE_EVENT_REQUEST,
});

export const setDeleteEventSuccess = (event) => ({
  type: SET_DELETE_EVENT_SUCCESS,
  event,
});

export const setDeleteEventFailure = (error) => ({
  type: SET_DELETE_EVENT_FAILURE,
  error,
});

export const createCompanion = (token, companion) => ({
  type: CREATE_COMPANION,
  token,
  companion,
});
export const setCreateCompanionRequest = () => ({
  type: SET_CREATE_COMPANION_REQUEST,
});

export const setCreateCompanionSuccess = (companion) => ({
  type: SET_CREATE_COMPANION_SUCCESS,
  companion,
});

export const setCreateCompanionFailure = (error) => ({
  type: SET_CREATE_COMPANION_FAILURE,
  error,
});

const initialState = {
  id: null,
  event: null,
  companion: null,
  token: null,
  companions: [],
  error: "",
  message: null,
  events: [],
  loadingC: false,
};

export const companionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANIONS_REQUEST:
      return { ...state, loadingC: true };
    case SET_COMPANIONS_SUCCESS:
      return { ...state, companions: action.companions, loadingC: false };
    case SET_COMPANIONS_FAILURE:
      return { ...state, error: action.error, loadingC: false };
    case SET_EVENTS_REQUEST:
      return { ...state, loadingC: true };
    case SET_EVENTS_SUCCESS:
      return { ...state, events: action.events, loadingC: false };
    case SET_EVENTS_FAILURE:
      return { ...state, error: action.error, loadingC: false };
    case SET_MODIFY_EVENT_REQUEST:
      return { ...state, loadingC: true };
    case SET_MODIFY_EVENT_SUCCESS:
      return { ...state, event: action.event, loadingC: false };
    case SET_MODIFY_EVENT_FAILURE:
      return { ...state, error: action.error, loadingC: false };
    case SET_UPDATE_EVENT_REQUEST:
      return { ...state, loadingC: true };
    case SET_UPDATE_EVENT_SUCCESS:
      return { ...state, event: action.event, loadingC: false };
    case SET_UPDATE_EVENT_FAILURE:
      return { ...state, error: action.error, loadingC: false };
    case SET_DELETE_EVENT_REQUEST:
      return { ...state, loadingC: true };
    case SET_DELETE_EVENT_SUCCESS:
      return { ...state, event: action.event, loadingC: false };
    case SET_DELETE_EVENT_FAILURE:
      return { ...state, error: action.error, loadingC: false };
    case SET_CREATE_COMPANION_REQUEST:
      return { ...state, loadingC: true };
    case SET_CREATE_COMPANION_SUCCESS:
      return { ...state, companion: action.companion, loadingC: false };
    case SET_CREATE_COMPANION_FAILURE:
      return { ...state, error: action.error, loadingC: false };
    default:
      return state;
  }
};
