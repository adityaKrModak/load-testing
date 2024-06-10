import { check } from "k6";
import http from "k6/http";

import { Counter, Rate } from "k6/metrics";

export let options = {
  stages: [
    { duration: "10s", target: 100 },
    { duration: "2m", target: 500 },
    { duration: "2m", target: 1000 },
    { duration: "50s", target: 0 },
  ],
};

const joinSessionSuccess = new Counter("joinSession_success");
const joinSessionFailure = new Counter("joinSession_failure");
const joinSessionResponseTime = new Rate("joinSession_response_time");

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzbHVnIjoidGFubWF5X3Uzend1IiwiZXhwIjoxNzQ5MTA4MTAyLCJpYXQiOjE3MTc1NzIxMDJ9.n3N-6c8kNCr7IHhsh9U7dOR10uknj3HCJZ8k9mDrfqo";
if (!token) {
  console.error("Token is not defined");
}

export default function () {
  try {
    const joinSessionUrl = "https://stage.habit.yoga/lead/joinsession";
    const joinResponse = http.get(joinSessionUrl, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!joinResponse) {
      throw new Error("Lead Attendance response is undefined");
    }
    check(joinResponse, {
      "join session is success": (r) => r.status === 200 || r.status === 201,
    });
    // if (joinSessionCheck) {
    //   joinSessionSuccess.add(1);
    // } else {
    //   joinSessionFailure.add(1);
    // }
    // joinSessionResponseTime.add(joinResponse.timings.duration);
  } catch (error) {
    console.error(`Get Join Session Error: ${error.message}`);
  }
}
