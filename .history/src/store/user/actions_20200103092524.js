import axios from '@/axios'

export default {
    fetchUsers({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/user?api_token='+axios.defaults.params.api_token).then((response) => {
                commit("SET_USER",response.data)
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    }
}