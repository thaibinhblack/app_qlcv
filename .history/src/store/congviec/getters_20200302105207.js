export default {
    getCongViec: state => {
        state.list_congviec.forEach((ctd) => {
            ctd.gio_thuc_hien = parseFloat(ctd.gio_thuc_hien)
            ctd.tham_dinh_tgian = ctd.gio_thuc_hien 
        })
        return state.list_congviec;
    },
    LIST_CONG_VIEC_TRONGNGAY: state => {
        return state.list_congviec_trong_ngay
    },
    total_time_cong_viec: state =>
    {
        var total = 0 ;
        state.list_congviec.forEach((cv) => {
            
            total = total + parseFloat(cv.gio_thuc_hien)
            // console.log(total, parseFloat(cv.gio_thuc_hien))
        })
        return total;
    },
    total_time_cho_tham_dinh(state)
    {
        var total = 0;
        state.list_congviec_ctd.forEach((cv) => {
            
            total = total + parseFloat(cv.gio_thuc_hien)
            // console.log(total, parseFloat(cv.gio_thuc_hien))
        })
        return total;
    },
    total_time_da_tham_dinh(state)
    {
        var total = 0;
        state.list_congviec_dtd.forEach((cv) => {
            
            total = total + parseFloat(cv.gio_thuc_hien)
            // console.log(total, parseFloat(cv.gio_thuc_hien))
        })
        return total;
    },
    getCongViecByStatus1: state => {
        return state.list_congviec_tmp.filter((value,index,array) => {
            return array[index].trang_thai == 1
        })
    },
    getCongViecByStatus2: state => {
        return state.list_congviec_tmp.filter((value,index,array) => {
            return array[index].trang_thai == 2
        })
    },
    getCongViecByStatus3: state => {
        return state.list_congviec_tmp.filter((value,index,array) => {
            return array[index].trang_thai == 3
        })
    },
    getCongViecByStatus4: state => {
        return state.list_congviec_tmp.filter((value,index,array) => {
            return array[index].trang_thai == 4
        })
    },
    isModalEdit: state => {
        return state.isModalEdit
    },
    isModalGiaHan: state => {
        return state.isModalGiaHan
    },
    isModalBaoCao: state => {
        return state.isModalBaoCao
    },
    getTaskEdit: state => {
        state.task_edit.ngay_tiep_nhan = state.task_edit.ngay_tiep_nhan != null ?  state.task_edit.ngay_tiep_nhan.slice(0,10) : null
        state.task_edit.ngay_giao_viec =  state.task_edit.ngay_giao_viec != null ? state.task_edit.ngay_giao_viec.slice(0,10) : null
        state.task_edit.ngay_hoan_thanh =  state.task_edit.ngay_hoan_thanh != null ? state.task_edit.ngay_hoan_thanh.slice(0,10) : null
        state.task_edit.ngay_cam_ket =   state.task_edit.ngay_cam_ket != null ? state.task_edit.ngay_cam_ket.slice(0,10) : null
        state.task_edit.ngay_tham_dinh =   state.task_edit.ngay_tham_dinh != null ? state.task_edit.ngay_tham_dinh.slice(0,10) : null
        state.task_edit.han_hoan_thanh =   state.task_edit.han_hoan_thanh != null ? state.task_edit.han_hoan_thanh.slice(0,10) : null
        // console.log(state.task_edit)
        return state.task_edit
    },
    LIST_BAOCAO: state => {
        return state.list_baocao
    },
    LIST_FILE: state => {
        return state.list_file
    },
    GET_SETTING: state => {
        return state.settings.filter((value,index,array) => {
           
            return array[index].hidden == true
        })
    },
    settings: state => {
        return state.settings
    },
    setting_modal: state => {
        return state.setting_modal
    },
    DELETE_CV_DA_KH: state => {
        return state.DELETE_CV_DA_KH
    },
    LIST_CONG_VIEC_CTD: state => {
        state.list_congviec_ctd.forEach((ctd) => {
            ctd.gio_thuc_hien = parseFloat(ctd.gio_thuc_hien)
            ctd.tham_dinh_tgian = ctd.gio_thuc_hien 
        })
        return state.list_congviec_ctd
    },
    LIST_CONG_VIEC_DTD: state => {
        state.list_congviec_dtd.forEach((ctd) => {
            ctd.gio_thuc_hien = parseFloat(ctd.gio_thuc_hien)
        })
        return state.list_congviec_dtd
    },
    LIST_CONG_VIEC_PHANCONG: state => {
        state.list_cong_viec_phan_cong.forEach((ctd) => {
            ctd.gio_thuc_hien = parseFloat(ctd.gio_thuc_hien)
            ctd.tham_dinh_tgian = ctd.gio_thuc_hien 
        })
        return state.list_cong_viec_phan_cong
        
    }
}