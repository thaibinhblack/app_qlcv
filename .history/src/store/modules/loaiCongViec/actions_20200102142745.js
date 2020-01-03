import axios from './node_modules/@/axios'

export default {
    fetchLCV({commit})
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/loai-cv?api_token='+axios.defaults.params.api_token).then((response) => {
                commit("SET_LCV",response.data)
                resolve(response)
            })
            .catch((error) => { reject(error) })
           
          })
        
    }
}