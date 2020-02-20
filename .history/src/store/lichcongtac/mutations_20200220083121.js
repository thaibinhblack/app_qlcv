export default {
    SET_LICH_CONG_TAC(state,lich_cong_tac)
    {
        state.LIST_CONG_TAC = lich_cong_tac
    },
    ADD_LICH_CONG_TAC(state,cong_tac)
    {
        state.LIST_CONG_TAC.push(cong_tac)
    }
}