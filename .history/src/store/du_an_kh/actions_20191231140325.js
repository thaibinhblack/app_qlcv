import axios from '@/axios'
export default {
    updateThongTin({commit},thongtin) {
        return new Promise((resolve, reject) => {
            const form_data= new FormData();
            form_data.append("P_ID_DU_AN_KH",thongtin.id_du_an_kh)
            form_data.append("P_TEN_THONGTIN",thongtin.ten_thongtin)
            form_data.append("P_NOI_DUNG_THONGTIN",thongtin.noi_dung_thongtin)
            axios.post('/api/thong-tin-duan-kh/ '+thongtin.id_thongtin+'?api_token='+axios.defaults.params.api_token,form_data).then((response) => {
                
                // app.$buefy.notification.open({
                //     duration: 1500,
                //     message: 'Thêm thông tin mới thành công',
                //     position: 'is-bottom-left',
                //     type: 'is-success',
                //     hasIcon: true
                // })
                resolve(response)
                return response.data
            })
            .catch((error) => { 
                return false
                reject(error) })
          })
    }
}