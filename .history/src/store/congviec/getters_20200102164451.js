export default {
    getCongViec: state => {
        return state.list_congviec;
    },
    getCongViecByStatus1: state => {
        return state.list_congviec.filter((value,index,array) => {
            return array[index].trang_thai == 1
        })
    },
    isModalEdit: state => {
        return state.isModalEdit
    },
    getTaskEdit: state => {
        state.task_edit.ngay_tiep_nhan = state.task_edit.ngay_tiep_nhan != null ?  state.task_edit.ngay_tiep_nhan.slice(0,10) : null
        state.task_edit.ngay_giao_viec =  state.task_edit.ngay_giao_viec != null ? state.task_edit.ngay_giao_viec.slice(0,10) : null
        state.task_edit.ngay_hoan_thanh =  state.task_edit.ngay_hoan_thanh != null ? state.task_edit.ngay_hoan_thanh.slice(0,10) : null
        state.task_edit.ngay_cam_ket =   state.task_edit.ngay_cam_ket != null ? state.task_edit.ngay_cam_ket.slice(0,10) : null
        state.task_edit.ngay_tham_dinh =   state.task_edit.ngay_tham_dinh != null ? state.task_edit.ngay_tham_dinh.slice(0,10) : null
        return state.task_edit
    }
}