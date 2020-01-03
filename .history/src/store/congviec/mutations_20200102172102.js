export default {
    SET_CONGVIEC(state,list_congviec)
    {
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
    }
}