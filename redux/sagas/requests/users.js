import axios from "axios";

export function requestGetUsers() {
  return axios.request({
    method: "get",
    url: "https://lifetrackerfinal.herokuapp.com/users/",
  });
}
export function requestCreateUser(username, password) {
  return axios.post("https://lifetrackerfinal.herokuapp.com/users/", {
    username: username,
    password: password,
  });
}

export function requestToken(username, password, qs) {
  return axios.post(
    "https://lifetrackerfinal.herokuapp.com/token",
    qs.stringify({
      username: username,
      password: password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
}
