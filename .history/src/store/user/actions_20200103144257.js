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
    },
    fetchUserQLDA({commit},id_du_an)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/user-giaoviec?api_token='+axios.defaults.params.api_token+'&id_du_an='+id_du_an).then((response) => {
                commit("SET_USER_GIAOVIEC",response.data)
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
        
    }
}