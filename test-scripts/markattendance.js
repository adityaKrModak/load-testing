import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 10 }, // ramp up to 10 users over 30 seconds
    // { duration: '1m', target: 10 },  // stay at 10 users for 1 minute
    // { duration: '10s', target: 0 },  // ramp down to 0 users over 10 seconds
  ],
};

export default function () {
    const url = "https://stage.habit.yoga/lead/markattendance?slug=Tanmay_5srnm";
  
  
  
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = http.get(url, params);
  
    check(response, {
      "is success": (r) => r.status === 200 || r.status === 201,
      "is error": (r) => r.status !== 200 && r.status !== 201,
      "response time under 500ms": (r) => r.timings.duration < 500,
    });
  }