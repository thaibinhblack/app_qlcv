const state = {
    update: false,
    action_customers: {
        xem: '1.1',
        them: '1.0',
        sua: '1.0',
        xoa: '1.0',
        xuat: '1.0'
    }
}

const getters = {
    getAction_customers: (state) => {
        return state.action_customers
    }
}

const mutations = {
    updateAction_customers: (state,payload) => {
        state.action_customers = payload
    }
}

const actions = {
    commitAction_customers: ({commit},payload) => {
        commit('updateAction_customers',payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}