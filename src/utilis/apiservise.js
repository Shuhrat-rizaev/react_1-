import axios from "axios";
export const apiClint = axios.create({ baseURL: "https://dummyjson.com" });

apiClint.interceptors.response.use(
  (res) => {
    return res;
  },

  (err) => {
    console.log(err);
  }
);

let token = localStorage.getItem("access");
apiClint.interceptors.request.use(
  (conf) => {
    conf.headers["Authorization"] = `Bearer ${token}`;
    // console.log(conf);
    return conf;
  },
  (err) => {
    console.log(err.message);
  }
);
