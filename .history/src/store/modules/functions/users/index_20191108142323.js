const state = {
    view: '0',
    create: null,
    edit: null,
    delete: null
}

const getters = {
    getView: (state) => {
        return state.view
    },
    getCreate: (state) => {
        return state.create
    },
    getEdit: (state) => {
        return state.edit
    },
    getDelete: (state) => {
        return state.delete
    }
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
    getters,
    mutations,
    actions
}