export default {
    SET_LCV(state,payload) {
        state.list_lcv = payload
        const object_loai_cv = []
        payload.data.forEach((parent) => {
                var tmp = {}
                if(parent.parent == 0)
                {
                    tmp.parent = parent.ten_loai_cv
                    tmp.children = []
                }
                payload.data.forEach((children) => {
                   if(children.parent == parent.id_loai_cv)
                   {
                       children.ten_loai_cv = '---'+children.ten_loai_cv
                       tmp.children.push(children)
                   }

                })
                if(parent.parent == 0)
                {
                    object_loai_cv.push(tmp)
                }
                
            })
            state.group_loai_cv = object_loai_cv
    }
}