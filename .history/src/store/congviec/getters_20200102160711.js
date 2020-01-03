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
        return state.task_edit
    }
}