const state = {
    update: false
}

const getters = {
    getUpdate: (state) => {
        return state.update
    }
}

const mutations = {
    mutations_Update: (state,payload) => {
        state.update = payload
    }
}

const actions = {
    commit_Update: ({commit},payload) => {
        commit('mutations_Update',payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}