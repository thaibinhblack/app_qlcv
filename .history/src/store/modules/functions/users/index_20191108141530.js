const state = {
    view: null,
    create: null,
    edit: null,
    delete: null
}
const getters = {

}

const mutations = {
    updateFunction:(state,functions) => {
        state.view = functions.view
        state.create = functions.create
        state.edit = functions.edit
        state.delete = functions.delete
    }
}
const actions = {
    commitFunctioUser: ({commit},functions) => {
        commit("updateFunction",functions)
    }
}
export default {
    state,
    mutations,
    actions
}