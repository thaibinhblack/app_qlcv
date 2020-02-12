import axios from '@/axios'
export default {
    fecth_12THANG_LCV({commit})
    {
        return new Promise((resovle,reject) => {
            axios.get('/api/thong-ke-lcv-12-thang')
            .then((response) => {
                commit("SET_CHART_PIE",response.data)
                resovle(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}