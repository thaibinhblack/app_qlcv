export default {
    SET_LICH_CONG_TAC(state,lich_cong_tac)
    {
        lich_cong_tac.forEach((element) => {
            element.time_start = JSON.parse(element.time_start)
            element.time_end = JSON.parse(element.time_end)
            element.nhan_vien_di_ct = JSON.parse(element.nhan_vien_di_ct)
        })
        state.LIST_CONG_TAC = lich_cong_tac
    },
    ADD_LICH_CONG_TAC(state,cong_tac)
    {
        state.LIST_CONG_TAC.push(cong_tac)
    }
}