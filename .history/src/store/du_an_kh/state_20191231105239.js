import axios from '@/axios'
export default {
    updated_du_an_kh({commit},thongtin) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/thong-tin-duan-kh/${thongtin.id_thongtin}?api_token=`+axios.defaults.params.api_token,thongtin.form_thongtin)
              .then((response) => {
                // commit('UPDATE_PRODUCT', response.data)
                console.log(response.data)
                resolve(response)
              })
              .catch((error) => { reject(error) })
          })
    }
}