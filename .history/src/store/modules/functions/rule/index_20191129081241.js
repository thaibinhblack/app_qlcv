const state = {
    update: false,
    action_rule: {
        xem: '1.1',
        them: '1.0',
        sua: '1.0',
        xoa: '1.0',
        xuat: '1.0'
    }
}

const getters = {
    getAction_rule: (state) => {
        return state.action_rule
    }
}

const mutations = {
    updateAction_rule: (state,payload) => {
        state.action_rule = payload
    }
}

const actions = {
    commitAction_rule: ({commit},payload) => {
        commit('updateAction_rule',payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}