import axios from '@/axios'


export default {
    fetchDuAn({commit})
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/du-an?api_token='+axios.defaults.params.api_token).then((response) => {
                commit("SET_DUAN",response.data)
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    }
}