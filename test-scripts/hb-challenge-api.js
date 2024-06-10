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

// Custom metrics
// Custom metrics for Register API
const registerSuccess = new Counter("register_success");
const registerFailure = new Counter("register_failure");
const registerResponseTime = new Rate("register_response_time");

// Custom metrics for Leaderboard API
const leaderboardSuccess = new Counter("leaderboard_success");
const leaderboardFailure = new Counter("leaderboard_failure");
const leaderboardResponseTime = new Rate("leaderboard_response_time");

// Custom metrics for Referral API
const referralSuccess = new Counter("referral_success");
const referralFailure = new Counter("referral_failure");
const referralResponseTime = new Counter("referral_response_time");

// Custom metrics for Mark Attendance API
const markAttendanceSuccess = new Counter("markAttendance_success");
const markAttendanceFailure = new Counter("markAttendance_failure");
const markAttendanceResponseTime = new Counter("markAttendance_response_time");

// Custom metrics for lead Attendance API
const leadAttendanceSuccess = new Counter("leadAttendance_success");
const leadAttendanceFailure = new Counter("leadAttendance_failure");
const leadAttendanceResponseTime = new Counter("leadAttendance_response_time");

const updateAttendanceSuccess = new Counter("updateAttendance_success");
const updateAttendanceFailure = new Counter("updateAttendance_failure");
const updateAttendanceResponseTime = new Counter(
  "updateAttendance_response_time"
);
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzbHVnIjoidGFubWF5X3Uzend1IiwiZXhwIjoxNzQ5MTA4MTAyLCJpYXQiOjE3MTc1NzIxMDJ9.n3N-6c8kNCr7IHhsh9U7dOR10uknj3HCJZ8k9mDrfqo";
if (!token) {
  console.error("Token is not defined");
}

let date = new Date("2024-06-01");
if (!date) {
  console.error("Date initialization failed");
}
let phoneNumber = 4000500000;

export default function () {
  // Register Lead
  phoneNumber++;
  try {
    const registerUrl = "https://stage.habit.yoga/lead/register";
    const registerPayload = JSON.stringify({
      leadsource: null,
      mobilenumber: phoneNumber.toString(),
      name: `k6-${Date.now()}`,
      watigroupname: "https://u.habuild.in/y/yogaeverday21",
    });
    const registerParams = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const registerResponse = http.post(
      registerUrl,
      registerPayload,
      registerParams
    );
    if (!registerResponse) {
      throw new Error("Register response is undefined");
    }
    check(registerResponse, {
      "register is success": (r) => r.status === 200 || r.status === 201,
    });
    //   if (registerCheck) {
    //     registerSuccess.add(1);
    //   } else {
    //     registerFailure.add(1);
    //   }
    registerResponseTime.add(registerResponse.timings.duration, {
      api: "register",
    });
  } catch (error) {
    console.error(`Register Lead Error: ${error.message}`);
  }
  //   Get Leaderboard
  //   try {
  //     const leaderboardUrl =
  //       "https://stage.habit.yoga/program/getleaderboard?paid=false";
  //     const leaderboardParams = {
  //       headers: {
  //         Authorization: `${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const leaderboardResponse = http.get(leaderboardUrl, leaderboardParams);
  //     if (!leaderboardResponse) {
  //       throw new Error("Leaderboard response is undefined");
  //     }
  //     check(leaderboardResponse, {
  //       "leaderboard status is 200": (r) => r.status === 200,
  //     });
  //     //   if (leaderboardCheck) {
  //     //     leaderboardSuccess.add(1);
  //     //   } else {
  //     //     leaderboardFailure.add(1);
  //     //   }
  //     //   leaderboardResponseTime.add(leaderboardResponse.timings.duration, {
  //     //     api: "get_leaderboard",
  //     //   });
  //   } catch (error) {
  //     console.error(`Get Leaderboard Error: ${error.message}`);
  //   }
  //   Get My Referral
  //   try {
  //     const referralUrl = "https://stage.habit.yoga/lead/getmyreferral";
  //     const referralResponse = http.get(referralUrl, {
  //       headers: {
  //         Authorization: `${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!referralResponse) {
  //       throw new Error("Referral response is undefined");
  //     }
  //     check(referralResponse, {
  //       "referral status is 200": (r) => r.status === 200,
  //     });
  //     // if (referralCheck) {
  //     //   referralSuccess.add(1);
  //     // } else {
  //     //   referralFailure.add(1);
  //     // }
  //     // referralResponseTime.add(referralResponse.timings.duration, {
  //     //   api: "get_my_referral",
  //     // });
  //   } catch (error) {
  //     console.error(`Get My Referral Error: ${error.message}`);
  //   }
  // Mark Attendance
  //   try {
  //     const attendanceUrl =
  //       "https://stage.habit.yoga/lead/markattendance?slug=Tanmay_5srnm";
  //     const attendanceResponse = http.get(attendanceUrl, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!attendanceResponse) {
  //       throw new Error("Attendance response is undefined");
  //     }
  //     check(attendanceResponse, {
  //       "attendance is success": (r) => r.status === 200 || r.status === 201,
  //     });
  //     //   if (attendanceCheck) {
  //     //     markAttendanceSuccess.add(1);
  //     //   } else {
  //     //     markAttendanceFailure.add(1);
  //     //   }
  //     //   markAttendanceResponseTime.add(attendanceResponse.timings.duration);
  //   } catch (error) {
  //     console.error(`Mark Attendance Error: ${error.message}`);
  //   }
  // Get Lead Attendance
  //   try {
  //     const leadAttendanceUrl = "https://stage.habit.yoga/lead/getleadattendance";
  //     const leadAttendanceResponse = http.get(leadAttendanceUrl, {
  //       headers: {
  //         Authorization: `${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!leadAttendanceResponse) {
  //       throw new Error("Lead Attendance response is undefined");
  //     }
  //     check(leadAttendanceResponse, {
  //       "lead attendance is success": (r) => r.status === 200 || r.status === 201,
  //     });
  //     //   if (leadAttendanceCheck) {
  //     //     leadAttendanceSuccess.add(1);
  //     //   } else {
  //     //     leadAttendanceFailure.add(1);
  //     //   }
  //     //   leadAttendanceResponseTime.add(leadAttendanceResponse.timings.duration);
  //   } catch (error) {
  //     console.error(`Get Lead Attendance Error: ${error.message}`);
  //   }
  //   Update Lead Attendance with Incrementing Date
  //   try {
  //     date.setDate(date.getDate() + 1);
  //     const updateAttendancePayload = JSON.stringify({
  //       date: date.toISOString().split("T")[0],
  //     });
  //     const updateAttendanceUrl =
  //       "https://stage.habit.yoga/lead/updateleadattendance";
  //     const updateAttendanceParams = {
  //       headers: {
  //         Authorization: `${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const updateAttendanceResponse = http.post(
  //       updateAttendanceUrl,
  //       updateAttendancePayload,
  //       updateAttendanceParams
  //     );
  //     if (!updateAttendanceResponse) {
  //       throw new Error("Update Attendance response is undefined");
  //     }
  //     const updateAttendanceCheck = check(updateAttendanceResponse, {
  //       "update attendance is success": (r) =>
  //         r.status === 200 || r.status === 201,
  //     });
  //     if (updateAttendanceCheck) {
  //       updateAttendanceSuccess.add(1);
  //     } else {
  //       updateAttendanceFailure.add(1);
  //     }
  //     updateAttendanceResponseTime.add(updateAttendanceResponse.timings.duration);
  //   } catch (error) {
  //     console.error(`Update Lead Attendance Error: ${error.message}`);
  //   }
}
