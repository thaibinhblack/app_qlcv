const state = {
    update: false,
    action_projects: {
        xem: '3.1',
        them: '1.0',
        sua: '1.0',
        xoa: '1.0',
        xuat: '1.0'
    }
}

const getters = {
    getAction_projects: (state) => {
        return state.action_projects
    }
}

const mutations = {
    updateAction_projects: (state,payload) => {
        state.action_projects = payload
    }
}

const actions = {
    commitAction_projects: ({commit},payload) => {
        commit('updateAction_projects',payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}