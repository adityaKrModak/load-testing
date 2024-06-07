import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://hb-stg.yoga/';

// See https://k6.io/docs/using-k6/k6-options/
export const options = {
  vus: 3,
  duration: '1m',
  ext: {
    loadimpact: {
      name: 'Smoke Test',
    },
  },
}

export default function () {
  const data = { name: 'prathmesh', tel: '917030291839' }
  let loginRes = http.post(`${BASE_URL}/organisation_user/login`, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })

  check(loginRes, { 'success login': (r) => r.status === 200 })
  console.log(`Status Code: ${loginRes.status} - Response Body: ${loginRes.body}`)
  sleep(1)
}