const state = {
    user: {}
}
const getters = {
    getUser: (state) => {
        return state.user
    }
}

const mutations = {
    updateUser: (state,payload) => {
        state.user = payload
    }
}

const actions = {
    commitUser: ({commit},payload) => {
        commit("updateUser",payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}