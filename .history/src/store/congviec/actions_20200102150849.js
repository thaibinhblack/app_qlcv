import axios from '@/axios'
export default {
    fetchCongViec({commit},time)
    {
        return new Promise((resolve, reject) => {
            var time_start = new Date().toISOString().substr(0,10);
            var time_end = time_start
            if(time != null)
            {
                    time_start = time.time_start
                    time_end = time.time_start
            }
            axios.get('/api/cong-viec?api_token='+axios.defaults.params.api_token+'&time_start='+time_start+'&time_end='+time_end).then((response) => {
                commit("SET_CONGVIEC",response.data)
                console.log('cong việc',response.data)
                resolve(true)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}