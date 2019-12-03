const state = {
    update: false,
    action: {
        xem: '2.1',
        them: '2.2',
        sua: '2.3',
        xoa: '2.4',
        xuat: '2.5'
    }
}

const getters = {
    getAction_user: (state) => {
        return state.action
    }
}

const mutations = {
    updateAction_user: (state,payload) => {
        state.action = payload
    }
}

const actions = {
    commitAction_user: ({commit},payload) => {
        commit('mutations_Update',payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}