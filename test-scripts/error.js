import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "1m", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests should be below 500ms
  },
};

export default function () {
  // A list of URLs, some of which will generate errors
  const urls = [
    "https://httpbin.org/status/200", // Successful request
    "https://httpbin.org/status/404", // Not found error
    "https://httpbin.org/status/500", // Server error
    "https://httpbin.org/status/503", // Service unavailable error
    "https://httpbin.org/delay/3", // This might timeout or be slow
  ];

  urls.forEach((url) => {
    let response = http.get(url);
    check(response, {
      "is status 200": (r) => r.status === 200,
      "is status 404": (r) => r.status === 404,
      "is status 500": (r) => r.status === 500,
      "is status 503": (r) => r.status === 503,
      "response time under 500ms": (r) => r.timings.duration < 500,
    });
  });

  sleep(1); // Wait 1 second between iterations
}
