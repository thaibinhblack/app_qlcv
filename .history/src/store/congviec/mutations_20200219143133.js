export default {
    SET_CONGVIEC(state,list_congviec)
    {
        state.list_congviec_tmp = list_congviec
        state.list_congviec = list_congviec
    },
    SET_CONGVIEC_CTD(state,list_congviec)
    {
        state.list_congviec_ctd = list_congviec
    },
    SET_CONGVIEC_DTD(state,list_congviec)
    {
        state.list_congviec_dtd = list_congviec
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
        
        //  console.log(state.task_edit, id_task)
    },
    SEARCH_TASK_TD(state,id_task)
    {
        state.task_edit = state.list_congviec_ctd.filter((value,index,array) => {
            return array[index].id_cv_da == id_task
        })[0]
        
    },
    SEARCH_TASK_DTD(state,id_task)
    {
        state.task_edit = state.list_congviec_dtd.filter((value,index,array) => {
            return array[index].id_cv_da == id_task
        })[0]
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
            
            return cv.id_cv_da == ID_CV_DA
        })
        // console.log(ItemIndex, ID_CV_DA, state.list_congviec[-1])
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
    },
    UPDATE_CV_TD(state,cv_td)
    {
            if(cv_td.action_tham_dinh == 0)
            {
                cv_td.list_tham_dinh.forEach((cv) => {
                    const indexCV = state.list_congviec.findIndex((cv_da) => {
                        cv_da.id_cv_da == cv.id_cv_da
                    })
                    state.list_congviec.splice(indexCV,1)
                    cv.trang_thai_td = 1;
                    state.list_congviec_ctd.push(cv)
    
                })
            }
            else
            {
                cv_td.list_tham_dinh.forEach((cv) => {
                    const indexCV = state.list_congviec_ctd.findIndex((cv_da) => {
                        cv_da.id_cv_da == cv.id_cv_da
                    })
                    cv.trang_thai_td = 0;
                    state.list_congviec_ctd.splice(indexCV,1)
                    state.list_congviec.push(cv)
    
                })
            }
    
    },
    UPDATE_CV_DATD(state,tham_dinh)
    {
        tham_dinh.forEach((element) => {
            const IndexCV = state.list_congviec_ctd.findIndex((cv) => {
                cv.id_cv_da = element.id_cv_da
            })
            state.list_congviec_ctd.splice(IndexCV,1)
            element.trang_thai_td = 2
            state.list_congviec_dtd.push(element)
        })
    },
    UPDATE_DELETE_CV(state,boolean)
    {
        state.DELETE_CV_DA_KH = boolean
    }
}