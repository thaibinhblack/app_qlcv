import axios from '@/axios'
export default {

//dự án khách hàng
    fetchDuAnKHById({commit},id)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/du-an-kh/'+id+'?show=ID_DU_AN&api_token='+axios.defaults.params.api_token).then((response) => {
                commit("SET_DUANKH",response.data)
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    },
    updateDuAnKH({commit},du_an_kh){
        return new Promise((resolve,reject) => {
            const form_du_an_kh = new FormData();
            form_du_an_kh.append("P_ID_DU_AN",du_an_kh.id_du_an)
            form_du_an_kh.append("P_TEN_DU_AN_KH",du_an_kh.ten_du_an_kh)
            form_du_an_kh.append("P_MO_TA_DU_AN",du_an_kh.mo_ta_du_an)
            form_du_an_kh.append("P_GHI_CHU_DU_AN",du_an_kh.ghi_chu_du_an)
            form_du_an_kh.append("P_TRANG_THAI_DU_AN",du_an_kh.trang_thai_du_an)
            form_du_an_kh.append("P_ID_KHACH_HANG",du_an_kh.id_khach_hang)
            // form_du_an_kh.append("")
            axios.post('/api/du-an-kh/'+du_an_kh.id_du_an_kh+'?api_token='+axios.defaults.params.api_token,form_du_an_kh)
            .then((response) => {
                commit("UPDATE_DU_AN_KH",du_an_kh)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
//thông tin dự án khách hàng
    fetchThongTin({commit},id_du_an_kh)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/thong-tin-duan-kh/'+id_du_an_kh+'?api_token='+axios.defaults.params.api_token).then((response) => {
                commit("SET_THONGTIN",response.data)
                resolve(response)
                return true;
            }).catch((error) => {
                reject(error)
                return false;
            })
        })
    },
    createThongTin({commit},thongtin){
        return new Promise((resolve,reject) => {
            const form_thongtin = new FormData()
            form_thongtin.append("P_ID_THONGTIN",thongtin.id_thongtin);
            form_thongtin.append("P_ID_DU_AN_KH",thongtin.id_du_an_kh);
            form_thongtin.append("P_TEN_THONGTIN",thongtin.ten_thongtin);
            form_thongtin.append("P_NOI_DUNG_THONGTIN",thongtin.noi_dung_thongtin);
            axios.post('/api/thong-tin-duan-kh?api_token='+axios.defaults.params.api_token,form_thongtin).then((response) => {
                thongtin.id_thongtin = response.data
                commit("ADD_THONGTIN",thongtin)
                resolve(response)
                return true;
            }).catch((error) => {
                reject(error)
                return false;
            })
            // form_thongtin.append("P_ID_THONGTIN",thongtin.id_thongtin);


        })
    },
    updateThongTin({commit},thongtin) {
        return new Promise((resolve, reject) => {
            const form_data= new FormData();
            form_data.append("P_ID_DU_AN_KH",thongtin.id_du_an_kh)
            form_data.append("P_TEN_THONGTIN",thongtin.ten_thongtin)
            form_data.append("P_NOI_DUNG_THONGTIN",thongtin.noi_dung_thongtin)
            axios.post('/api/thong-tin-duan-kh/'+thongtin.id_thongtin+'?api_token='+axios.defaults.params.api_token,form_data).then((response) => {
                commit("UPDATE_THONGTIN",thongtin)
                resolve(response)
                return response.data
            })
            .catch((error) => { 
                reject(error)
                return false
            })
          })
    },
    deleteThongTin({commit},thongtin)
    {
        new Promise((resolve,reject) => {
            axios.post('/api/thong-tin-duan-kh/'+thongtin.id_thongtin+'/delete?api_token='+axios.defaults.params.api_token).then((response) => {
                commit('DELETE_THONGTIN',thongtin);
                resolve(response)
                return true;
            }).catch((error) => {
                reject(error);
                return false;
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
                resolve(true)
                // return true
            }).catch(() => {
                reject(false)
                // return false
            })
        })
    },
    deleteTrangThai({commit},id_trang_thai)
    {
        return new Promise((resolve,reject) => {
            axios.post('/api/trang-thai-du-an-kh/'+id_trang_thai+'/delete?api_token='+axios.defaults.params.api_token).then(() => {
                commit("DELETE_TRANGTHAI",id_trang_thai)
                resolve(true)                
            }).catch(() => {
                reject(false)
            })
        })
    }
}