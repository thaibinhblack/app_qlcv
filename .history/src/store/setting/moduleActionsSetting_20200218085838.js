import axios from '@/axios'

export default {
    fetchSettingDuAn({commit},ID_DU_AN)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/setting-du-an/'+ID_DU_AN+'?api_token='+axios.defaults.params.api_token)
            .then((response) => {
                if(Object.entries(response.data).length > 0)
                {
                    commit("SET_CD_DA",JSON.parse(response.data.value_cd_da))
                }
                else
                {
                    commit("SET_CD_DA",[])

                }
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    createSettingDuAn({commit},setting)
    {
        return new Promise((resolve,reject) => {
            const form_setting = new FormData();
            form_setting.append("P_ID_DU_AN",setting.id_du_an)
            form_setting.append("P_VALUE_CD_DA",JSON.stringify(setting.VALUE_CD_DA))
            axios.post('/api/setting-du-an?api_token='+axios.defaults.params.api_token,form_setting)
            .then((response) => {
                resolve(response.data)
                commit("SET_CD_DA",setting.VALUE_CD_DA)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    ///update value setting dự án
    updateValueSetting(value_setting)
    {
        return new Promise((resolve,reject) => {
            const form_value_setting = new FormData();
            form_value_setting.append("P_VALUE_ATTRIBUTE", JSON.stringify(value_setting))
            axios.post('/api/setting-value-du-an?api_token='+axios.defaults.params.api_token,form_value_setting)
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}