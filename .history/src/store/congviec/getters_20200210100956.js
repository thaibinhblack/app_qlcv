export default {
    getCongViec: state => {
        return state.list_congviec;
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
    }
}