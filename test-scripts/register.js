import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 10 }, // ramp up to 10 users over 30 seconds
    // { duration: '1m', target: 10 },  // stay at 10 users for 1 minute
    // { duration: '10s', target: 0 },  // ramp down to 0 users over 10 seconds
  ],
};
let mobilenumber = 5000000000;

export default function () {
  const url = "https://stage.habit.yoga/lead/register";

  const payload = JSON.stringify({
    leadsource: null,
    mobilenumber: (mobilenumber++).toString(),
    name: `k6-${mobilenumber++}`,
    watigroupname: "https://u.habuild.in/y/yogaeverday21",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    "is success": (r) => r.status === 200 || r.status === 201,
    "is error": (r) => r.status !== 200 && r.status !== 201,
    "response time under 500ms": (r) => r.timings.duration < 500,
  });
}
