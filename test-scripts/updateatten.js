import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 10 }, // ramp up to 10 users over 10 seconds
    // { duration: '1m', target: 10 },  // stay at 10 users for 1 minute
    // { duration: '10s', target: 0 },  // ramp down to 0 users over 10 seconds
  ],
};

// Define the date variable globally
let date = new Date("2024-06-01");

export default function () {
  const url = "https://stage.habit.yoga/lead/updateleadattendance";

  // Increment the date by one day for each request
  date.setDate(date.getDate() + 1);
  const dateString = date.toISOString().split('T')[0]; 

  const payload = JSON.stringify({
    date:dateString,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzbHVnIjoidGFubWF5X3Uzend1IiwiZXhwIjoxNzQ5MTA4MTAyLCJpYXQiOjE3MTc1NzIxMDJ9.n3N-6c8kNCr7IHhsh9U7dOR10uknj3HCJZ8k9mDrfqo",
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    "is success": (r) => r.status === 200 || r.status === 201,
    "is error": (r) => r.status !== 200 && r.status !== 201,
    "response time under 500ms": (r) => r.timings.duration < 500,
  });



}
