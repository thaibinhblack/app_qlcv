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
    },
    DELETE_CONG_VIEC(state,ID_CV_DA)
    {
        const ItemIndex = state.list_congviec.findIndex((cv) => {
            cv.id_cv_da == ID_CV_DA
        })
        state.list_congviec.splice(ItemIndex,1)
    },
    UPDATE_MODAL_BAOCAO(state,boolean)
    {
        state.isModalBaoCao = boolean
    },
    SET_BAOCAO(state,list_baocao)
    {
        state.list_baocao = list_baocao
    },
    SET_FILES(state,LIST_FILE)
    {
        state.list_file = LIST_FILE
    },
    ADD_FILE(state,file)
    {
        state.list_file.push({
            id_file_cv: file.id,
            id_cv_da: file.id_cv_da,
            url_file: '/upload/congviec/'+file.name
        })
        // console.log(state.list_file)
    },
    SET_SETTING(state,settings){
        state.settings = JSON.parse(settings)
    },
    UPDATE_SETTING(state,settings){
        state.settings = settings
    },
    SET_SETTING_MODAL(state,setting)
    {   
        if(setting == undefined)
        {
            // console.log('undefined')
            state.setting_modal = {
                selected_du_an_setting: [],
                selected_loai_cv_setting: []
            }
        }
        else
        {
            if(Object.entries(setting).length > 0)
            {
                // console.log('if')
                state.setting_modal = JSON.parse(setting.value_setting)
            }
            else
            {
                // console.log('else')
                state.setting_modal =  {
                    selected_du_an_setting: [],
                    selected_loai_cv_setting: []
                }
                
            }
        }
        // console.log(setting)
       
        // console.log(JSON.parse(setting.value_setting))
    }
}