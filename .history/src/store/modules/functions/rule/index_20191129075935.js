const state = {
    update: false,
    action_rule: {
        xem: '2.1',
        them: '2.2',
        sua: '2.3',
        xoa: '2.4',
        xuat: '2.5'
    }
}

const getters = {
    getAction_rule: (state) => {
        return state.action
    }
}

const mutations = {
    updateAction_rule: (state,payload) => {
        state.action = payload
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