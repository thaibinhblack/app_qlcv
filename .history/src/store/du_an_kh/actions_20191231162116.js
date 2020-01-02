import axios from '@/axios'
export default {
    updateThongTin({commit},thongtin) {
        return new Promise((resolve, reject) => {
            const form_data= new FormData();
            form_data.append("P_ID_DU_AN_KH",thongtin.id_du_an_kh)
            form_data.append("P_TEN_THONGTIN",thongtin.ten_thongtin)
            form_data.append("P_NOI_DUNG_THONGTIN",thongtin.noi_dung_thongtin)
            axios.post('/api/thong-tin-duan-kh/ '+thongtin.id_thongtin+'?api_token='+axios.defaults.params.api_token,form_data).then((response) => {

                resolve(response)
                return response.data
            })
            .catch((error) => { 
                reject(error)
                return false
            })
          })
    },
//trạng thái dự án khách hàng
    //api fetch trạng thái dự án khách hàng
    fetchTrangThaiDuAn({commit}){
        return new Promise((resolve,reject) =>
        {
            axios.get('/api/trang-thai-du-an-kh?api_token='+axios.defaults.params.api_token).then((response) => {
                commit("SET_TRANG_THAI",response.data)
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // api thêm trạng thái mới cho dự án
    createTrangThaiDuAn({commit},trang_thai)
    {
        return new Promise((resolve,reject) => {
            const form_trang_thai = new FormData();
            form_trang_thai.append("P_TEN_TRANG_THAI", trang_thai.ten_trang_thai)
            form_trang_thai.append("P_NOI_DUNG_TRANG_THAI", trang_thai.noi_dung_trang_thai)
            form_trang_thai.append("P_GHI_CHU_TRANG_THAI", trang_thai.ghi_chu_trang_thai)
            axios.post('/api/trang-thai-du-an-kh?api_token='+axios.defaults.params.api_token,form_trang_thai).then((response) => {
                trang_thai.id_trang_thai = response.data
                commit("ADD_TRANG_THAI_NEW",trang_thai)
                resolve(response)
                return true
            }).catch((error) => {
                reject(error)
                return false
            })
        })
    }
}