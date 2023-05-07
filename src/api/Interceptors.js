import axios from "axios";
import { useNavigate } from "react-router-dom";

export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,

  headers: {
    access_token:
      localStorage.getItem("jwt_accessToken") &&
      localStorage.getItem("jwt_accessToken"),
    refresh_token:
      localStorage.getItem("jwt_accessToken") &&
      localStorage.getItem("jwt_refreshToken"),
  },
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    // console.log(config);
    // const AccessToken = localStorage.getItem("jwt_accessToken");
    // const RefreshToken = localStorage.getItem("jwt_refreshToken");
    // if (AccessToken) config.headers["access_token"] = AccessToken;
    // if (RefreshToken) config.headers["refresh_token"] = RefreshToken;
    return config;
  },
  function (error) {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    /*
        http status가 200인 경우
        응답 바로 직전에 대해 작성합니다.
        .then() 으로 이어집니다.
    */
    return response;
  },

  function (error) {
    /*
        http status가 200이 아닌 경우
        응답 에러 처리를 작성합니다.
        .catch() 으로 이어집니다.
    */
    if (error.response && error.response.status === 401) {
      Logout();
      return new Promise(() => {}); //이행되지 않은 Promise를 반환하여 Promise Chaining 끊어주기
    }
    // console.log("rtk 만료되었습니다. 자동 로그아웃 됩니다.", error);
    // const navigate = useNavigate();
    // localStorage.removeItem("jwt_accessToken");
    // localStorage.removeItem("jwt_refreshToken");
    // localStorage.setItem("isAuthorized", false);
    // navigate("/login");

    return Promise.reject(error);
  }
);

const Logout = () => {
  const navigate = useNavigate();
  api
    .post(
      "/",
      {},
      {
        headers: {
          access_token: localStorage.getItem("jwt_accessToken"),
          refresh_token: localStorage.getItem("jwt_refreshToken"),
        },
      }
    )
    .then((response) => {
      console.log(response);
      localStorage.removeItem("jwt_accessToken");
      localStorage.removeItem("jwt_refreshToken");
      localStorage.setItem("isLogined", false);
      alert("로그아웃 성공! 다음에 또 만나요❤️");
      navigate("/login");
    })
    .catch((err) => console.log(err));
};
//  export default api;
