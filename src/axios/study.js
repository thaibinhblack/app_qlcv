import axios from 'axios'
const url_server = "http://10.102.13.14:8005/server_study/public";

export default axios.create({baseURL: url_server, params: {api_token : 'my_token'}})