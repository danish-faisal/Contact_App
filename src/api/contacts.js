import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:3006/",
    // baseURL: "https://my-json-server.typicode.com/danish-faisal/ContactApp_Server/",
    baseURL: "https://contactapp-server-backend.herokuapp.com/"
});