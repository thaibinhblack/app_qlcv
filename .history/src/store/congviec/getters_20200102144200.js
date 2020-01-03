export default {
    getCongViec: state => {
        return state.list_congviec;
    },
    getCongViecByStatus(state,status) {
        return state.list_congviec.filter((value,index,array) => {
            return array[index].trang_thai == status
        })
    }
}