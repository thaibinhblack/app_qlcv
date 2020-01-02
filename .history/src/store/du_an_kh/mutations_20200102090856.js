export default {
//thông tin khác của dự án
    DELETE_THONGTIN(state,payload) {
        const ItemIndex = state.list_thongtin.findIndex((p) => p.id_thongtin == payload.id_thongtin)
        state.list_thongtin.splice(ItemIndex, 1)
    },
//trạng thái dự án khách hàng
    // THÊM DANH SÁCH trạng thái dự án khách hàng vào store
    SET_TRANG_THAI(state,payload){
        state.list_trang_thai = payload
    },
    //thêm trạng thái mới của dự án khách hàng vào store 
    ADD_TRANG_THAI_NEW(state,payload){
        state.list_trang_thai.push(payload)
    }
}