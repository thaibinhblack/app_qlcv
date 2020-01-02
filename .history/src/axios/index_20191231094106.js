import axios from 'axios'
const url_server = "http://127.0.0.1:8000";

export default axios.create({baseURL: url_server, params: {api_token : 'my_token'}})