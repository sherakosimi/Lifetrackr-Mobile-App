import moment from "moment";
import { getCompanions, getEvents } from "../redux/reducers/companions";

export const getPercentage = (time, freq) => {
  var moment = require("moment-timezone");
  let now = moment().tz("Africa/Abidjan").format();
  let nextTrigger = moment(time).tz("Africa/Abidjan").format();
  let difference = moment(now).diff(moment(nextTrigger), "seconds");

  let percentage = 0;
  if (difference >= 0) {
    percentage = 0 + "%";
  } else {
    percentage = (Math.abs(difference) / freq) * 100 + "%";
  }
  // console.log("SSS");
  // console.log(percentage);
  return percentage;
};

export const getTime = (time) => {
  let lastTrigger = moment(time).format();
  let dateType = "";
  let now = moment().format();
  let duration = moment(now).diff(lastTrigger, "minutes");
  dateType = "min";
  if (duration > 60) {
    duration = moment(now).diff(lastTrigger, "hours");
    dateType = "hr";
    if (duration > 24) {
      duration = moment(now).diff(lastTrigger, "days");
      dateType = "d";
      if (duration > 30) {
        duration = moment(now).diff(lastTrigger, "months");
        dateType = "m";
      }
    }
  }
  return { duration, dateType };
};

export const getFrequency = (freq) => {
  let frequency = freq.toFixed(1);
  console.log(frequency);
  let dataType = "seconds";
  if (frequency < 2) {
    dataType = "second";
  }
  if (frequency >= 60) {
    frequency = (frequency / 60).toFixed(1);
    dataType = "minutes";
    if (frequency < 2) {
      dataType = "minute";
    }
    if (frequency >= 60) {
      frequency = (frequency / 60).toFixed(1);
      dataType = "hours";
      if (frequency < 2) {
        dataType = "hour";
      }
      if (frequency >= 24) {
        frequency = (frequency / 24).toFixed(1);
        dataType = "days";
        if (frequency < 2) {
          dataType = "day";
        }
        if (frequency >= 7) {
          frequency = (frequency / 7).toFixed(1);
          dataType = "weeks";
          if (frequency < 2) {
            dataType = "week";
          }
          if (frequency >= 31) {
            frequency = (frequency / 30).toFixed(1);
            dataType = "months";
            if (frequency < 2) {
              dataType = "month";
            }
          }
        }
      }
    }
  }
  if (frequency % 1 == 0) {
    frequency = parseInt(frequency);
  }

  return { frequency, dataType };
};

export const getIcon = (type) => {
  if (type == "water") {
    return ["water-outline", "#83E7FD"];
  }
  if (type == "fertilize") {
    return ["flower-tulip-outline", "#C0A850"];
  }
  if (type == "repot") {
    return ["shovel", "#A87E11"];
  }
  if (type == "feed") {
    return ["silverware", "#ECEF65"];
  }
  if (type == "walk") {
    return ["walk", "#E2BDFF"];
  }
  if (type == "groom") {
    return ["gamepad-circle-outline", "#99F49C"];
  }
  if (type == "play") {
    return ["soccer", "#FF986C"];
  }
  if (type == "mist") {
    return ["watering-can-outline", "#9B6C25"];
  }
  if (type == "clean") {
    return ["shower-head", "#12C9B3"];
  }
};

export const getTypeIcon = (type) => {
  let icon = "";
  if (type == "dog" || type == "cat") {
    return "paw";
  }
  if (type == "plant") {
    return "leaf";
  }
  if (type == "reptile") {
    return "tortoise";
  }
  return null;
};

export const fetchData = (token, dispatch) => {
  dispatch(getCompanions(token));
  dispatch(getEvents(token));
};

export const setFrequency = (number, type) => {
  if (type == "hours" || type == "hour") {
    return parseInt(number) * 60 * 60;
  }
  if (type == "days" || type == "day") {
    return parseInt(number) * 60 * 60 * 24;
  }
  if (type == "month" || type == "months") {
    return parseInt(number) * 60 * 24 * 60 * 30;
  }
  if (type == "year") {
    return parseInt(number) * 60 * 60 * 24 * 30 * 12;
  }
  return 0;
};

export const array = [
  {
    number: "1",
    type: "hour",
  },
  {
    number: "2",
    type: "hours",
  },
  {
    number: "3",
    type: "hours",
  },
  {
    number: "4",
    type: "hours",
  },
  {
    number: "5",
    type: "hours",
  },
  {
    number: "6",
    type: "hours",
  },
  {
    number: "7",
    type: "hours",
  },
  {
    number: "8",
    type: "hours",
  },
  {
    number: "9",
    type: "hours",
  },
  {
    number: "10",
    type: "hours",
  },
  {
    number: "11",
    type: "hours",
  },
  {
    number: "12",
    type: "hours",
  },
  {
    number: "13",
    type: "hours",
  },
  {
    number: "14",
    type: "hours",
  },
  {
    number: "15",
    type: "hours",
  },
  {
    number: "16",
    type: "hours",
  },
  {
    number: "17",
    type: "hours",
  },
  {
    number: "18",
    type: "hours",
  },
  {
    number: "19",
    type: "hours",
  },
  {
    number: "20",
    type: "hours",
  },
  {
    number: "21",
    type: "hours",
  },
  {
    number: "22",
    type: "hours",
  },
  {
    number: "23",
    type: "hours",
  },
  {
    number: "1",
    type: "day",
  },
  {
    number: "2",
    type: "days",
  },
  {
    number: "3",
    type: "days",
  },
  {
    number: "4",
    type: "days",
  },
  {
    number: "5",
    type: "days",
  },
  {
    number: "6",
    type: "days",
  },
  {
    number: "7",
    type: "days",
  },
  {
    number: "8",
    type: "days",
  },
  {
    number: "9",
    type: "days",
  },
  {
    number: "10",
    type: "days",
  },
  {
    number: "11",
    type: "days",
  },
  {
    number: "12",
    type: "days",
  },
  {
    number: "13",
    type: "days",
  },
  {
    number: "14",
    type: "days",
  },
  {
    number: "15",
    type: "days",
  },
  {
    number: "16",
    type: "days",
  },
  {
    number: "17",
    type: "days",
  },
  {
    number: "18",
    type: "days",
  },
  {
    number: "19",
    type: "days",
  },
  {
    number: "20",
    type: "days",
  },
  {
    number: "21",
    type: "days",
  },
  {
    number: "22",
    type: "days",
  },
  {
    number: "23",
    type: "days",
  },
  {
    number: "24",
    type: "days",
  },
  {
    number: "25",
    type: "days",
  },
  {
    number: "26",
    type: "days",
  },
  {
    number: "27",
    type: "days",
  },
  {
    number: "28",
    type: "days",
  },
  {
    number: "29",
    type: "days",
  },
  {
    number: "30",
    type: "days",
  },
  {
    number: "1",
    type: "month",
  },
  {
    number: "2",
    type: "months",
  },
  {
    number: "3",
    type: "months",
  },
  {
    number: "4",
    type: "months",
  },
  {
    number: "5",
    type: "months",
  },
  {
    number: "6",
    type: "months",
  },
  {
    number: "7",
    type: "months",
  },
  {
    number: "8",
    type: "months",
  },
  {
    number: "9",
    type: "months",
  },
  {
    number: "10",
    type: "months",
  },
  {
    number: "11",
    type: "months",
  },
  {
    number: "1",
    type: "year",
  },
];
