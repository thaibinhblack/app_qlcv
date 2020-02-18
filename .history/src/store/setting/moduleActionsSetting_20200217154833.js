import axios from '@/axios'

export default {
    createSettingDuAn({commit},setting)
    {
        return new Promise((resolve,reject) => {
            const form_setting = new FormData();
            form_setting.append("P_ID_DU_AN",setting.id_du_an)
            form_setting.append("VALUE_CD_DA",JSON.stringify(setting.VALUE_CD_DA))
            axios.post('/api/setting-du-an?api_token='+axios.defaults.params.api_token,form_setting)
            .then((response) => {
                resolve(response.data)
                commit("SET_CD_DA")
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}