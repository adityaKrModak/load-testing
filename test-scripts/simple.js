import http from 'k6/http';
export const options = {
  vus: 10,
  duration: '1m',
  thresholds: {
    'http_reqs{expected_response:true}': ['rate>10'],
  },
};

export default function () {
  http.get('https://hb-stg.yoga');
}