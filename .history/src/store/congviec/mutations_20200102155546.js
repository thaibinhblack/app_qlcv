export default {
    SET_CONGVIEC(state,list_congviec)
    {
        state.list_congviec = list_congviec
    },
    SEARCH_TASK(state,id_task)
    {
         state.task_edit = state.list_congviec.filter((value,index,array) => {
             return array[index].id_cv_da == id_task
         })[0]
    }
}