export default {
    //thêm trạng thái mới của dự án khách hàng vào store 
    addTrangThaiDUANKH(state,payload){
        state.list_trang_thai.push(payload)
    }
}