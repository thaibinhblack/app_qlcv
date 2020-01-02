export default {
//trạng thái dự án khách hàng
    // THÊM DANH SÁCH trạng thái dự án khách hàng vào store
    SET_TRANG_THAI(state,payload){
        state.list_trang_thai = payload
    },
    //thêm trạng thái mới của dự án khách hàng vào store 
    addTrangThaiDUANKH(state,payload){
        state.list_trang_thai.push(payload)
    }
}