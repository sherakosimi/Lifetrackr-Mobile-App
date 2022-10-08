import axios from "axios";

export function requestGetCompanions(token) {
  return axios.get("https://lifetrackerfinal.herokuapp.com/companions/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestGetEvents(token) {
  return axios.get("https://lifetrackerfinal.herokuapp.com/companions/event/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestModifyEvent(token, item, id) {
  return axios.put(
    "https://lifetrackerfinal.herokuapp.com/companions/event/?event_id=" + id,
    item,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}

export function requestUpdateEvent(id, token) {
  return axios.put(
    `https://lifetrackerfinal.herokuapp.com/companions/event/last_complete/25/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function requestDeleteEvent(id, token) {
  return axios.delete(
    `https://lifetrackerfinal.herokuapp.com/companions/event/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function requestCreateCompanion(token, companion) {
  return axios.post(
    "https://lifetrackerfinal.herokuapp.com/users/companions/",
    companion,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
