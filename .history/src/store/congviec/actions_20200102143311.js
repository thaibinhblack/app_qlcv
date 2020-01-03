import axios from '@/axios'
export default {
    fetchCongViec({commit})
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/cong-viec?api_token='+axios.defaults.params.api_token).then((response) => {
                commit("SET_CONGVIEC",response.data)
                resolve(true)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}