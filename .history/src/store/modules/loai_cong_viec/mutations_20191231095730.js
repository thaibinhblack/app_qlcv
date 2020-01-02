import axios from '@/axios'

export default {
    fetchLCV({commit})
    {
        axios.get('/api/loai-cv?api_token='+axios.defaults.params.api_token).then((response) => {
            commit("SET_LCV",response.data)
        })
    }
}