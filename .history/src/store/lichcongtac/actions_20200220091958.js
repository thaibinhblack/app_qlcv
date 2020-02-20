import axios from '@/axios'

export default {
    fetch_LICH_CONG_TAC({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/lich-cong-tac?api_token='+axios.defaults.params.api_token)
            .then((response) => {
                commit("SET_LICH_CONG_TAC",response.data)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    create_LICH_CONG_TAC({commit},cong_tac)
    {
        const form_cong_tac = new FormData();
        form_cong_tac.append("P_TEN_LICH_CT",cong_tac.ten_lich_ct)
        form_cong_tac.append("P_NOI_DUNG_LICH_CT",cong_tac.noi_dung_lich_ct)
        form_cong_tac.append("P_TIME_START",JSON.stringify(cong_tac.time_start))
        form_cong_tac.append("P_DATE_START",cong_tac.date_start)
        form_cong_tac.append("P_TIME_END",JSON.stringify(cong_tac.time_end))
        form_cong_tac.append("P_DATE_END",cong_tac.date_end)
        form_cong_tac.append("P_NHAN_VIEN_CT",JSON.stringify(cong_tac.nhan_vien_di_ct))
        return new Promise((resolve,reject) => {
            axios.post('/api/lich-cong-tac?api_token='+axios.defaults.params.api_token,form_cong_tac)
            .then((response) => {
                resolve(response.data)
                commit("ADD_LICH_CONG_TAC",cong_tac)
            })
            .catch((err) => {
                reject(err)
            })
        })

    }
}