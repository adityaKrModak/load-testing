import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 }, // Ramp up to 10 users over 10 seconds
    // { duration: '1m', target: 10 },  // Stay at 10 users for 1 minute
    // { duration: '10s', target: 0 },  // Ramp down to 0 users over 10 seconds
  ],
};

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzbHVnIjoidGFubWF5X3Uzend1IiwiZXhwIjoxNzQ5MTA4MTAyLCJpYXQiOjE3MTc1NzIxMDJ9.n3N-6c8kNCr7IHhsh9U7dOR10uknj3HCJZ8k9mDrfqo'; // Replace with your actual token

export default function () {
  const url = 'https://stage.habit.yoga/program/getleaderboard?paid=true';
  const params = {
    headers: {
      'Authorization': `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzbHVnIjoidGFubWF5X3Uzend1IiwiZXhwIjoxNzQ5MTA4MTAyLCJpYXQiOjE3MTc1NzIxMDJ9.n3N-6c8kNCr7IHhsh9U7dOR10uknj3HCJZ8k9mDrfqo`, // Use the appropriate token type
      'Content-Type': 'application/json', // Optional, based on your API requirements
    },
  };

  // Send a GET request with the authentication headers
  const response = http.get(url, params);

  // Check the response status and response time
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time is less than 200ms': (r) => r.timings.duration < 200,
  });

  // Wait for 1 second before making the next request
  sleep(1);
}
