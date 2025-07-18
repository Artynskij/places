import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://172.27.20.224:49400", //http://172.27.20.224:49400 http://localhost:49400
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export default apiClient;
