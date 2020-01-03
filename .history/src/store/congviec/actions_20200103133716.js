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
        const cong_viec = new FormData();
        cong_viec.append("P_ID_CV_DA",this.cong_viec.id_cv_da)
        cong_viec.append("P_ID_DU_AN",this.cong_viec.id_du_an)
        cong_viec.append("P_TEN_CV",this.cong_viec.ten_cv)
        cong_viec.append("P_NOI_DUNG_CV",this.cong_viec.noi_dung_cv)
        cong_viec.append("P_NGAY_TIEP_NHAN",this.cong_viec.ngay_tiep_nhan)
        cong_viec.append("P_NGAY_GIAO_VIEC", this.cong_viec.ngay_giao_viec)
        cong_viec.append("P_NGAY_HOAN_THANH", this.cong_viec.ngay_hoan_thanh)
        cong_viec.append("P_NGAY_CAM_KET", this.cong_viec.ngay_cam_ket)
        cong_viec.append("P_GIO_THUC_HIEN",this.cong_viec.gio_thuc_hien)
        cong_viec.append("P_DO_UU_TIEN",this.cong_viec.do_uu_tien)
        cong_viec.append("P_MA_JIRA",this.cong_viec.ma_jara)
        cong_viec.append("P_NGUOI_GIAO_VIEC",this.selected_user_giaoviec.id_nd)
        cong_viec.append("P_NGUOI_NHAN_VIEC",this.selected_user_tiepnhan.id_nd)
        cong_viec.append("P_TIEN_DO",this.cong_viec.tien_do)
        cong_viec.append("P_GHI_CHU",this.cong_viec.ghi_chu)
        cong_viec.append("P_LY_DO",this.cong_viec.ly_do)
        cong_viec.append("P_THAM_DINH_TGIAN",this.cong_viec.tham_dinh_tgian)
        cong_viec.append("P_THAM_DINH_KHOI_LUONG",this.cong_viec.tham_dinh_khoi_luong)
        cong_viec.append("P_THAM_DINH_CHAT_LUONG",this.cong_viec.tham_dinh_chat_luong)
        cong_viec.append("P_TRANG_THAI_LTRINH",this.cong_viec.trang_thai_ltrinh)
        cong_viec.append("P_TRANG_THAI",this.cong_viec.trang_thai)
        cong_viec.append("P_ID_LOAI_CV",this.selected_loai_cv.id_loai_cv)
        cong_viec.append("P_NGUOI_YEU_CAU",this.cong_viec.nguoi_yeu_cau)
        cong_viec.append("P_ACTION",1)
        cong_viec.append("P_NGUOI_NHAP",this.my_info.id_nd)
        if(this.ca_nhan == true)
        {
            cong_viec.append("P_TYPE",0)
        }
        else
        {
          cong_viec.append("P_TYPE",this.cong_viec.type_cv == true ? 1 : 0)
        }
    },
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
    openTask({commit},id_task)
    {
        commit("UPDATE_MODAL_EDIT",true)
        commit("SEARCH_TASK",id_task)
    }
}