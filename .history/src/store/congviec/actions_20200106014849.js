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
                    time_end = time.time_end
            }
            axios.get('/api/cong-viec?api_token='+axios.defaults.params.api_token+'&time_start='+time_start+'&time_end='+time_end).then((response) => {
                commit("SET_CONGVIEC",response.data)
                // console.log('cong việc',response.data)
                resolve(true)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    createCongViec({commit},cong_viec)
    {
        return new Promise((resolve,reject) => {
            const form_cong_viec = new FormData();
            console.log(cong_viec)
            form_cong_viec.append("P_ID_CV_DA",0)
            form_cong_viec.append("P_ID_DU_AN",cong_viec.id_du_an)
            form_cong_viec.append("P_TEN_CV",cong_viec.ten_cv)
            form_cong_viec.append("P_NOI_DUNG_CV",cong_viec.noi_dung_cv)
            form_cong_viec.append("P_NGAY_TIEP_NHAN",cong_viec.ngay_tiep_nhan)
            form_cong_viec.append("P_NGAY_GIAO_VIEC", cong_viec.ngay_giao_viec)
            form_cong_viec.append("P_NGAY_HOAN_THANH", cong_viec.ngay_hoan_thanh)
            form_cong_viec.append("P_NGAY_CAM_KET", cong_viec.ngay_cam_ket)
            form_cong_viec.append("P_GIO_THUC_HIEN",cong_viec.gio_thuc_hien)
            form_cong_viec.append("P_DO_UU_TIEN",cong_viec.do_uu_tien)
            form_cong_viec.append("P_MA_JIRA",cong_viec.ma_jara)
            form_cong_viec.append("P_NGUOI_GIAO_VIEC",cong_viec.nguoi_giao_viec)
            form_cong_viec.append("P_NGUOI_NHAN_VIEC",cong_viec.nguoi_nhan_viec)
            form_cong_viec.append("P_TIEN_DO",cong_viec.tien_do)
            form_cong_viec.append("P_GHI_CHU",cong_viec.ghi_chu)
            form_cong_viec.append("P_LY_DO",cong_viec.ly_do)
            form_cong_viec.append("P_THAM_DINH_TGIAN",cong_viec.tham_dinh_tgian)
            form_cong_viec.append("P_THAM_DINH_KHOI_LUONG",cong_viec.tham_dinh_khoi_luong)
            form_cong_viec.append("P_THAM_DINH_CHAT_LUONG",cong_viec.tham_dinh_chat_luong)
            form_cong_viec.append("P_TRANG_THAI_LTRINH",cong_viec.trang_thai_ltrinh)
            form_cong_viec.append("P_TRANG_THAI",cong_viec.trang_thai)
            form_cong_viec.append("P_ID_LOAI_CV",cong_viec.id_loai_cv)
            form_cong_viec.append("P_NGUOI_YEU_CAU",cong_viec.nguoi_yeu_cau)
            form_cong_viec.append("P_ACTION",1)
            form_cong_viec.append("P_NGUOI_NHAP",cong_viec.nguoi_nhap)
            form_cong_viec.append("P_TYPE",cong_viec.type)
            axios.post('/api/cong-viec?api_token='+axios.defaults.params.api_token,form_cong_viec).then((response) => {
                cong_viec.id_cv_da = response.data
                // console.log(response)
                commit("ADD_CONGVIEC",cong_viec)
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    },
    updateCongViec({commit},cong_viec)
    {
        return new Promise((resolve,reject) => {
            const form_cong_viec = new FormData();
            form_cong_viec.append("P_ID_CV_DA",cong_viec.id_cv_da)
            form_cong_viec.append("P_ID_DU_AN",cong_viec.id_du_an)
            form_cong_viec.append("P_TEN_CV",cong_viec.ten_cv)
            form_cong_viec.append("P_NOI_DUNG_CV",cong_viec.noi_dung_cv)
            form_cong_viec.append("P_NGAY_TIEP_NHAN",cong_viec.ngay_tiep_nhan)
            form_cong_viec.append("P_NGAY_GIAO_VIEC", cong_viec.ngay_giao_viec)
            form_cong_viec.append("P_NGAY_HOAN_THANH", cong_viec.ngay_hoan_thanh)
            form_cong_viec.append("P_NGAY_CAM_KET", cong_viec.ngay_cam_ket)
            form_cong_viec.append("P_GIO_THUC_HIEN",cong_viec.gio_thuc_hien)
            form_cong_viec.append("P_DO_UU_TIEN",cong_viec.do_uu_tien)
            form_cong_viec.append("P_MA_JIRA",cong_viec.ma_jara)
            form_cong_viec.append("P_NGUOI_GIAO_VIEC",cong_viec.nguoi_giao_viec)
            form_cong_viec.append("P_NGUOI_NHAN_VIEC",cong_viec.nguoi_nhan_viec)
            form_cong_viec.append("P_TIEN_DO",cong_viec.tien_do)
            form_cong_viec.append("P_GHI_CHU",cong_viec.ghi_chu)
            form_cong_viec.append("P_LY_DO",cong_viec.ly_do)
            form_cong_viec.append("P_THAM_DINH_TGIAN",cong_viec.tham_dinh_tgian)
            form_cong_viec.append("P_THAM_DINH_KHOI_LUONG",cong_viec.tham_dinh_khoi_luong)
            form_cong_viec.append("P_THAM_DINH_CHAT_LUONG",cong_viec.tham_dinh_chat_luong)
            form_cong_viec.append("P_TRANG_THAI_LTRINH",cong_viec.trang_thai_ltrinh)
            form_cong_viec.append("P_TRANG_THAI",cong_viec.trang_thai)
            form_cong_viec.append("P_ID_LOAI_CV",cong_viec.id_loai_cv)
            form_cong_viec.append("P_NGUOI_YEU_CAU",cong_viec.nguoi_yeu_cau)
            form_cong_viec.append("P_ACTION",2)
            form_cong_viec.append("P_NGUOI_NHAP",cong_viec.nguoi_nhap)
            form_cong_viec.append("P_TYPE",cong_viec.type)
            axios.post('/api/capnhat_congviec/'+cong_viec.id_cv_da+'?api_token='+axios.defaults.params.api_token,form_cong_viec).then(() => {
                commit("UPDATE_CONGVIEC",cong_viec)
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    },
//công việc dự án

    FilterCongViec({commit},filter)
    {
        var query = "&id_du_an="+filter.id_du_an+"&id_du_an_kh="+filter.id_du_an_kh+'&nguoi_nhan_viec='+filter.nguoi_nhan_viec+"&id_loai_cv="+filter.id_loai_cv;
        return new Promise((resolve,reject) => {
            axios.get('/api/cong-viec-filter?api_token='+axios.defaults.params.api_token+'&time_start='+filter.time_start+'&time_end='+filter.time_end+query).then((response) => {
                commit("SET_CONGVIEC",response.data)
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    },
    FilterCongViecDuAn({commit},time)
    {
        return new Promise((resolve,reject) => {
            var time_start = new Date().toISOString().substr(0,10);
            var time_end = time_start
            if(time != null)
            {
                    time_start = time.time_start
                    time_end = time.time_end
            }
            axios.get('/api/cong-viec?api_token='+axios.defaults.params.api_token+'&time_start='+time_start+'&time_end='+time_end).then((response) => {
                commit("SET_CONGVIEC",response.data)
                // console.log('cong việc',response.data)
                resolve(true)
                }).catch(() => {
                reject(false)
            })
        })
        // commit("FILTER_CONGVIEC",id_du_an)
    },
    resetCongViecEdit({commit})
    {
        commit("RESET_CONGVIEC_EDIT")
    },
    openTask({commit},id_task)
    {
        commit("UPDATE_MODAL_EDIT",true)
        commit("SEARCH_TASK",id_task)
    },
    updateModalEdit({commit},boolean)
    {
        commit("UPDATE_MODAL",boolean)
    }
}