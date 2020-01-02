export default {
//thông tin khác của dự án
    SET_THONGTIN(state,list_thongtin){
      state.list_thongtin = list_thongtin  
    },
    ADD_THONGTIN(state,thongtin){
        state.list_thongtin.push(thongtin)
    },
    DELETE_THONGTIN(state,thongtin) {
        const ItemIndex = state.list_thongtin.findIndex((p) => p.id_thongtin == thongtin.id_thongtin)
        state.list_thongtin.splice(ItemIndex, 1)
    },
//trạng thái dự án khách hàng
    // THÊM DANH SÁCH trạng thái dự án khách hàng vào store
    SET_TRANG_THAI(state,list_trang_thai){
        state.list_trang_thai = list_trang_thai
    },
    //thêm trạng thái mới của dự án khách hàng vào store 
    ADD_TRANG_THAI_NEW(state,trang_thai){
        state.list_trang_thai.push(trang_thai)
    }
}