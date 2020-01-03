export default {
    SET_CONGVIEC(state,list_congviec)
    {
        state.list_congviec_tmp = list_congviec
        state.list_congviec = list_congviec
    },
    UPDATE_MODAL_EDIT(state,modal)
    {
        state.isModalEdit = modal
    },
    SEARCH_TASK(state,id_task)
    {
        state.task_edit = state.list_congviec.filter((value,index,array) => {
            return array[index].id_cv_da == id_task
        })[0]
        
        //  console.log(state.task_edit)
    },
    FILTER_CONGVIEC()
    {
        // state.list_congviec_tmp = state.list_congviec_tmp.filter((value,index,array) => {
        //     return array[index].id_du_an
        // })
    },
    UPDATE_MODAL(state,boolean)
    {
        state.isModalEdit = boolean
    },
    RESET_CONGVIEC_EDIT(state)
    {
        state.task_edit = {}
    },
    ADD_CONGVIEC(state,cong_viec)
    {
        state.list_congviec.push(cong_viec)
    }
}