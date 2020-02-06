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
            form_cong_viec.append("P_TIME_NHAN_VIEC", JSON.stringify(cong_viec.time_nhan_viec))
            form_cong_viec.append("P_TIME_HOAN_THANH", JSON.stringify(cong_viec.time_hoan_thanh))
            form_cong_viec.append("P_NGUOI_NHAP",cong_viec.nguoi_nhap)
            form_cong_viec.append("P_TYPE",cong_viec.type)
            axios.post('/api/cong-viec?api_token='+axios.defaults.params.api_token,form_cong_viec).then((response) => {
                cong_viec.id_cv_da = response.data
                // console.log(response)
                commit("ADD_CONGVIEC",cong_viec)
                resolve(response.data)
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
            form_cong_viec.append("P_TIME_NHAN_VIEC", JSON.stringify(cong_viec.time_nhan_viec))
            form_cong_viec.append("P_TIME_HOAN_THANH", JSON.stringify(cong_viec.time_hoan_thanh))
            axios.post('/api/capnhat_congviec/'+cong_viec.id_cv_da+'?api_token='+axios.defaults.params.api_token,form_cong_viec).then((response) => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    },
    deleteCongViec({commit},ID_CV_DA)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/cong-viec-delete/'+ID_CV_DA+'?api_token='+axios.defaults.params.api_token).then((response) => {
                commit('DELETE_CONG_VIEC',response.data)
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
//UPLOAD FILE CONG VIỆC
    uploadFile({commit},form_file)
    {   
        // console.log(form_file)
        return new Promise((resolve,reject) => {
            form_file.FILE_CV.forEach((file) => {
                const form = new FormData();
                form.append("FILE_CV",file)
                form.append("P_ID_CV_DA", form_file.P_ID_CV_DA)
                axios.post('/api/file-cv?api_token='+axios.defaults.params.api_token,form).then((response) => {
                    commit("ADD_FILE",{
                        id: response.data,
                        name: file.name,
                        id_cv_da: form_file.P_ID_CV_DA
                    })
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                })
            })
        })
    },
    getFile({commit},ID_CV_DA)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/file-cv/'+ID_CV_DA+'?api_token='+axios.defaults.params.api_token).then((response) => {
                commit("SET_FILES", response.data.result)
                resolve(response.data)
            }).catch((error) => {
                reject({
                    success: false,
                    message: 'Lỗi server!',
                    result: error,
                    status: 500
                })
            })
        })
    },
//THẨM ĐỊNH CÔNG VIỆC
    createThamDinhCV({commit},thamdinh)
    {
        return new Promise((resolve,reject) => {
            const form_tham_dinh = new FormData()
            form_tham_dinh.append("P_THAM_DINH_TGIAN",thamdinh.tham_dinh_tgian)
            form_tham_dinh.append("P_THAM_DINH_CHAT_LUONG",thamdinh.tham_dinh_chat_luong)
            form_tham_dinh.append("P_THAM_DINH_KHOI_LUONG",thamdinh.tham_dinh_khoi_luong)
            axios.post('/api/tham-dinh-cong-viec/'+axios.defaults.params.id_cv_da +'?api_token='+axios.defaults.params.api_token,form_tham_dinh).then((response) => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    },
//BÁO CÁO TIẾN ĐỘ
    fetchBaoCaoTienDoById({commit},id_cv_da)
    {   
       return new Promise((resolve,reject) => {
        axios.get('/api/bao-cao/'+id_cv_da+'?api_token='+axios.defaults.params.api_token).then((response) => {
            commit('SET_BAOCAO',response.data)
            resolve(true)
        }).catch(() => {
            reject(false)
        })
       })
    },
    createBaoCaoTienDo({commit},baocao)
    {
        return new Promise((resolve,reject) => {
            const form_baocao = new FormData()
            form_baocao.append("P_ID_CV", baocao.id_cv_da)
            form_baocao.append("P_ID_ND",baocao.id_nd)
            form_baocao.append("P_NOI_DUNG_BAOCAO", baocao.noidung)
            form_baocao.append("P_TRANG_THAI",baocao.trang_thai)
            form_baocao.append("P_TIEN_DO",baocao.tien_do)
            axios.post('/api/cong-viec/'+baocao.id_cv_da+'/baocao?api_token='+axios.defaults.params.api_token,form_baocao).then((response) => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    },
// CÔNG VIỆC DỰ ÁN KHÁCH HÀNG
    createCongViecKH({commit},form_cong_viec)
    {
        axios.post('/api/cong-viec-da?api_token='+axios.defaults.params.api_token,form_cong_viec)
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
    openBaoCao({commit},id_task)
    {
        commit("UPDATE_MODAL_BAOCAO",true)
        commit("SEARCH_TASK",id_task)
    },
    updateModalBaoCao({commit},boolean)
    {
        commit("UPDATE_MODAL_BAOCAO",boolean)
    },
    updateModalEdit({commit},boolean)
    {
        commit("UPDATE_MODAL",boolean)
    }
}